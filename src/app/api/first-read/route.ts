import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export const maxDuration = 15;
import {
  PublicSiteReadError,
  ReadFocus,
  readPublicSite,
} from "@/lib/public-site-read";

const LIMIT = 8;
const WINDOW_MS = 60_000;
const MAX_CLIENTS = 2_000;
const MAX_REQUEST_BYTES = 4_096;
const requests = new Map<string, number[]>();

function clientKey(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function limited(key: string): boolean {
  const now = Date.now();
  const recent = (requests.get(key) ?? []).filter(
    (time) => now - time < WINDOW_MS,
  );
  if (recent.length >= LIMIT) {
    requests.set(key, recent);
    return true;
  }
  if (!requests.has(key) && requests.size >= MAX_CLIENTS)
    requests.delete(requests.keys().next().value as string);
  requests.set(key, [...recent, now]);
  return false;
}

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function parseBody(
  request: NextRequest,
): Promise<{ url?: unknown; focus?: unknown }> {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    throw new PublicSiteReadError("The request is too large.", 413);
  }
  if (!request.body)
    throw new PublicSiteReadError(
      "Send a JSON body with a website URL and focus.",
      400,
    );
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      bytes += next.value.byteLength;
      if (bytes > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new PublicSiteReadError("The request is too large.", 413);
      }
      chunks.push(next.value);
    }
  } finally {
    reader.releaseLock();
  }
  let value: unknown;
  try {
    value = JSON.parse(new TextDecoder().decode(Buffer.concat(chunks)));
  } catch {
    throw new PublicSiteReadError(
      "Send a JSON body with a website URL and focus.",
      400,
    );
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new PublicSiteReadError(
      "Send a JSON object with a website URL and focus.",
      400,
    );
  }
  return value as { url?: unknown; focus?: unknown };
}

export async function POST(request: NextRequest) {
  if (limited(clientKey(request)))
    return error(
      "Please wait a moment before starting another first read.",
      429,
    );
  let body: { url?: unknown; focus?: unknown };
  try {
    body = await parseBody(request);
  } catch (caught) {
    const failure =
      caught instanceof PublicSiteReadError
        ? caught
        : new PublicSiteReadError(
            "Send a JSON body with a website URL and focus.",
            400,
          );
    return error(failure.message, failure.status);
  }
  if (
    typeof body.url !== "string" ||
    !["positioning", "digital", "systems", "growth"].includes(
      String(body.focus),
    )
  ) {
    return error("Provide a website URL and a valid focus.", 400);
  }
  try {
    return NextResponse.json(
      await readPublicSite(body.url, body.focus as ReadFocus),
    );
  } catch (caught) {
    if (caught instanceof PublicSiteReadError)
      return error(caught.message, caught.status);
    return error("The website could not be read right now.", 422);
  }
}
