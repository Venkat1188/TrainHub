import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { COURSES } from "@/lib/courses";
import { appendRegistration, type StoredRegistration } from "@/lib/registrations";
import { sendConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toRegistration(session: Stripe.Checkout.Session): StoredRegistration {
  const meta = session.metadata ?? {};
  const courseSlug = meta.courseSlug ?? "";
  const course = COURSES.find((c) => c.slug === courseSlug);
  return {
    id: session.id,
    createdAt: new Date((session.created ?? Date.now() / 1000) * 1000).toISOString(),
    courseSlug,
    courseTitle: course?.title ?? "Unknown course",
    amountTotal: session.amount_total,
    currency: session.currency,
    paymentStatus: session.payment_status,
    customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
    participantName: meta.participantName ?? "",
    participantEmail: meta.participantEmail ?? session.customer_details?.email ?? "",
    organization: meta.organization ?? "",
    country: meta.country ?? "",
    vatNumber: meta.vatNumber ?? "",
    notes: meta.notes ?? "",
    stripeSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === "string" ? session.payment_intent : null,
  };
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return NextResponse.json(
      {
        error:
          "Stripe webhook is not configured. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in .env.local.",
      },
      { status: 500 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe-Signature header." },
      { status: 400 },
    );
  }

  const rawBody = await req.text();
  const stripe = new Stripe(secret);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid signature.";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === "paid") {
          const reg = toRegistration(session);
          const { inserted } = await appendRegistration(reg);
          if (inserted) {
            await sendConfirmationEmail(reg);
          } else {
            console.log("[webhook] duplicate session ignored", session.id);
          }
        }
        break;
      }
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("[webhook] checkout did not complete", {
          id: session.id,
          status: session.payment_status,
          type: event.type,
        });
        break;
      }
      default:
        // Ignore other event types to keep the surface small.
        break;
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Handler error.";
    console.error("[webhook] handler error", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
