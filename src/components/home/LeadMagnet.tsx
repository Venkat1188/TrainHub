import { Section } from "@/components/Section";

export default function LeadMagnet() {
  return (
    <Section className="bg-slate-50">
      <div className="grid lg:grid-cols-2 gap-10 items-center bg-white border border-border rounded-2xl p-8 sm:p-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">
            Free guide
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Download our 2026 Course Catalogue
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            A 40-page PDF with the full course schedule, fees, prerequisites
            and trainer profiles. Useful when planning a personal learning
            path or a team training budget.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-foreground/80">
            <li>✓ Full 2026 schedule with start dates</li>
            <li>✓ Fees, group rates and early-bird pricing</li>
            <li>✓ Trainer biographies and sample materials</li>
          </ul>
        </div>
        <form className="grid gap-3">
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1">
              Your Name *
            </label>
            <input
              required
              type="text"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1">
              Email Address *
            </label>
            <input
              required
              type="email"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1">
              Phone (Optional)
            </label>
            <input
              type="tel"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1">
              Area of Interest *
            </label>
            <select
              required
              name="interest"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 bg-white"
            >
              <option>Data Analytics</option>
              <option>Project Management</option>
              <option>Monitoring & Evaluation</option>
              <option>Finance & Audit</option>
              <option>Information Technology</option>
              <option>Public Health</option>
              <option>Leadership & HR</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 rounded-md bg-brand text-white font-semibold px-4 py-2.5 text-sm hover:bg-brand-dark transition-colors"
            >
              Download PDF Now
            </button>
            <button
              type="button"
              className="flex-1 rounded-md border border-brand text-brand font-semibold px-4 py-2.5 text-sm hover:bg-brand-soft transition-colors"
            >
              Send Me The PDF
            </button>
          </div>
          <p className="text-xs text-muted mt-1">
            We respect your privacy. No spam, ever.
          </p>
        </form>
      </div>
    </Section>
  );
}
