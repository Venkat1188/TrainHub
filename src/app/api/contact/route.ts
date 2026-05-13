import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { appendInquiry } from "@/lib/inquiries";

export const runtime = "nodejs";

type ContactPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  website?: string;
};

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const ipHits = new Map<string, number[]>();

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function notifyByEmail(payload: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_REPLY_TO || from;
  if (!apiKey || !from || !to) {
    console.log("[contact] inbox notification skipped (Resend not configured)", {
      from: payload.email,
      subject: payload.subject || "(no subject)",
    });
    return;
  }
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: `New inquiry: ${payload.subject || "(no subject)"}`,
      text: [
        `From: ${payload.fullName} <${payload.email}>`,
        payload.phone ? `Phone: ${payload.phone}` : null,
        "",
        payload.message,
      ]
        .filter((line): line is string => line !== null)
        .join("\n"),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    console.error("[contact] inbox notification failed", message);
  }
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const fullName = (body.fullName ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const phone = (body.phone ?? "").trim().slice(0, 50);
  const subject = (body.subject ?? "").trim().slice(0, 200);

  if (fullName.length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Please enter a message of at least 10 characters." },
      { status: 400 },
    );
  }

  const ip = getIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  try {
    await appendInquiry({
      fullName: fullName.slice(0, 200),
      email: email.slice(0, 320),
      phone,
      subject,
      message: message.slice(0, 5000),
      ip,
      userAgent: (req.headers.get("user-agent") ?? "").slice(0, 500),
    });
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : "Could not save inquiry.";
    console.error("[contact] persist failed", errMessage);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }

  await notifyByEmail({ fullName, email, phone, subject, message });

  return NextResponse.json({ ok: true });
}
