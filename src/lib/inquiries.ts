import { randomUUID } from "crypto";
import { getDb } from "@/lib/db";
import type { Row } from "@libsql/client";

export type StoredInquiry = {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  ip: string;
  userAgent: string;
};

export type NewInquiry = Omit<StoredInquiry, "id" | "createdAt"> &
  Partial<Pick<StoredInquiry, "id" | "createdAt">>;

function rowToInquiry(row: Row): StoredInquiry {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    fullName: String(row.full_name ?? ""),
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    subject: String(row.subject ?? ""),
    message: String(row.message ?? ""),
    ip: String(row.ip ?? ""),
    userAgent: String(row.user_agent ?? ""),
  };
}

export async function readInquiries(): Promise<StoredInquiry[]> {
  const db = await getDb();
  const result = await db.execute(
    "SELECT * FROM inquiries ORDER BY created_at DESC",
  );
  return result.rows.map(rowToInquiry);
}

export async function appendInquiry(
  inq: NewInquiry,
): Promise<StoredInquiry> {
  const db = await getDb();
  const stored: StoredInquiry = {
    id: inq.id ?? randomUUID(),
    createdAt: inq.createdAt ?? new Date().toISOString(),
    fullName: inq.fullName,
    email: inq.email,
    phone: inq.phone ?? "",
    subject: inq.subject ?? "",
    message: inq.message,
    ip: inq.ip ?? "",
    userAgent: inq.userAgent ?? "",
  };
  await db.execute({
    sql: `INSERT INTO inquiries (
      id, created_at, full_name, email, phone, subject, message, ip, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      stored.id,
      stored.createdAt,
      stored.fullName,
      stored.email,
      stored.phone,
      stored.subject,
      stored.message,
      stored.ip,
      stored.userAgent,
    ],
  });
  return stored;
}
