import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import Accordion, { type FAQItem } from "@/components/Accordion";

const FAQS: FAQItem[] = [
  {
    q: "What types of courses does the institute offer?",
    a: "Short professional courses across data analytics, project management, finance, monitoring & evaluation, public health, IT, cybersecurity, leadership and HR.",
  },
  {
    q: "How long are the training courses?",
    a: "Most programmes run for 5 or 10 working days. A small number of advanced courses extend to 3 weeks.",
  },
  {
    q: "Do you offer online or in-person training?",
    a: "Yes — every course is offered in at least one of three formats: fully online (live, instructor-led), classroom (at one of our regional venues), or hybrid.",
  },
  {
    q: "What is included in the course fee?",
    a: "Tuition, all course materials, software access where required, certificate of completion and two months of post-training Q&A with the trainer. Classroom courses also include refreshments and printed materials.",
  },
  {
    q: "How do I register for a course?",
    a: "Open the course page, click \u201cRegister Online\u201d, complete the participant details and pay securely with a card. You will receive joining instructions by email within one business day.",
  },
  {
    q: "Do you offer group discounts?",
    a: "Yes. Groups of 3\u20135 receive 10% off, 6\u201310 receive 20% off, 11\u201320 receive 35% off and 20+ receive bespoke pricing up to 50% off.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Visa, Mastercard and American Express through our secure Stripe checkout. Bank transfer is available on request for invoiced enrolments.",
  },
  {
    q: "Will I receive a certificate upon completion?",
    a: "Yes \u2014 a verifiable certificate of completion is issued on the final day, with a unique ID you can share on LinkedIn or with employers.",
  },
];

export default function FAQ() {
  return (
    <Section className="bg-slate-50">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Quick answers to the questions we hear most often. Can&rsquo;t find what you need? Get in touch."
      />
      <div className="max-w-3xl mx-auto">
        <Accordion items={FAQS} />
        <div className="mt-8 text-center">
          <p className="text-sm text-muted mb-3">
            Still have questions? We&apos;re here to help!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </Section>
  );
}
