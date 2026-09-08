const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const ts = require("typescript");
const source = fs.readFileSync(
  path.join(__dirname, "../src/app/actions/sendEmail.ts"),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
function harness(replies = [], apiKey = "test-only-no-network") {
  const calls = [];
  const module = { exports: {} };
  const context = {
    module,
    exports: module.exports,
    URL,
    Date,
    process: { env: { RESEND_API_KEY: apiKey } },
    console: { error() {} },
    require(name) {
      if (name === "next/headers")
        return {
          headers: async () => new Map([["x-forwarded-for", "192.0.2.1"]]),
        };
      if (name === "resend")
        return {
          Resend: class {
            constructor() {
              this.emails = {
                send: async (payload) => {
                  calls.push(payload);
                  const reply = replies[calls.length - 1];
                  if (reply instanceof Error) throw reply;
                  return reply || { data: { id: "mock-id" }, error: null };
                },
              };
            }
          },
        };
      throw new Error("Unexpected import, network prohibited: " + name);
    },
  };
  vm.runInNewContext(compiled, context, { filename: "sendEmail.ts" });
  return { send: module.exports.sendInquiry, calls };
}
function data(overrides = {}) {
  const form = new FormData();
  const values = {
    _ft: String(Date.now() - 10000),
    name: "Test Visitor",
    email: "visitor@example.com",
    company: "Example Organization",
    website: "https://example.com",
    message: "A local automated inquiry test.",
    ...overrides,
  };
  for (const [key, value] of Object.entries(values)) form.set(key, value);
  return form;
}
test("missing configuration returns honest failure without sending", async () => {
  const h = harness([], "");
  const result = await h.send(data());
  assert.equal(result.success, false);
  assert.match(result.error, /unavailable/);
  assert.equal(h.calls.length, 0);
});
test("invalid fields never reach the email provider", async () => {
  for (const changes of [
    { name: "" },
    { email: "bad" },
    { website: "javascript:alert(1)" },
    { name: "Test\r\nBcc: somebody@example.com" },
    { company: "x".repeat(161) },
    { message: "x".repeat(5001) },
  ]) {
    const h = harness();
    assert.equal((await h.send(data(changes))).success, false);
    assert.equal(h.calls.length, 0);
  }
});
test("fast submissions get an explicit error", async () => {
  const h = harness();
  assert.equal(
    (await h.send(data({ _ft: String(Date.now()) }))).success,
    false,
  );
  assert.equal(h.calls.length, 0);
});
test("honeypot exits without sending", async () => {
  const h = harness();
  assert.equal((await h.send(data({ _hp: "bot" }))).success, true);
  assert.equal(h.calls.length, 0);
});
test("successful submission sends notification before confirmation and escapes content", async () => {
  const h = harness();
  const result = await h.send(
    data({
      name: "<b>Test</b>",
      message: "<script>alert(1)</script>\nA useful brief.",
    }),
  );
  assert.equal(result.success, true);
  assert.equal(h.calls.length, 2);
  assert.equal(h.calls[0].to, "hello@drapernorwood.com");
  assert.equal(h.calls[1].to, "visitor@example.com");
  assert.ok(h.calls[0].html.includes("&lt;script&gt;"));
  assert.ok(!h.calls[0].html.includes("<script>"));
  assert.ok(h.calls[0].html.includes("<br>"));
});
test("provider error stops confirmation and does not claim success", async () => {
  const h = harness([{ error: { message: "Rejected" } }]);
  assert.equal((await h.send(data())).success, false);
  assert.equal(h.calls.length, 1);
});
test("provider exception does not claim success", async () => {
  const h = harness([new Error("Unavailable")]);
  assert.equal((await h.send(data())).success, false);
  assert.equal(h.calls.length, 1);
});
test("confirmation error cannot turn a delivered inquiry into a failed inquiry", async () => {
  for (const failure of [
    { error: { message: "Rejected" } },
    new Error("Unavailable"),
  ]) {
    const h = harness([{ data: { id: "delivered" }, error: null }, failure]);
    assert.equal((await h.send(data())).success, true);
    assert.equal(h.calls.length, 2);
  }
});
test("rate limit blocks fourth submission on the same instance", async () => {
  const h = harness();
  for (let i = 0; i < 3; i++)
    assert.equal((await h.send(data())).success, true);
  const result = await h.send(data());
  assert.equal(result.success, false);
  assert.match(result.error, /wait/);
  assert.equal(h.calls.length, 6);
});
