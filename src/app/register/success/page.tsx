import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { COURSES } from "@/lib/courses";

export const metadata = { title: "Registration received" };

export default async function RegisterSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course: courseSlug } = await searchParams;
  const course = COURSES.find((c) => c.slug === courseSlug);

  return (
    <>
      <PageHeader
        title="Registration received — thank you"
        subtitle="Your seat is reserved. Our team will confirm by email within one business day and share invoicing details."
        crumbs={[{ href: "/register/success", label: "Registration received" }]}
      />
      <Section>
        <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-white p-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">You&rsquo;re on the list</h2>
          {course ? (
            <p className="text-muted leading-relaxed">
              We&rsquo;ve reserved your seat on{" "}
              <span className="font-semibold text-foreground">{course.title}</span>.
              A confirmation email is on its way to your inbox. Our team will
              follow up within one business day with invoicing details and the
              joining instructions.
            </p>
          ) : (
            <p className="text-muted leading-relaxed">
              We&rsquo;ll be in touch shortly with the next steps and invoicing
              details.
            </p>
          )}

          <div className="mt-6 rounded-lg border border-border bg-slate-50 p-4 text-left text-sm">
            <p className="font-semibold text-foreground mb-1">What happens next?</p>
            <ol className="list-decimal pl-5 space-y-1 text-muted">
              <li>Our coordinator reviews your registration.</li>
              <li>You receive an invoice and payment instructions by email.</li>
              <li>
                Pre-reading and final joining instructions arrive seven days
                before the start date.
              </li>
            </ol>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-md bg-brand text-white font-semibold px-5 py-2.5 text-sm hover:bg-brand-dark transition-colors"
            >
              Browse more courses
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-slate-50 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
