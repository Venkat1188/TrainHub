import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/Section";

export const metadata = { title: "Consultancy" };

const SERVICES = [
  {
    title: "Monitoring & Evaluation Design",
    body: "Theory of change, results frameworks and indicator design for new programmes or mid-term reviews.",
  },
  {
    title: "Baseline & Endline Surveys",
    body: "End-to-end survey delivery: sampling, instrument design, mobile data collection, analysis and reporting.",
  },
  {
    title: "Data Strategy & Dashboards",
    body: "Data architecture reviews and the build-out of Power BI / Looker dashboards for executive teams.",
  },
  {
    title: "Project Management Office Setup",
    body: "Stand up a lightweight PMO with templates, governance and reporting cadences your teams will actually use.",
  },
  {
    title: "Curriculum Development",
    body: "Custom training curricula, facilitator guides and participant workbooks for in-house academies.",
  },
  {
    title: "Donor Reporting Support",
    body: "Hands-on assistance preparing donor narrative and financial reports against logframes and budgets.",
  },
];

export default function ConsultancyPage() {
  return (
    <>
      <PageHeader
        title="Consultancy Services"
        subtitle="When training alone isn&rsquo;t enough, our practitioners step in alongside your team to design, deliver and document the work."
        crumbs={[{ href: "/consultancy", label: "Consultancy" }]}
      />
      <Section>
        <SectionHeading
          eyebrow="What we offer"
          title="Our Consulting Services"
          subtitle="Short, focused engagements led by senior practitioners — typically 2 to 12 weeks."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-border bg-white p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            Discuss Your Project
          </Link>
        </div>
      </Section>
    </>
  );
}
