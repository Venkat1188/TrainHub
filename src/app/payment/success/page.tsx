import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { COURSES } from "@/lib/courses";

export const metadata = { title: "Payment successful" };

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; course?: string }>;
}) {
  const { session_id, course: courseSlug } = await searchParams;
  const course = COURSES.find((c) => c.slug === courseSlug);

  return (
    <>
      <PageHeader
        title="Payment received — thank you"
        subtitle="Your enrolment is confirmed. A receipt and joining instructions are on their way to your inbox."
        crumbs={[{ href: "/payment/success", label: "Payment successful" }]}
      />
      <Section>
        <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-white p-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">You&rsquo;re registered</h2>
          {course ? (
            <p className="text-muted leading-relaxed">
              Your seat on <span className="font-semibold text-foreground">{course.title}</span> is
              confirmed. We&rsquo;ll email pre-reading and final joining
              instructions seven days before the start date.
            </p>
          ) : (
            <p className="text-muted leading-relaxed">
              We&rsquo;ll be in touch shortly with the next steps.
            </p>
          )}

          {session_id && (
            <p className="mt-4 text-xs text-muted">
              Reference: <span className="font-mono">{session_id}</span>
            </p>
          )}

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
