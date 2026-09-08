const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const ts = require("typescript");

const source = fs.readFileSync(
  path.join(__dirname, "../src/lib/public-site-read.ts"),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
}).outputText;
const sandboxModule = { exports: {} };
vm.runInNewContext(
  compiled,
  {
    module: sandboxModule,
    exports: sandboxModule.exports,
    URL,
    Buffer,
    Date,
    Promise,
    require(name) {
      if (name === "node:net") return { isIP: require("node:net").isIP };
      if (name === "node:dns/promises")
        return {
          lookup: async () => {
            throw new Error("Network is prohibited in this test");
          },
        };
      if (name === "node:http" || name === "node:https")
        return {
          request() {
            throw new Error("Network is prohibited in this test");
          },
        };
      throw new Error(`Unexpected import: ${name}`);
    },
  },
  { filename: "public-site-read.ts" },
);
const {
  isPublicIp,
  normalizePublicUrl,
  inspectPublicHtml,
  PublicSiteReadError,
} = sandboxModule.exports;

test("SSRF screening rejects private, link-local, multicast, reserved, and mapped addresses", () => {
  for (const address of [
    "127.0.0.1",
    "10.0.0.1",
    "169.254.10.2",
    "192.168.1.1",
    "224.0.0.1",
    "203.0.113.7",
    "::1",
    "fe80::1",
    "fc00::1",
    "ff02::1",
    "::ffff:8.8.8.8",
    "2001:db8::1",
  ])
    assert.equal(isPublicIp(address), false, address);
  assert.equal(isPublicIp("8.8.8.8"), true);
  assert.equal(isPublicIp("2606:4700:4700::1111"), true);
});

test("URL validation permits only credential-free standard public http(s) URLs", () => {
  assert.equal(
    normalizePublicUrl("https://example.com/path#fragment").href,
    "https://example.com/path",
  );
  for (const value of [
    "file:///etc/passwd",
    "https://user:pass@example.com",
    "http://example.com:8080",
    "javascript:alert(1)",
    "https://example.com\nX: bad",
  ]) {
    assert.throws(() => normalizePublicUrl(value), PublicSiteReadError);
  }
});

test("parser reports only markup-backed observations and removes executable content", () => {
  const result = inspectPublicHtml(
    `<!doctype html><title>North Star Studio</title><meta name="description" content="Independent design partners"><script>secret internal dashboard and client results</script><nav><a href="/work">Work</a><a href="/contact">Contact</a></nav><h1>Make the complex clear</h1><form action="/apply"></form><a href="/contact">Start a project</a>`,
    "https://example.com/",
    "systems",
  );
  assert.equal(result.title, "North Star Studio");
  assert.equal(result.heading, "Make the complex clear");
  assert.ok(
    result.observations.some(
      (item) => item.label === "Navigation" && item.detail.includes("Work"),
    ),
  );
  assert.ok(result.observations.some((item) => item.label === "Forms"));
  assert.ok(result.observations.some((item) => item.label === "Contact path"));
  assert.equal(JSON.stringify(result).includes("secret internal"), false);
  assert.match(result.hypothesis, /cannot see internal systems/i);
  assert.match(result.sourceNote, /publicly available HTML/i);
});

function fetchHarness(addresses, replies) {
  const calls = [];
  const sandbox = { exports: {} };
  const request = (options, callback) => {
    calls.push(options);
    const events = {};
    let destroyed = false;
    return {
      on(name, fn) {
        events[name] = fn;
      },
      destroy() {
        destroyed = true;
        events.error?.(new Error("destroyed"));
      },
      end() {
        queueMicrotask(() => {
          const reply = replies.shift();
          const responseEvents = {};
          const response = {
            statusCode: reply.status,
            headers: reply.headers || {},
            on(name, fn) {
              responseEvents[name] = fn;
            },
            destroy() {
              destroyed = true;
            },
            resume() {
              destroyed = true;
            },
          };
          if (reply.useAllLookup)
            options.lookup("example.com", { all: true }, reply.useAllLookup);
          callback(response);
          if (!destroyed && reply.body)
            responseEvents.data?.(Buffer.from(reply.body));
          if (!destroyed && reply.end !== false) responseEvents.end?.();
        });
      },
    };
  };
  vm.runInNewContext(compiled, {
    module: sandbox,
    exports: sandbox.exports,
    URL,
    Buffer,
    Date,
    Promise,
    setTimeout,
    clearTimeout,
    queueMicrotask,
    require(name) {
      if (name === "node:net") return { isIP: require("node:net").isIP };
      if (name === "node:dns/promises")
        return { lookup: async (host) => addresses.shift()(host) };
      if (name === "node:http" || name === "node:https") return { request };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return { api: sandbox.exports, calls };
}

test("fetch path rejects a private redirect and mixed DNS answers before connecting", async () => {
  const redirect = fetchHarness(
    [
      () => [{ address: "8.8.8.8", family: 4 }],
      () => [{ address: "127.0.0.1", family: 4 }],
    ],
    [{ status: 302, headers: { location: "https://private.example/" } }],
  );
  await assert.rejects(
    redirect.api.readPublicSite("example.com", "digital"),
    /does not resolve to a public server/,
  );
  assert.equal(redirect.calls.length, 1);
  const mixed = fetchHarness(
    [
      () => [
        { address: "8.8.8.8", family: 4 },
        { address: "10.0.0.1", family: 4 },
      ],
    ],
    [],
  );
  await assert.rejects(
    mixed.api.readPublicSite("https://example.com", "digital"),
    /does not resolve to a public server/,
  );
  assert.equal(mixed.calls.length, 0);
});

test("pinned lookup supports Node's all-address callback and a slow body hits the absolute deadline", async () => {
  let received;
  const all = fetchHarness(
    [() => [{ address: "8.8.8.8", family: 4 }]],
    [
      {
        status: 200,
        headers: { "content-type": "text/html" },
        useAllLookup: (_error, value) => {
          received = value;
        },
        body: "<title>OK</title>",
      },
    ],
  );
  await all.api.readPublicSite("example.com", "growth");
  assert.equal(
    JSON.stringify(received),
    JSON.stringify([{ address: "8.8.8.8", family: 4 }]),
  );
  const slow = fetchHarness(
    [() => [{ address: "8.8.8.8", family: 4 }]],
    [{ status: 200, headers: { "content-type": "text/html" }, end: false }],
  );
  await assert.rejects(
    slow.api.readPublicSite("example.com", "digital", 10),
    /too long/,
  );
});

test("route rejects null and oversized JSON before reading a site", async () => {
  const routeSource = fs.readFileSync(
    path.join(__dirname, "../src/app/api/first-read/route.ts"),
    "utf8",
  );
  const routeCompiled = ts.transpileModule(routeSource, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  class RouteError extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
    }
  }
  const routeModule = { exports: {} };
  vm.runInNewContext(routeCompiled, {
    module: routeModule,
    exports: routeModule.exports,
    Buffer,
    TextDecoder,
    require(name) {
      if (name === "next/server")
        return {
          NextResponse: {
            json: (body, init = {}) => ({ body, status: init.status || 200 }),
          },
        };
      if (name === "@/lib/public-site-read")
        return {
          PublicSiteReadError: RouteError,
          readPublicSite: async () => {
            throw new Error("must not fetch");
          },
        };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  const headers = new Map([["content-length", "4"]]);
  const request = {
    headers,
    body: new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("null"));
        controller.close();
      },
    }),
  };
  const response = await routeModule.exports.POST(request);
  assert.equal(response.status, 400);
  assert.match(response.body.error, /JSON object/);
  const tooLarge = await routeModule.exports.POST({
    headers: new Map([["content-length", "5000"]]),
    body: null,
  });
  assert.equal(tooLarge.status, 413);
});

test("malformed redirects reject without an uncaught exception", async () => {
  const malformed = fetchHarness(
    [() => [{ address: "8.8.8.8", family: 4 }]],
    [{ status: 302, headers: { location: "http://[" } }],
  );
  await assert.rejects(
    malformed.api.readPublicSite("example.com", "digital"),
    /invalid redirect/,
  );
});
