import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { COURSES } from "@/lib/courses";

export const runtime = "nodejs";

type CheckoutPayload = {
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

function getOrigin(req: NextRequest) {
  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (envOrigin) return envOrigin.replace(/\/$/, "");
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const host = req.headers.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Set STRIPE_SECRET_KEY in .env.local to enable checkout.",
      },
      { status: 500 },
    );
  }

  let body: CheckoutPayload;
  try {
    body = (await req.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const course = COURSES.find((c) => c.slug === body.courseSlug);
  if (!course) {
    return NextResponse.json({ error: "Unknown course." }, { status: 400 });
  }

  const participantEmail = body.participant?.email?.trim();
  if (!participantEmail) {
    return NextResponse.json(
      { error: "Participant email is required." },
      { status: 400 },
    );
  }

  const stripe = new Stripe(secret);
  const origin = getOrigin(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: body.billing?.billingEmail || participantEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: course.feeUSD * 100,
            product_data: {
              name: course.title,
              description: `${course.durationDays}-day ${course.format} course — ${course.location}`,
              metadata: {
                courseSlug: course.slug,
                category: course.category,
                format: course.format,
              },
            },
          },
        },
      ],
      metadata: {
        courseSlug: course.slug,
        participantName: `${body.participant?.firstName ?? ""} ${
          body.participant?.lastName ?? ""
        }`.trim(),
        participantEmail,
        organization: body.participant?.organization ?? "",
        country: body.participant?.country ?? "",
        vatNumber: body.billing?.vatNumber ?? "",
        notes: (body.notes ?? "").slice(0, 500),
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&course=${course.slug}`,
      cancel_url: `${origin}/payment/cancel?course=${course.slug}`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not create checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
