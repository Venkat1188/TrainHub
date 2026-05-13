import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { COURSES } from "@/lib/courses";
import { appendRegistration, type StoredRegistration } from "@/lib/registrations";
import { sendConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";

type RegisterPayload = {
  courseSlug?: string;
  participant?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    jobTitle?: string;
    organization?: string;
    country?: string;
  };
  billing?: {
    billingName?: string;
    billingEmail?: string;
    billingAddress?: string;
    billingCity?: string;
    billingCountry?: string;
    vatNumber?: string;
  };
  notes?: string;
};

const RATE_LIMIT_MAX = 5;
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

export async function POST(req: NextRequest) {
  let body: RegisterPayload;
  try {
    body = (await req.json()) as RegisterPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const course = COURSES.find((c) => c.slug === body.courseSlug);
  if (!course) {
    return NextResponse.json({ error: "Unknown course." }, { status: 400 });
  }

  const firstName = (body.participant?.firstName ?? "").trim();
  const lastName = (body.participant?.lastName ?? "").trim();
  const participantEmail = (body.participant?.email ?? "").trim();
  const phone = (body.participant?.phone ?? "").trim();
  const country = (body.participant?.country ?? "").trim();

  if (!firstName || !lastName) {
    return NextResponse.json(
      { error: "Please enter your full name." },
      { status: 400 },
    );
  }
  if (!isEmail(participantEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid participant email." },
      { status: 400 },
    );
  }
  if (!phone) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }
  if (!country) {
    return NextResponse.json({ error: "Country is required." }, { status: 400 });
  }

  const ip = getIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const billingEmail = (body.billing?.billingEmail ?? "").trim();
  const reg: StoredRegistration = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    courseSlug: course.slug,
    courseTitle: course.title,
    amountTotal: course.feeUSD * 100,
    currency: "usd",
    paymentStatus: "confirmed",
    customerEmail: billingEmail || participantEmail,
    participantName: `${firstName} ${lastName}`.trim(),
    participantEmail,
    organization: (body.participant?.organization ?? "").trim().slice(0, 200),
    country: country.slice(0, 100),
    vatNumber: (body.billing?.vatNumber ?? "").trim().slice(0, 100),
    notes: (body.notes ?? "").trim().slice(0, 5000),
    stripeSessionId: `manual_${randomUUID()}`,
    stripePaymentIntentId: null,
  };

  try {
    await appendRegistration(reg);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not save registration.";
    console.error("[register] persist failed", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  await sendConfirmationEmail(reg);

  return NextResponse.json({
    ok: true,
    redirectUrl: `/register/success?course=${encodeURIComponent(course.slug)}`,
  });
}
