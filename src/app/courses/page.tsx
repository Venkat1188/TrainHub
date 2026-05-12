import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import CourseCard from "@/components/CourseCard";
import { COURSES, CATEGORIES } from "@/lib/courses";

export const metadata = { title: "Courses" };

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const term = (q ?? "").toLowerCase().trim();

  const filtered = COURSES.filter((c) => {
    const matchesTerm =
      !term ||
      c.title.toLowerCase().includes(term) ||
      c.shortDescription.toLowerCase().includes(term) ||
      c.skills.some((s) => s.toLowerCase().includes(term));
    const matchesCat = !category || c.category === category;
    return matchesTerm && matchesCat;
  });

  return (
    <>
      <PageHeader
        title="All Courses"
        subtitle="Browse our full schedule of short professional courses across data, project management, finance, M&E, IT, public health, leadership and HR."
        crumbs={[{ href: "/courses", label: "Courses" }]}
      />
      <Section>
        <form
          action="/courses"
          className="mb-8 flex flex-col sm:flex-row gap-2"
        >
          <input
            name="q"
            defaultValue={q ?? ""}
            type="search"
            placeholder="Search courses..."
            className="flex-1 rounded-md border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
          <select
            name="category"
            defaultValue={category ?? ""}
            className="rounded-md border border-border px-4 py-2.5 text-sm bg-white"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
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
          <p className="text-muted">No courses match your filters.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
