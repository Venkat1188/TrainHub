import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { COURSES } from "@/lib/courses";

export const metadata = { title: "Skills" };

export default function SkillsPage() {
  const skills = Array.from(new Set(COURSES.flatMap((c) => c.skills))).sort();
  return (
    <>
      <PageHeader
        title="Skills You Can Learn"
        subtitle="Placeholder skills index. Replace with your own taxonomy of skills."
        crumbs={[{ href: "/skills", label: "Skills" }]}
      />
      <Section>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm text-foreground/80 hover:border-brand/40 hover:text-brand transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
