import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Questions about a course, a group booking or a consultancy engagement? Our team responds within one business day."
        crumbs={[{ href: "/contact", label: "Contact" }]}
      />
      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-5">
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="font-semibold mb-3">Address</h3>
              <p className="text-sm text-muted">
                Westlands Business Park
                <br />
                Nairobi, Kenya
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="font-semibold mb-3">Phone</h3>
              <p className="text-sm text-muted">
                <a href="tel:+254700000000" className="hover:text-brand">
                  +254 700 000 000
                </a>
                <br />
                <a href="tel:+447000000000" className="hover:text-brand">
                  +44 7000 000 000
                </a>
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="font-semibold mb-3">Email</h3>
              <p className="text-sm text-muted">
                <a
                  href="mailto:hello@trainhub.example"
                  className="hover:text-brand"
                >
                  hello@trainhub.example
                </a>
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="font-semibold mb-3">Hours</h3>
              <p className="text-sm text-muted">
                Monday &ndash; Friday: 08:00 &ndash; 17:00 (EAT)
              </p>
            </div>
          </div>

          <form className="lg:col-span-2 rounded-2xl bg-white border border-border p-8 grid gap-3">
            <h3 className="text-2xl font-bold mb-2">Send us a message</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                placeholder="Full name"
                className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
            <input
              placeholder="Phone"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <input
              placeholder="Subject"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <textarea
              rows={6}
              placeholder="Your message"
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <button
              type="submit"
              className="rounded-md bg-brand text-white font-semibold px-4 py-2.5 text-sm hover:bg-brand-dark transition-colors w-full sm:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
