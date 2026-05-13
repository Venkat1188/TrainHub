import { promises as fs } from "fs";
import path from "path";
import { createClient, type Client } from "@libsql/client";

const DEFAULT_URL = "file:./data/app.db";

let clientPromise: Promise<Client> | null = null;

async function ensureLocalDir(url: string): Promise<void> {
  if (!url.startsWith("file:")) return;
  const stripped = url.slice("file:".length);
  const filePath = stripped.startsWith("//")
    ? stripped.slice(2)
    : path.resolve(process.cwd(), stripped);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function bootstrap(client: Client): Promise<void> {
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      course_slug TEXT NOT NULL,
      course_title TEXT NOT NULL,
      amount_total INTEGER,
      currency TEXT,
      payment_status TEXT,
      customer_email TEXT,
      participant_name TEXT NOT NULL DEFAULT '',
      participant_email TEXT NOT NULL DEFAULT '',
      organization TEXT NOT NULL DEFAULT '',
      country TEXT NOT NULL DEFAULT '',
      vat_number TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      stripe_session_id TEXT NOT NULL UNIQUE,
      stripe_payment_intent_id TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_registrations_created_at
      ON registrations (created_at DESC);

    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      subject TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL,
      ip TEXT NOT NULL DEFAULT '',
      user_agent TEXT NOT NULL DEFAULT ''
    );

    CREATE INDEX IF NOT EXISTS idx_inquiries_created_at
      ON inquiries (created_at DESC);
  `);
}

async function migrateRegistrationsJson(client: Client): Promise<void> {
  const jsonPath = path.join(process.cwd(), "data", "registrations.json");
  let raw: string;
  try {
    raw = await fs.readFile(jsonPath, "utf8");
  } catch {
    return;
  }
  let rows: unknown;
  try {
    rows = JSON.parse(raw);
  } catch {
    return;
  }
  if (!Array.isArray(rows) || rows.length === 0) return;

  let imported = 0;
  for (const row of rows as Array<Record<string, unknown>>) {
    const sessionId = String(row.stripeSessionId ?? row.id ?? "");
    if (!sessionId) continue;
    const result = await client.execute({
      sql: `INSERT OR IGNORE INTO registrations (
        id, created_at, course_slug, course_title, amount_total, currency,
        payment_status, customer_email, participant_name, participant_email,
        organization, country, vat_number, notes,
        stripe_session_id, stripe_payment_intent_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        String(row.id ?? sessionId),
        String(row.createdAt ?? new Date().toISOString()),
        String(row.courseSlug ?? ""),
        String(row.courseTitle ?? ""),
        row.amountTotal == null ? null : Number(row.amountTotal),
        row.currency == null ? null : String(row.currency),
        row.paymentStatus == null ? null : String(row.paymentStatus),
        row.customerEmail == null ? null : String(row.customerEmail),
        String(row.participantName ?? ""),
        String(row.participantEmail ?? ""),
        String(row.organization ?? ""),
        String(row.country ?? ""),
        String(row.vatNumber ?? ""),
        String(row.notes ?? ""),
        sessionId,
        row.stripePaymentIntentId == null
          ? null
          : String(row.stripePaymentIntentId),
      ],
    });
    if (result.rowsAffected > 0) imported += 1;
  }
  if (imported > 0) {
    console.log(`[db] imported ${imported} legacy registration(s) from JSON`);
  }
}

async function init(): Promise<Client> {
  const url = process.env.DATABASE_URL || DEFAULT_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN || undefined;
  await ensureLocalDir(url);
  const client = createClient({ url, authToken });
  await bootstrap(client);
  await migrateRegistrationsJson(client);
  return client;
}

export function getDb(): Promise<Client> {
  if (!clientPromise) {
    clientPromise = init().catch((err) => {
      clientPromise = null;
      throw err;
    });
  }
  return clientPromise;
}
