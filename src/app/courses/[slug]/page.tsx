import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Placeholder from "@/components/Placeholder";
import { Section } from "@/components/Section";
import { COURSES } from "@/lib/courses";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  return { title: course?.title ?? "Course" };
}

function buildObjectives(course: (typeof COURSES)[number]) {
  return [
    `Understand the core concepts and current best practice in ${course.category.toLowerCase()}.`,
    `Apply ${course.skills[0]} to a realistic, work-relevant problem.`,
    `Use ${course.skills[1] ?? course.skills[0]} confidently in day-to-day tasks.`,
    `Evaluate the quality of outputs and identify common pitfalls.`,
    `Communicate findings and recommendations to non-technical stakeholders.`,
    `Build a reusable template or workflow you can take back to work.`,
    `Plan a 30/60/90-day learning path for continued development.`,
    `Earn a verifiable certificate of completion on the final day.`,
  ];
}

function buildModules(course: (typeof COURSES)[number]) {
  const skill = course.skills;
  return [
    {
      title: `Module 1: Foundations of ${course.category}`,
      bullets: [
        "Key concepts, terminology and where they apply",
        "Industry context and current standards",
        "Self-assessment and goal-setting for the week",
        "Walk-through of the course datasets and case study",
      ],
    },
    {
      title: `Module 2: Working with ${skill[0]}`,
      bullets: [
        `Setting up ${skill[0]} for productive use`,
        "Hands-on exercise from a real working dataset",
        "Common mistakes and how to avoid them",
        "Group review of participant outputs",
      ],
    },
    {
      title: `Module 3: ${skill[1] ?? "Applied Methods"} in practice`,
      bullets: [
        `Core techniques in ${skill[1] ?? skill[0]}`,
        "Mini-case from the participants&rsquo; own sectors",
        "Quality checks and validation",
        "Building a template for reuse",
      ],
    },
    {
      title: `Module 4: ${skill[2] ?? "Integration & Reporting"}`,
      bullets: [
        "Bringing the pieces together end-to-end",
        "Producing a stakeholder-ready output",
        "Peer review session",
        "Trainer feedback and refinements",
      ],
    },
    {
      title: "Module 5: Capstone exercise",
      bullets: [
        "Individual or small-group capstone brief",
        "Working session with trainer support",
        "Short presentation of results",
        "Written feedback and next-step recommendations",
      ],
    },
    {
      title: "Module 6: Wrap-up and certification",
      bullets: [
        "Recap of the full week and key takeaways",
        "Personal action plan for the next 90 days",
        "Issuing of certificates",
        "Joining the alumni Q&A community",
      ],
    },
  ];
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  const objectives = buildObjectives(course);
  const modules = buildModules(course);

  return (
    <>
      <PageHeader
        title={course.title}
        subtitle={course.shortDescription}
        crumbs={[
          { href: "/courses", label: "Courses" },
          { href: `/courses/${course.slug}`, label: course.title },
        ]}
      />
      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <Placeholder
              src={`/images/courses/${course.slug}.jpg`}
              alt={course.title}
              label={course.category}
              ratio="aspect-[21/9]"
              className="rounded-2xl"
            />
            <div>
              <h2 className="text-2xl font-bold mb-3">Introduction</h2>
              <p className="text-muted leading-relaxed">
                {course.title} is a {course.durationDays}-day intensive
                programme aimed at professionals working in or moving into{" "}
                {course.category.toLowerCase()}. The course is delivered in a{" "}
                {course.format} format and balances short concept inputs with
                extended hands-on practice on realistic datasets and scenarios.
              </p>
              <p className="mt-3 text-muted leading-relaxed">
                Participants leave with practical skills in{" "}
                {course.skills.join(", ")}, a portfolio piece built during the
                course, and two months of post-training Q&amp;A access to the
                lead trainer.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Course Objectives</h2>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/85">
                {objectives.map((obj, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand">✓</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Course Modules</h2>
              <div className="space-y-4">
                {modules.map((m) => (
                  <div
                    key={m.title}
                    className="rounded-xl border border-border bg-white p-5"
                  >
                    <h3 className="font-semibold text-foreground mb-2">
                      {m.title}
                    </h3>
                    <ul className="text-sm text-muted space-y-1">
                      {m.bullets.map((b) => (
                        <li key={b}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-white p-6">
              <div className="text-sm text-muted">Fee</div>
              <div className="text-3xl font-bold text-foreground">
                ${course.feeUSD}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted">Duration</div>
                  <div className="font-medium">{course.durationDays} days</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Location</div>
                  <div className="font-medium">{course.location}</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Format</div>
                  <div className="font-medium capitalize">{course.format}</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Category</div>
                  <div className="font-medium">{course.category}</div>
                </div>
              </div>
              <Link
                href={`/courses/${course.slug}/register`}
                className="mt-5 block text-center rounded-md bg-brand text-white font-semibold py-2.5 text-sm hover:bg-brand-dark transition-colors"
              >
                Register Online
              </Link>
              <Link
                href="/group-rates"
                className="mt-2 block text-center rounded-md border border-brand text-brand font-semibold py-2.5 text-sm hover:bg-brand-soft transition-colors"
              >
                Group Rates
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <div className="text-sm font-semibold mb-2">Skills covered</div>
              <div className="flex flex-wrap gap-1.5">
                {course.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
