import { Section, SectionHeading } from "@/components/Section";
import CourseCard from "@/components/CourseCard";
import type { Course } from "@/lib/courses";

export default function CoursesGrid({
  eyebrow,
  title,
  subtitle,
  courses,
  bg = "white",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  courses: Course[];
  bg?: "white" | "soft";
}) {
  const cls = bg === "soft" ? "bg-slate-50" : "";
  return (
    <Section className={cls}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>
    </Section>
  );
}
