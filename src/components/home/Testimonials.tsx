import Placeholder from "@/components/Placeholder";
import { Section, SectionHeading } from "@/components/Section";

const ITEMS = [
  {
    slug: "a-mwangi",
    quote:
      "The Power BI course was exactly what I needed. By the end of week one I had built a working dashboard for my own team — not a toy example.",
    name: "A. Mwangi",
    role: "Senior Analyst, Public Sector",
  },
  {
    slug: "r-patel",
    quote:
      "Trainer was clearly someone who has actually run projects. The mock exam questions and the post-course Q&A made the difference for my PMP.",
    name: "R. Patel",
    role: "Project Manager, Engineering",
  },
  {
    slug: "l-okeke",
    quote:
      "We sent six staff to the M&E course and brought back a usable measurement framework. The follow-up support was a real bonus.",
    name: "L. Okeke",
    role: "Programme Lead, International NGO",
  },
];

export default function Testimonials() {
  return (
    <Section className="bg-slate-50">
      <SectionHeading
        eyebrow="Testimonials"
        title="What Past Participants Say"
        subtitle="Honest feedback from professionals who applied the training to their own work."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {ITEMS.map((t) => (
          <figure
            key={t.name}
            className="bg-white border border-border rounded-xl p-6 flex flex-col"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-brand/30 mb-3"
            >
              <path d="M7 7h4v4H8v3H4v-4c0-2 1-3 3-3zm10 0h4v4h-3v3h-4v-4c0-2 1-3 3-3z" />
            </svg>
            <blockquote className="text-foreground/90 leading-relaxed flex-1">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 pt-4 border-t border-border flex items-center gap-3">
              <Placeholder
                variant="avatar"
                label={t.name}
                src={`/images/avatars/${t.slug}.jpg`}
              />
              <div>
                <div className="font-semibold text-foreground leading-tight">{t.name}</div>
                <div className="text-xs text-muted leading-tight mt-0.5">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
