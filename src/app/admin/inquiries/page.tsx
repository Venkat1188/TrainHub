import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import AdminTabs from "@/components/AdminTabs";
import { readInquiries, type StoredInquiry } from "@/lib/inquiries";

export const metadata = { title: "Inquiries" };
export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function excerpt(text: string, max = 140): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed;
}

export default async function AdminInquiriesPage() {
  const inquiries = await readInquiries();
  const today = new Date().toISOString().slice(0, 10);
  const newToday = inquiries.filter((i) => i.createdAt.slice(0, 10) === today).length;

  return (
    <>
      <PageHeader
        title="Inquiries"
        subtitle="Messages submitted through the public contact form. Sorted by most recent."
        crumbs={[{ href: "/admin/inquiries", label: "Inquiries" }]}
      />
      <AdminTabs active="inquiries" />
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Stat label="Total inquiries" value={String(inquiries.length)} />
          <Stat label="Received today" value={String(newToday)} />
          <Stat
            label="Unique senders"
            value={String(new Set(inquiries.map((i) => i.email.toLowerCase())).size)}
          />
        </div>

        {inquiries.length === 0 ? <EmptyState /> : <InquiriesTable rows={inquiries} />}
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-1 text-2xl font-bold text-foreground">{value}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-white p-10 text-center">
      <h3 className="text-lg font-semibold mb-1">No inquiries yet</h3>
      <p className="text-sm text-muted">
        Messages submitted at <code className="font-mono">/contact</code> will appear here.
      </p>
    </div>
  );
}

function InquiriesTable({ rows }: { rows: StoredInquiry[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">From</th>
            <th className="px-4 py-3 font-semibold">Subject</th>
            <th className="px-4 py-3 font-semibold">Message</th>
            <th className="px-4 py-3 font-semibold">Phone</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-slate-50 align-top">
              <td className="px-4 py-3 whitespace-nowrap text-foreground/80">{formatDate(r.createdAt)}</td>
              <td className="px-4 py-3">
                <div className="font-medium text-foreground">{r.fullName || "—"}</div>
                <div className="text-xs text-muted">
                  <a href={`mailto:${r.email}`} className="hover:text-brand">
                    {r.email}
                  </a>
                </div>
              </td>
              <td className="px-4 py-3 text-foreground/80">{r.subject || "—"}</td>
              <td className="px-4 py-3 text-foreground/80 max-w-md">{excerpt(r.message)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-foreground/80">
                {r.phone ? (
                  <a href={`tel:${r.phone}`} className="hover:text-brand">
                    {r.phone}
                  </a>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
