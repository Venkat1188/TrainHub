import { Section } from "@/components/Section";

export default function Newsletter() {
  return (
    <Section>
      <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white p-8 sm:p-12 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-sky-200 mb-3">
            Newsletter
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Join the Newsletter &amp; Save 15%
          </h2>
          <p className="mt-3 text-white/85 leading-relaxed max-w-lg">
            One short email per month: new course dates, occasional discount
            codes and a curated reading list. New subscribers get 15% off
            their first enrolment.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-white/80">
            <li>✓ Monthly digest — never more than once a month</li>
            <li>✓ Early access to new course schedules</li>
            <li>✓ Subscriber-only discount codes</li>
            <li>✓ Free webinars and short reading lists</li>
          </ul>
        </div>
        <form className="flex flex-col gap-3">
          <label className="text-sm font-medium">Email address</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-md bg-white/95 text-foreground placeholder:text-slate-500 px-4 py-3 text-sm outline-none ring-2 ring-transparent focus:ring-sky-300"
            />
            <button
              type="submit"
              className="rounded-md bg-white text-brand-dark font-semibold px-5 py-3 text-sm hover:bg-sky-50 transition-colors"
            >
              Get My Discount
            </button>
          </div>
          <p className="text-xs text-white/70">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </Section>
  );
}
