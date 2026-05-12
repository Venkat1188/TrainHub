import PageHeader from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/Section";

export const metadata = { title: "Group Rates" };

const TIERS = [
  { size: "3 – 5 participants", discount: "10% off", note: "Per-seat discount on any open course" },
  { size: "6 – 10 participants", discount: "20% off", note: "Includes a dedicated cohort coordinator" },
  { size: "11 – 20 participants", discount: "35% off", note: "Optional private delivery at your venue" },
  { size: "20+ participants", discount: "Up to 50% off", note: "Fully tailored curriculum and reporting" },
];

export default function GroupRatesPage() {
  return (
    <>
      <PageHeader
        title="Group Rates"
        subtitle="Bringing several colleagues to the same course is the most cost-effective way to upskill a team. Every additional seat unlocks a deeper discount."
        crumbs={[{ href: "/group-rates", label: "Group Rates" }]}
      />
      <Section>
        <SectionHeading
          eyebrow="Volume discounts"
          title="Train your team and save"
          subtitle="Tiered discounts apply automatically to the per-seat price. For groups of 11+, we can also run the course privately for your organisation."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((t) => (
            <div
              key={t.size}
              className="rounded-xl border border-border bg-white p-6 text-center"
            >
              <div className="text-3xl font-bold text-brand">{t.discount}</div>
              <div className="mt-2 font-semibold">{t.size}</div>
              <p className="mt-2 text-sm text-muted">{t.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold mb-2">Request a Quote</h2>
          <p className="text-muted text-sm mb-6">
            Send us a few details and we&rsquo;ll come back within one business
            day with a written quote, available dates and a draft agenda.
          </p>
          <form className="grid gap-3">
            <input
              required
              placeholder="Full name"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <input
              required
              type="email"
              placeholder="Work email"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <input
              placeholder="Organization"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <input
              type="number"
              min={1}
              placeholder="Team size"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <textarea
              rows={4}
              placeholder="Tell us about your training needs"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <button
              type="submit"
              className="rounded-md bg-brand text-white font-semibold px-4 py-2.5 text-sm hover:bg-brand-dark transition-colors"
            >
              Request Quote
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
