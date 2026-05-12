import PageHeader from "@/components/PageHeader";
import Placeholder from "@/components/Placeholder";
import { Section, SectionHeading } from "@/components/Section";

export const metadata = { title: "About Us" };

const VALUES = [
  {
    title: "Integrity",
    body: "We deliver what we promise — accurate content, qualified trainers and transparent pricing with no hidden fees.",
  },
  {
    title: "Excellence",
    body: "Every programme is reviewed by practitioners and updated each year to reflect current standards and tools.",
  },
  {
    title: "Practical",
    body: "Sessions are 60% hands-on. Participants leave with templates, datasets and code they can use the next working day.",
  },
  {
    title: "Inclusive",
    body: "Cohorts are deliberately small and mixed across sectors and regions, giving participants a wider professional network.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About TrainHub Institute"
        subtitle="An independent professional training institute working with public-sector teams, NGOs and private companies across Africa, the Middle East and beyond."
        crumbs={[{ href: "/about", label: "About" }]}
      />
      <Section>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Our Story"
              align="left"
            />
            <p className="text-muted leading-relaxed">
              TrainHub Institute was set up by a group of practitioners who
              had spent years building monitoring systems, managing donor
              budgets and running data teams. We saw the same gap repeatedly:
              short courses that were either too academic or too vendor-driven
              to be useful back at the desk.
            </p>
            <p className="mt-3 text-muted leading-relaxed">
              Today we run more than 60 short courses a year across data
              analytics, project management, finance, M&amp;E, IT and
              leadership. Cohorts stay small (typically 12&ndash;20
              participants), trainers come from active practice, and every
              programme ends with a piece of work the participant can take
              back to their organisation.
            </p>
          </div>
          <Placeholder
            src="/images/about/team.jpg"
            alt="Our team"
            label="Our team"
            ratio="aspect-[4/3]"
            className="rounded-2xl"
          />
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="What we believe"
          title="Our Core Values"
          subtitle="Four principles that shape how every course is designed and delivered."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-xl bg-white p-6 border border-border"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand mb-3 font-bold">
                {v.title[0]}
              </div>
              <h3 className="font-semibold mb-1">{v.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
