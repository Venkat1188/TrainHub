import PageHeader from "@/components/PageHeader";
import Placeholder from "@/components/Placeholder";
import { Section } from "@/components/Section";

export const metadata = { title: "Blog" };

const POSTS = [
  {
    slug: "five-power-bi-mistakes",
    title: "Five Power BI mistakes we see in almost every audit",
    excerpt:
      "From bidirectional relationships to overusing calculated columns — the common pitfalls that slow dashboards and skew numbers, and how to fix them.",
    date: "2026-04-12",
    category: "Data Analytics",
  },
  {
    slug: "agile-vs-predictive-pmp",
    title: "Agile vs predictive: choosing the right approach for your project",
    excerpt:
      "PMP candidates often ask which approach to default to. The honest answer is: it depends on three concrete things — and none of them is the team&rsquo;s preference.",
    date: "2026-03-28",
    category: "Project Management",
  },
  {
    slug: "writing-better-indicators",
    title: "Writing M&E indicators that survive a donor review",
    excerpt:
      "A short, practical checklist for designing indicators that are specific enough to measure but flexible enough to live with for the project lifetime.",
    date: "2026-03-04",
    category: "Monitoring & Evaluation",
  },
  {
    slug: "ngo-budget-revisions",
    title: "Budget revisions: the part of grant management nobody teaches",
    excerpt:
      "Most grant agreements expect a revision at some point. Here is how to plan for it from day one and avoid panicked re-budgeting before audit.",
    date: "2026-02-18",
    category: "Finance",
  },
  {
    slug: "qgis-or-arcgis",
    title: "QGIS or ArcGIS in 2026? An honest comparison",
    excerpt:
      "Tooling, licensing cost, plugin ecosystems and what your team should pick if you are starting a GIS programme this year.",
    date: "2026-02-02",
    category: "Information Technology",
  },
  {
    slug: "outbreak-investigation-checklist",
    title: "A 24-hour outbreak investigation checklist",
    excerpt:
      "What field epidemiology teams actually do in the first day of a suspected outbreak — distilled from our public-health practitioners.",
    date: "2026-01-15",
    category: "Public Health",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="Short, practitioner-written notes on the topics our trainers and consultants are working on."
        crumbs={[{ href: "/blog", label: "Blog" }]}
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.slug}
              className="rounded-xl border border-border bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              <Placeholder
                src={`/images/blog/${p.slug}.jpg`}
                alt={p.title}
                label={p.category}
                className="rounded-none border-x-0 border-t-0"
              />
              <div className="p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-brand bg-brand-soft px-2 py-1 rounded">
                  {p.category}
                </span>
                <h3 className="mt-3 font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {p.excerpt}
                </p>
                <p className="mt-3 text-xs text-muted">{p.date}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
