import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { COURSES } from "@/lib/courses";

export const metadata = { title: "Payment cancelled" };

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course: courseSlug } = await searchParams;
  const course = COURSES.find((c) => c.slug === courseSlug);

  return (
    <>
      <PageHeader
        title="Payment cancelled"
        subtitle="No charge has been made. You can try again, choose a different course or get in touch if you ran into a problem."
        crumbs={[{ href: "/payment/cancel", label: "Payment cancelled" }]}
      />
      <Section>
        <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-white p-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 8v5M12 17v.01" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Nothing was charged</h2>
          <p className="text-muted leading-relaxed">
            Your registration was not completed. Your seat is not yet reserved
            {course ? ` for ${course.title}` : ""}.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {course && (
              <Link
                href={`/courses/${course.slug}/register`}
                className="inline-flex items-center justify-center rounded-md bg-brand text-white font-semibold px-5 py-2.5 text-sm hover:bg-brand-dark transition-colors"
              >
                Try again
              </Link>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-slate-50 transition-colors"
            >
              Contact us for help
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
