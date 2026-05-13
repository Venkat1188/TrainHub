import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import ContactForm from "@/components/ContactForm";

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

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
