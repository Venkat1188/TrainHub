import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { COURSES, CATEGORIES } from "@/lib/courses";

export const metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        title="Course Categories"
        subtitle="Browse our placeholder categories. Replace with your own taxonomy."
        crumbs={[{ href: "/categories", label: "Categories" }]}
      />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const count = COURSES.filter((c) => c.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/courses?category=${encodeURIComponent(cat)}`}
                className="rounded-xl border border-border bg-white p-6 hover:border-brand/40 hover:shadow-md transition-all"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand mb-3 font-bold">
                  {cat[0]}
                </div>
                <h3 className="font-semibold text-foreground">{cat}</h3>
                <p className="text-sm text-muted mt-1">{count} courses</p>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
