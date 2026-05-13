import { Resend } from "resend";
import type { StoredRegistration } from "@/lib/registrations";

function formatAmount(amount: number | null, currency: string | null): string {
  if (amount == null || !currency) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  } catch {
    return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isPaid(reg: StoredRegistration): boolean {
  return reg.paymentStatus === "paid";
}

function buildSubject(reg: StoredRegistration): string {
  return isPaid(reg)
    ? `Registration confirmed: ${reg.courseTitle}`
    : `Registration received: ${reg.courseTitle}`;
}

function buildPlainText(reg: StoredRegistration): string {
  const amount = formatAmount(reg.amountTotal, reg.currency);
  const paid = isPaid(reg);
  const greeting = reg.participantName ? `Hi ${reg.participantName},` : "Hi,";
  const lead = paid
    ? "Your payment has been received and your seat is confirmed."
    : "Your registration has been received and your seat is reserved. Our team will be in touch within one business day with invoicing details.";
  const amountLabel = paid ? "Amount paid" : "Course fee";
  return [
    greeting,
    "",
    `Thank you for registering for "${reg.courseTitle}" with TrainHub Institute.`,
    lead,
    "",
    "Booking summary",
    `  Course:        ${reg.courseTitle}`,
    `  ${amountLabel}:   ${amount}`,
    reg.organization ? `  Organization:  ${reg.organization}` : null,
    paid ? `  Reference:     ${reg.stripeSessionId}` : null,
    "",
    "We will send pre-reading and final joining instructions seven days before the start date.",
    "If you need to update participant details or change a session, just reply to this email.",
    "",
    "— The TrainHub Institute team",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

function buildHtml(reg: StoredRegistration): string {
  const amount = formatAmount(reg.amountTotal, reg.currency);
  const paid = isPaid(reg);
  const name = escapeHtml(reg.participantName || "there");
  const title = escapeHtml(reg.courseTitle);
  const org = reg.organization ? escapeHtml(reg.organization) : null;
  const ref = escapeHtml(reg.stripeSessionId);
  const heading = paid ? "You&rsquo;re registered" : "Registration received";
  const lead = paid
    ? "Your payment has been received and your seat is confirmed."
    : "Your registration has been received and your seat is reserved. Our team will be in touch within one business day with invoicing details.";
  const amountLabel = paid ? "Amount paid" : "Course fee";
  return `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;color:#0f172a;line-height:1.55;margin:0;padding:24px;background:#f8fafc">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:28px">
    <h1 style="font-size:20px;margin:0 0 12px">${heading}</h1>
    <p style="margin:0 0 12px">Hi ${name},</p>
    <p style="margin:0 0 12px">Thank you for registering for <strong>${title}</strong> with TrainHub Institute. ${lead}</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px">
      <tr><td style="padding:6px 0;color:#475569">Course</td><td style="padding:6px 0;font-weight:600">${title}</td></tr>
      <tr><td style="padding:6px 0;color:#475569">${amountLabel}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(amount)}</td></tr>
      ${org ? `<tr><td style="padding:6px 0;color:#475569">Organization</td><td style="padding:6px 0">${org}</td></tr>` : ""}
      ${paid ? `<tr><td style="padding:6px 0;color:#475569">Reference</td><td style="padding:6px 0;font-family:ui-monospace,Menlo,monospace;font-size:12px">${ref}</td></tr>` : ""}
    </table>
    <p style="margin:0 0 12px">We&rsquo;ll send pre-reading and final joining instructions seven days before the start date.</p>
    <p style="margin:0 0 12px">If you need to update participant details or change a session, just reply to this email.</p>
    <p style="margin:24px 0 0;color:#475569;font-size:13px">— The TrainHub Institute team</p>
  </div>
</body></html>`;
}

function logFallback(reg: StoredRegistration, reason: string): void {
  console.log(`[email] ${reason}`, {
    to: reg.participantEmail,
    bcc:
      reg.customerEmail && reg.customerEmail !== reg.participantEmail
        ? reg.customerEmail
        : undefined,
    subject: buildSubject(reg),
    course: reg.courseSlug,
    amount: reg.amountTotal,
    currency: reg.currency,
    sessionId: reg.stripeSessionId,
  });
}

export async function sendConfirmationEmail(
  reg: StoredRegistration,
): Promise<{ sent: boolean; id?: string; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const replyTo = process.env.EMAIL_REPLY_TO;

  if (!apiKey || !from) {
    logFallback(reg, "confirmation email skipped (RESEND_API_KEY/EMAIL_FROM not set)");
    return { sent: false, reason: "not-configured" };
  }

  const recipient = reg.participantEmail || reg.customerEmail;
  if (!recipient) {
    logFallback(reg, "confirmation email skipped (no recipient address)");
    return { sent: false, reason: "no-recipient" };
  }

  const bcc =
    reg.customerEmail && reg.customerEmail !== recipient ? [reg.customerEmail] : undefined;

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: [recipient],
      bcc,
      replyTo: replyTo || undefined,
      subject: buildSubject(reg),
      text: buildPlainText(reg),
      html: buildHtml(reg),
    });
    if (result.error) {
      console.error("[email] Resend rejected the request", result.error);
      return { sent: false, reason: result.error.message };
    }
    return { sent: true, id: result.data?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    console.error("[email] send failed", message);
    return { sent: false, reason: message };
  }
}
