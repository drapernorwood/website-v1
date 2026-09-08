import { lookup } from "node:dns/promises";
import http from "node:http";
import https from "node:https";
import { isIP } from "node:net";

export type ReadFocus = "positioning" | "digital" | "systems" | "growth";

export type FirstRead = {
  url: string;
  title: string;
  description: string;
  heading: string;
  observations: Array<{ label: string; detail: string }>;
  hypothesis: string;
  nextStep: string;
  sourceNote: string;
};

export class PublicSiteReadError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

const MAX_URL_LENGTH = 2_048;
const MAX_BODY_BYTES = 512 * 1024;
const MAX_REDIRECTS = 3;
const REQUEST_TIMEOUT_MS = 8_000;

function ipv4Number(address: string): number | null {
  const parts = address.split(".");
  if (parts.length !== 4 || parts.some((part) => !/^\d{1,3}$/.test(part)))
    return null;
  const values = parts.map(Number);
  if (values.some((value) => value > 255)) return null;
  return (
    (((values[0] << 24) >>> 0) +
      (values[1] << 16) +
      (values[2] << 8) +
      values[3]) >>>
    0
  );
}

function inV4Range(value: number, start: string, bits: number): boolean {
  const startValue = ipv4Number(start);
  if (startValue === null) return true;
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  return (value & mask) === (startValue & mask);
}

export function isPublicIp(address: string): boolean {
  const family = isIP(address);
  if (family === 4) {
    const value = ipv4Number(address);
    if (value === null) return false;
    const blocked: Array<[string, number]> = [
      ["0.0.0.0", 8],
      ["10.0.0.0", 8],
      ["100.64.0.0", 10],
      ["127.0.0.0", 8],
      ["169.254.0.0", 16],
      ["172.16.0.0", 12],
      ["192.0.0.0", 24],
      ["192.0.2.0", 24],
      ["192.168.0.0", 16],
      ["192.88.99.0", 24],
      ["198.18.0.0", 15],
      ["198.51.100.0", 24],
      ["203.0.113.0", 24],
      ["224.0.0.0", 4],
      ["240.0.0.0", 4],
    ];
    return !blocked.some(([start, bits]) => inV4Range(value, start, bits));
  }
  if (family !== 6) return false;
  const normalized = address.toLowerCase();
  const pieces = normalized.split("::");
  if (pieces.length > 2) return false;
  const left = pieces[0] ? pieces[0].split(":") : [];
  const right = pieces.length === 2 && pieces[1] ? pieces[1].split(":") : [];
  const groups = [
    ...left,
    ...Array(Math.max(0, 8 - left.length - right.length)).fill("0"),
    ...right,
  ];
  if (
    groups.length !== 8 ||
    groups.some((group) => !/^[0-9a-f]{1,4}$/.test(group))
  )
    return false;
  const first = Number.parseInt(groups[0], 16);
  const second = Number.parseInt(groups[1], 16);
  const mapped =
    groups.slice(0, 5).every((group) => Number.parseInt(group, 16) === 0) &&
    Number.parseInt(groups[5], 16) === 0xffff;
  // Only global-unicast space is eligible. Exclude IANA special-use transition,
  // documentation, and reserved allocations within that otherwise broad range.
  return (
    (first & 0xe000) === 0x2000 &&
    !mapped &&
    !(first === 0x2001 && (second <= 0x01ff || second === 0x0db8)) &&
    first !== 0x2002 &&
    !(first === 0x3fff && (second & 0xf000) === 0)
  );
}

export function normalizePublicUrl(input: string): URL {
  input = input.trim();
  if (!input || input.length > MAX_URL_LENGTH || /[\r\n]/.test(input)) {
    throw new PublicSiteReadError("Enter a valid public website URL.", 400);
  }
  const candidate =
    !/^[a-z][a-z\d+.-]*:/i.test(input) && !input.startsWith("//")
      ? `https://${input}`
      : input;
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new PublicSiteReadError("Enter a valid public website URL.", 400);
  }
  if (
    (url.protocol !== "http:" && url.protocol !== "https:") ||
    url.username ||
    url.password ||
    url.port ||
    !url.hostname
  ) {
    throw new PublicSiteReadError(
      "Only standard public http(s) website URLs are allowed.",
      400,
    );
  }
  url.hash = "";
  return url;
}

async function resolvePublicAddress(
  url: URL,
): Promise<{ address: string; family: 4 | 6 }> {
  // WHATWG URL retains brackets around IPv6 hostnames; DNS APIs do not use them.
  const host = url.hostname.replace(/^\[|\]$/g, "");
  const literalFamily = isIP(host);
  const addresses = literalFamily
    ? [{ address: host, family: literalFamily }]
    : await lookup(host, { all: true, verbatim: true });
  if (
    !addresses.length ||
    addresses.some(({ address }) => !isPublicIp(address))
  ) {
    throw new PublicSiteReadError(
      "That website address does not resolve to a public server.",
      400,
    );
  }
  const first = addresses[0];
  return { address: first.address, family: first.family as 4 | 6 };
}

function decodeEntities(value: string): string {
  return value.replace(
    /&(?:amp|lt|gt|quot|#39|#x27);/gi,
    (entity) =>
      ({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
        "&#x27;": "'",
      })[entity.toLowerCase()] ?? entity,
  );
}

function text(value: string, limit = 280): string {
  return decodeEntities(
    value
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  ).slice(0, limit);
}

function attribute(tag: string, name: string): string {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );
  return text(match?.[1] ?? match?.[2] ?? match?.[3] ?? "", 300);
}

export function inspectPublicHtml(
  html: string,
  finalUrl: string,
  focus: ReadFocus,
): FirstRead {
  const clean = html.replace(
    /<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script\s*>|<style\b[\s\S]*?<\/style\s*>/gi,
    " ",
  );
  const title = text(
    clean.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1] ?? "",
    180,
  );
  const metaTags = clean.match(/<meta\b[^>]*>/gi) ?? [];
  const description =
    metaTags
      .map((tag) => ({
        name: attribute(tag, "name").toLowerCase(),
        property: attribute(tag, "property").toLowerCase(),
        content: attribute(tag, "content"),
      }))
      .find(
        (tag) =>
          tag.name === "description" || tag.property === "og:description",
      )?.content ?? "";
  const heading = text(
    clean.match(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/i)?.[1] ??
      clean.match(/<h[2-6]\b[^>]*>([\s\S]*?)<\/h[2-6]\s*>/i)?.[1] ??
      "",
    180,
  );
  const observations: FirstRead["observations"] = [];
  if (title)
    observations.push({
      label: "Page title",
      detail: `The page title is “${title}”.`,
    });
  if (description)
    observations.push({
      label: "Description",
      detail: `The public meta description says “${description.slice(0, 220)}”.`,
    });
  if (heading)
    observations.push({
      label: "Primary heading",
      detail: `The first heading in the page source is “${heading}”.`,
    });
  const nav = clean.match(/<nav\b[\s\S]*?<\/nav\s*>/i)?.[0];
  if (nav) {
    const labels = [...nav.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a\s*>/gi)]
      .map((match) => text(match[1], 60))
      .filter(Boolean)
      .slice(0, 6);
    if (labels.length)
      observations.push({
        label: "Navigation",
        detail: `Navigation links visible in the markup include ${labels.map((label) => `“${label}”`).join(", ")}.`,
      });
  }
  const formCount = (clean.match(/<form\b/gi) ?? []).length;
  if (formCount)
    observations.push({
      label: "Forms",
      detail: `The page markup contains ${formCount} form${formCount === 1 ? "" : "s"}.`,
    });
  const links = [...clean.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a\s*>/gi)];
  const contact = links.find((match) =>
    /contact|get in touch|start a project|book|schedule/i.test(
      `${attribute(match[0], "href")} ${text(match[2], 100)}`,
    ),
  );
  if (contact)
    observations.push({
      label: "Contact path",
      detail: `A public action link is labeled “${text(contact[2], 100) || attribute(contact[0], "href")}”.`,
    });
  const actionLabel = contact
    ? `the “${text(contact[2], 100) || attribute(contact[0], "href")} link`
    : "the next step";
  const publicCue = heading
    ? `the heading “${heading}”`
    : description
      ? "the public description"
      : "the public page copy";
  const hypotheses: Record<ReadFocus, string> = {
    positioning: `Start with ${publicCue}. Does it explain why this business is the right choice before a visitor reaches ${actionLabel}? Compare that promise with what customers actually value.`,
    digital: `Follow the path from ${publicCue} to ${actionLabel}. The opportunity to investigate is whether the page gives a visitor enough understanding and proof to take that step.`,
    systems: `Follow ${actionLabel} into the business. What information reaches your team, and what has to happen by hand? This read cannot see internal systems; that handoff is a useful place to investigate.`,
    growth: `Consider ${publicCue} alongside ${actionLabel}. The opportunity to investigate is whether the page connects the interest that brought someone here with a clear reason to act.`,
  };
  const nextSteps: Record<ReadFocus, string> = {
    positioning:
      "Compare the public promise with the language your best-fit buyers use in real sales conversations.",
    digital:
      "Walk through the key visitor path on several devices and identify where intent is not carried into an action.",
    systems:
      "Map what happens after a visitor acts on the public page, then identify the first handoff that relies on memory or manual follow-up.",
    growth:
      "Pair this public-page read with your actual traffic and conversion data before choosing a growth experiment.",
  };
  return {
    url: finalUrl,
    title,
    description,
    heading,
    observations: observations.slice(0, 6),
    hypothesis: hypotheses[focus],
    nextStep: nextSteps[focus],
    sourceNote:
      "This first read uses only publicly available HTML from the page. It does not inspect private systems, analytics, client work, or performance data.",
  };
}

async function requestHtml(
  url: URL,
  deadline: number,
): Promise<{ body: string; redirect?: URL }> {
  const timeout = () =>
    new PublicSiteReadError("The website took too long to respond.", 504);
  const remaining = () => deadline - Date.now();
  if (remaining() <= 0) throw timeout();
  let dnsTimer: ReturnType<typeof setTimeout> | undefined;
  const pinned = await new Promise<{ address: string; family: 4 | 6 }>(
    (resolve, reject) => {
      dnsTimer = setTimeout(() => reject(timeout()), Math.max(1, remaining()));
      resolvePublicAddress(url).then(resolve, reject);
    },
  ).finally(() => {
    if (dnsTimer) clearTimeout(dnsTimer);
  });
  if (remaining() <= 0) throw timeout();
  return new Promise((resolve, reject) => {
    const client = url.protocol === "https:" ? https : http;
    let settled = false;
    let absoluteTimer: ReturnType<typeof setTimeout> | undefined;
    const finish = (
      error?: PublicSiteReadError,
      result?: { body: string; redirect?: URL },
    ) => {
      if (settled) return;
      settled = true;
      if (absoluteTimer) clearTimeout(absoluteTimer);
      if (error) reject(error);
      else resolve(result!);
    };
    const host = url.hostname.replace(/^\[|\]$/g, "");
    const request = client.request(
      {
        protocol: url.protocol,
        hostname: host,
        servername: isIP(host) ? undefined : host,
        path: `${url.pathname}${url.search}`,
        method: "GET",
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "Accept-Encoding": "identity",
          "User-Agent": "Draper-Norwood-First-Read/1.0",
        },
        lookup: (_hostname, options, callback) => {
          if (typeof options === "object" && options.all)
            callback(null, [
              { address: pinned.address, family: pinned.family },
            ]);
          else callback(null, pinned.address, pinned.family);
        },
      },
      (response) => {
        response.on("error", () =>
          finish(
            new PublicSiteReadError(
              "The website connection was interrupted. Please try again.",
              422,
            ),
          ),
        );
        const status = response.statusCode ?? 0;
        const location = response.headers.location;
        if (status >= 300 && status < 400 && location) {
          try {
            const redirect = new URL(location, url);
            finish(undefined, { body: "", redirect });
          } catch {
            finish(
              new PublicSiteReadError(
                "The website returned an invalid redirect.",
                422,
              ),
            );
          }
          response.destroy();
          return;
        }
        if (status < 200 || status >= 300) {
          response.destroy();
          finish(
            new PublicSiteReadError(
              "The website could not be read right now.",
              422,
            ),
          );
          return;
        }
        const contentType = String(
          response.headers["content-type"] ?? "",
        ).toLowerCase();
        const contentLength = Number(response.headers["content-length"]);
        if (
          !contentType.startsWith("text/html") &&
          !contentType.startsWith("application/xhtml+xml")
        ) {
          response.destroy();
          finish(
            new PublicSiteReadError(
              "That URL did not return an HTML page.",
              422,
            ),
          );
          return;
        }
        if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
          response.destroy();
          finish(
            new PublicSiteReadError(
              "That page is too large to read safely.",
              413,
            ),
          );
          return;
        }
        const chunks: Buffer[] = [];
        let bytes = 0;
        response.on("data", (chunk: Buffer) => {
          bytes += chunk.length;
          if (bytes > MAX_BODY_BYTES) {
            response.destroy();
            request.destroy();
            finish(
              new PublicSiteReadError(
                "That page is too large to read safely.",
                413,
              ),
            );
          } else chunks.push(chunk);
        });
        response.on("end", () =>
          finish(undefined, { body: Buffer.concat(chunks).toString("utf8") }),
        );
      },
    );
    absoluteTimer = setTimeout(
      () => {
        finish(timeout());
        request.destroy();
      },
      Math.max(1, remaining()),
    );
    request.on("error", (error) =>
      finish(
        error instanceof PublicSiteReadError
          ? error
          : new PublicSiteReadError(
              "The website could not be read right now.",
              422,
            ),
      ),
    );
    request.end();
  });
}

export async function readPublicSite(
  input: string,
  focus: ReadFocus,
  timeoutMs = REQUEST_TIMEOUT_MS,
): Promise<FirstRead> {
  let url = normalizePublicUrl(input);
  const deadline = Date.now() + timeoutMs;
  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects += 1) {
    const result = await requestHtml(url, deadline);
    if (!result.redirect)
      return inspectPublicHtml(result.body, url.href, focus);
    if (redirects === MAX_REDIRECTS)
      throw new PublicSiteReadError(
        "The website redirected too many times.",
        422,
      );
    url = normalizePublicUrl(result.redirect.href);
  }
  throw new PublicSiteReadError(
    "The website could not be read right now.",
    422,
  );
}
