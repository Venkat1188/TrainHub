import { promises as fs } from "fs";
import path from "path";

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

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "registrations.json");

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(FILE_PATH);
  } catch {
    await fs.writeFile(FILE_PATH, "[]", "utf8");
  }
}

export async function readRegistrations(): Promise<StoredRegistration[]> {
  await ensureFile();
  const raw = await fs.readFile(FILE_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredRegistration[]) : [];
  } catch {
    return [];
  }
}

export async function appendRegistration(
  reg: StoredRegistration,
): Promise<{ inserted: boolean }> {
  const all = await readRegistrations();
  if (all.some((r) => r.stripeSessionId === reg.stripeSessionId)) {
    return { inserted: false };
  }
  all.push(reg);
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), "utf8");
  return { inserted: true };
}
