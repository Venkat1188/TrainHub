import { Section, SectionHeading } from "@/components/Section";

const FEATURES = [
  {
    title: "Broad Course Catalogue",
    body: "Over 100 short courses spanning data, technology, finance, project management, public health and leadership.",
    icon: (
      <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
    ),
  },
  {
    title: "Industry-Experienced Trainers",
    body: "Sessions are led by practitioners who have built, shipped and managed the things they teach.",
    icon: (
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 8a7 7 0 0 1 14 0" strokeLinecap="round" />
    ),
  },
  {
    title: "Hands-On, Project-Based",
    body: "Every course is built around real datasets, case studies and exercises you can apply on Monday morning.",
    icon: (
      <path d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Recognised Certificates",
    body: "Receive a verifiable certificate of completion you can share on LinkedIn and add to your CV.",
    icon: (
      <path d="M12 2l3 6 6 .9-4.5 4.4L18 20l-6-3.2L6 20l1.5-6.7L3 8.9 9 8z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export default function WhyChoose() {
  return (
    <Section className="bg-slate-50">
      <SectionHeading
        eyebrow="Why us"
        title="Why Choose TrainHub Institute?"
        subtitle="A focused approach to professional development: short courses, practical projects, and trainers who do the work themselves."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl bg-white p-6 border border-border hover:border-brand/40 hover:shadow-md transition-all"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-soft text-brand mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {f.icon}
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
