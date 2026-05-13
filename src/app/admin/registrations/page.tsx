import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import AdminTabs from "@/components/AdminTabs";
import { readRegistrations, type StoredRegistration } from "@/lib/registrations";

export const metadata = { title: "Registrations" };
export const dynamic = "force-dynamic";

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

function StatusPill({ status }: { status: string | null }) {
  const value = status ?? "unknown";
  const tone =
    value === "paid" || value === "confirmed"
      ? "bg-green-100 text-green-800"
      : value === "unpaid" || value === "pending"
        ? "bg-amber-100 text-amber-800"
        : "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${tone}`}>
      {value}
    </span>
  );
}

export default async function AdminRegistrationsPage() {
  const registrations = await readRegistrations();
  const sorted = [...registrations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const totalPaid = sorted
    .filter((r) => r.paymentStatus === "paid")
    .reduce((sum, r) => sum + (r.amountTotal ?? 0), 0);
  const currency = sorted.find((r) => r.currency)?.currency ?? null;

  return (
    <>
      <PageHeader
        title="Registrations"
        subtitle="Confirmed enrolments captured by the Stripe webhook. Sorted by most recent."
        crumbs={[{ href: "/admin/registrations", label: "Registrations" }]}
      />
      <AdminTabs active="registrations" />
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Stat label="Total registrations" value={String(sorted.length)} />
          <Stat
            label="Paid registrations"
            value={String(sorted.filter((r) => r.paymentStatus === "paid").length)}
          />
          <Stat label="Gross collected" value={formatAmount(totalPaid, currency)} />
        </div>

        {sorted.length === 0 ? (
          <EmptyState />
        ) : (
          <RegistrationsTable rows={sorted} />
        )}
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
      <h3 className="text-lg font-semibold mb-1">No registrations yet</h3>
      <p className="text-sm text-muted">
        Confirmed Stripe checkouts will appear here once the <code className="font-mono">/api/webhook</code>{" "}
        endpoint receives a <code className="font-mono">checkout.session.completed</code> event.
      </p>
    </div>
  );
}

function RegistrationsTable({ rows }: { rows: StoredRegistration[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Course</th>
            <th className="px-4 py-3 font-semibold">Participant</th>
            <th className="px-4 py-3 font-semibold">Organization</th>
            <th className="px-4 py-3 font-semibold">Amount</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Session</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 whitespace-nowrap text-foreground/80">{formatDate(r.createdAt)}</td>
              <td className="px-4 py-3">
                <div className="font-semibold text-foreground">{r.courseTitle}</div>
                <div className="text-xs text-muted font-mono">{r.courseSlug}</div>
              </td>
              <td className="px-4 py-3">
                <div className="font-medium text-foreground">{r.participantName || "—"}</div>
                <div className="text-xs text-muted">{r.participantEmail || r.customerEmail || "—"}</div>
              </td>
              <td className="px-4 py-3 text-foreground/80">{r.organization || "—"}</td>
              <td className="px-4 py-3 font-semibold text-foreground">
                {formatAmount(r.amountTotal, r.currency)}
              </td>
              <td className="px-4 py-3"><StatusPill status={r.paymentStatus} /></td>
              <td className="px-4 py-3 text-xs font-mono text-muted">{r.stripeSessionId.slice(0, 18)}…</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
