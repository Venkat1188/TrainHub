import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/Section";
import CourseCard from "@/components/CourseCard";
import { COURSES, CATEGORIES } from "@/lib/courses";

export const metadata = {
  title: "Online Courses",
  description:
    "Live, instructor-led online courses you can join from anywhere — same trainers, same materials, same certificate.",
};

const BENEFITS = [
  {
    title: "Live, instructor-led",
    body: "Every online course is taught live by the same trainers who run our classroom programmes. No pre-recorded videos.",
  },
  {
    title: "Small cohorts",
    body: "Cohorts are capped at 20 participants so the trainer can actually see your work and answer your questions.",
  },
  {
    title: "Hands-on, not just slides",
    body: "Roughly 60% of each session is hands-on practice on real datasets, templates and tools.",
  },
  {
    title: "Same certificate",
    body: "Earn the same verifiable certificate of completion issued for our classroom programmes.",
  },
];

export default async function OnlineCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const term = (q ?? "").toLowerCase().trim();

  const onlineCourses = COURSES.filter(
    (c) => c.format === "online" || c.format === "hybrid",
  );

  const filtered = onlineCourses.filter((c) => {
    const matchesTerm =
      !term ||
      c.title.toLowerCase().includes(term) ||
      c.shortDescription.toLowerCase().includes(term) ||
      c.skills.some((s) => s.toLowerCase().includes(term));
    const matchesCat = !category || c.category === category;
    return matchesTerm && matchesCat;
  });

  const onlineCategories = CATEGORIES.filter((cat) =>
    onlineCourses.some((c) => c.category === cat),
  );

  return (
    <>
      <PageHeader
        title="Online Courses"
        subtitle="Live, instructor-led training you can join from anywhere — fully online or hybrid cohorts with the same trainers, materials and certificate as our classroom programmes."
        crumbs={[{ href: "/online-courses", label: "Online Courses" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="Why online with us"
          title="The same training, without the travel"
          subtitle="Designed from the ground up for live online delivery — not a recorded version of a classroom course."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-border bg-white p-6"
            >
              <h3 className="font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="Browse"
          title="Available online cohorts"
          subtitle="All courses delivered fully online or in a hybrid format."
        />
        <form
          action="/online-courses"
          className="mb-8 flex flex-col sm:flex-row gap-2"
        >
          <input
            name="q"
            defaultValue={q ?? ""}
            type="search"
            placeholder="Search online courses..."
            className="flex-1 rounded-md border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 bg-white"
          />
          <select
            name="category"
            defaultValue={category ?? ""}
            className="rounded-md border border-border px-4 py-2.5 text-sm bg-white"
          >
            <option value="">All categories</option>
            {onlineCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-md bg-brand text-white font-semibold px-5 py-2.5 text-sm hover:bg-brand-dark transition-colors"
          >
            Filter
          </button>
        </form>

        {filtered.length === 0 ? (
          <p className="text-muted">No online courses match your filters.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center rounded-md border border-brand px-6 py-3 text-sm font-semibold text-brand hover:bg-brand-soft transition-colors"
          >
            See all courses (online + classroom)
          </Link>
        </div>
      </Section>
    </>
  );
}
