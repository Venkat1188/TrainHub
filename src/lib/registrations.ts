import { getDb } from "@/lib/db";
import type { Row } from "@libsql/client";

export type StoredRegistration = {
  id: string;
  createdAt: string;
  courseSlug: string;
  courseTitle: string;
  amountTotal: number | null;
  currency: string | null;
  paymentStatus: string | null;
  customerEmail: string | null;
  participantName: string;
  participantEmail: string;
  organization: string;
  country: string;
  vatNumber: string;
  notes: string;
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
};

function rowToRegistration(row: Row): StoredRegistration {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    courseSlug: String(row.course_slug),
    courseTitle: String(row.course_title),
    amountTotal: row.amount_total == null ? null : Number(row.amount_total),
    currency: row.currency == null ? null : String(row.currency),
    paymentStatus:
      row.payment_status == null ? null : String(row.payment_status),
    customerEmail:
      row.customer_email == null ? null : String(row.customer_email),
    participantName: String(row.participant_name ?? ""),
    participantEmail: String(row.participant_email ?? ""),
    organization: String(row.organization ?? ""),
    country: String(row.country ?? ""),
    vatNumber: String(row.vat_number ?? ""),
    notes: String(row.notes ?? ""),
    stripeSessionId: String(row.stripe_session_id),
    stripePaymentIntentId:
      row.stripe_payment_intent_id == null
        ? null
        : String(row.stripe_payment_intent_id),
  };
}

export async function readRegistrations(): Promise<StoredRegistration[]> {
  const db = await getDb();
  const result = await db.execute(
    "SELECT * FROM registrations ORDER BY created_at DESC",
  );
  return result.rows.map(rowToRegistration);
}

export async function appendRegistration(
  reg: StoredRegistration,
): Promise<{ inserted: boolean }> {
  const db = await getDb();
  const result = await db.execute({
    sql: `INSERT OR IGNORE INTO registrations (
      id, created_at, course_slug, course_title, amount_total, currency,
      payment_status, customer_email, participant_name, participant_email,
      organization, country, vat_number, notes,
      stripe_session_id, stripe_payment_intent_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      reg.id,
      reg.createdAt,
      reg.courseSlug,
      reg.courseTitle,
      reg.amountTotal,
      reg.currency,
      reg.paymentStatus,
      reg.customerEmail,
      reg.participantName,
      reg.participantEmail,
      reg.organization,
      reg.country,
      reg.vatNumber,
      reg.notes,
      reg.stripeSessionId,
      reg.stripePaymentIntentId,
    ],
  });
  return { inserted: result.rowsAffected > 0 };
}
