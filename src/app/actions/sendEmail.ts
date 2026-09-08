"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

const MAX_SUBMISSIONS_PER_MINUTE = 3;
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_TRACKED_IPS = 10_000;

// Best effort only: each serverless instance maintains its own memory.
const submissionLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= MAX_SUBMISSIONS_PER_MINUTE) {
    submissionLog.set(ip, recent);
    return true;
  }
  if (!submissionLog.has(ip) && submissionLog.size >= MAX_TRACKED_IPS) {
    const oldestKey = submissionLog.keys().next().value;
    if (oldestKey) submissionLog.delete(oldestKey);
  }
  submissionLog.set(ip, [...recent, now]);
  return false;
}

function getFormValue(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character]!,
  );
}

function isValidEmail(email: string): boolean {
  return (
    email.length <= 254 &&
    !/[\r\n]/.test(email) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function normalizeWebsite(value: string): string | null {
  if (!value) return "";
  if (value.length > 2_048 || /[\r\n]/.test(value)) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function looksLikeSpam(
  name: string,
  company: string,
  message: string,
): boolean {
  const isRandomString = (value: string) =>
    value.length > 16 &&
    !/[\s,.'"\-!?]/.test(value) &&
    /^[A-Za-z0-9]+$/.test(value);
  return [name, company, message].filter(isRandomString).length >= 2;
}

async function getClientIp(): Promise<string> {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() ||
    requestHeaders.get("x-real-ip") ||
    requestHeaders.get("cf-connecting-ip") ||
    "unknown"
  );
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

type SendResult = { success: true } | { success: false; error: string };

export async function sendInquiry(formData: FormData): Promise<SendResult> {
  if (getFormValue(formData, "_hp")) return { success: true };

  const formOpenedAt = Number.parseInt(getFormValue(formData, "_ft"), 10);
  if (!Number.isFinite(formOpenedAt) || Date.now() - formOpenedAt < 1_500) {
    return {
      success: false,
      error: "Please take a moment to complete the form before sending.",
    };
  }

  const name = getFormValue(formData, "name");
  const email = getFormValue(formData, "email");
  const company = getFormValue(formData, "company");
  const websiteInput = getFormValue(formData, "website");
  const message = getFormValue(formData, "message");
  const website = normalizeWebsite(websiteInput);

  if (!name || !email || !company || !message) {
    return { success: false, error: "Please complete all required fields." };
  }
  if (name.length > 120 || company.length > 160 || message.length > 5_000) {
    return {
      success: false,
      error: "Please shorten your inquiry and try again.",
    };
  }
  if (/[\r\n]/.test(name) || /[\r\n]/.test(company)) {
    return {
      success: false,
      error: "Please enter your name and company on a single line.",
    };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (website === null) {
    return {
      success: false,
      error:
        "Please enter a valid website URL beginning with http:// or https://.",
    };
  }
  // Bots can be rejected without giving them a signal; human timing failures are explicit above.
  if (looksLikeSpam(name, company, message)) return { success: true };
  if (isRateLimited(await getClientIp())) {
    return {
      success: false,
      error: "Please wait a moment before sending another inquiry.",
    };
  }

  const resend = getResendClient();
  if (!resend) {
    console.error(
      "Inquiry email is unavailable: RESEND_API_KEY is not configured.",
    );
    return {
      success: false,
      error: "Email is temporarily unavailable. Please email us directly.",
    };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeWebsite = website ? escapeHtml(website) : "";
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    const notification = await resend.emails.send({
      from: "Draper Norwood <hello@drapernorwood.com>",
      to: "hello@drapernorwood.com",
      replyTo: email,
      subject: `Inquiry from ${name} at ${company}`,
      html: `<table style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#0B0C0E;"><tr><td style="padding:40px 0 24px;"><p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#999;">New inquiry</p><h1 style="margin:0;font-size:22px;font-weight:400;">${safeName}</h1><p style="margin:6px 0 0;font-size:14px;color:#666;">${safeEmail}</p></td></tr><tr><td style="padding:20px 0;border-top:1px solid #E6E4DD;"><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px 0;width:130px;font-size:10px;text-transform:uppercase;letter-spacing:0.14em;color:#aaa;vertical-align:top;">Company</td><td style="padding:8px 0;font-size:14px;">${safeCompany}</td></tr>${website ? `<tr><td style="padding:8px 0;font-size:10px;text-transform:uppercase;letter-spacing:0.14em;color:#aaa;vertical-align:top;">Website</td><td style="padding:8px 0;font-size:14px;"><a href="${safeWebsite}" style="color:#2E5D4B;">${safeWebsite}</a></td></tr>` : ""}</table></td></tr><tr><td style="padding:24px 0;border-top:1px solid #E6E4DD;"><p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.14em;color:#aaa;">What they're looking to improve</p><p style="margin:0;font-size:15px;line-height:1.65;color:#333;">${safeMessage}</p></td></tr></table>`,
    });
    if (notification.error) {
      console.error("Resend notification error:", notification.error);
      return {
        success: false,
        error: "Failed to send. Please try again or email us directly.",
      };
    }

    // The inquiry is delivered. A confirmation failure must not invite duplicate submissions.
    try {
      const autoReply = await resend.emails.send({
        from: "Draper Norwood <hello@drapernorwood.com>",
        to: email,
        subject: "We received your inquiry",
        html: `<table style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#0B0C0E;"><tr><td style="padding:40px 0 32px;"><p style="margin:0 0 20px;font-size:15px;line-height:1.65;">Hi ${safeName},</p><p style="margin:0 0 20px;font-size:15px;line-height:1.65;">Thanks for reaching out. We received your inquiry and will be in touch shortly.</p><p style="margin:0 0 20px;font-size:15px;line-height:1.65;">We typically respond within one business day. If anything is time-sensitive, feel free to reply to this email directly.</p><p style="margin:0;font-size:15px;line-height:1.65;">&mdash; Draper Norwood</p></td></tr><tr><td style="padding:24px 0 0;border-top:1px solid #E6E4DD;"><a href="https://drapernorwood.com" style="font-size:12px;color:#999;text-decoration:none;">drapernorwood.com</a></td></tr></table>`,
      });
      if (autoReply.error) {
        console.error("Resend auto-reply error:", autoReply.error);
      }
    } catch (error) {
      console.error("Resend auto-reply error:", error);
    }
    return { success: true };
  } catch (error) {
    console.error("Resend email error:", error);
    return {
      success: false,
      error: "Failed to send. Please try again or email us directly.",
    };
  }
}
