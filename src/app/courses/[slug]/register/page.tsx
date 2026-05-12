import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import RegistrationForm from "@/components/RegistrationForm";
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
  return { title: course ? `Register: ${course.title}` : "Register" };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <>
      <PageHeader
        title={`Register: ${course.title}`}
        subtitle="Complete your details below and pay securely. You will receive joining instructions by email within one business day."
        crumbs={[
          { href: "/courses", label: "Courses" },
          { href: `/courses/${course.slug}`, label: course.title },
          { href: `/courses/${course.slug}/register`, label: "Register" },
        ]}
      />
      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RegistrationForm
              courseSlug={course.slug}
              courseTitle={course.title}
              feeUSD={course.feeUSD}
            />
          </div>
          <aside className="lg:col-span-1 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-white p-6">
              <div className="text-sm text-muted">Your selected course</div>
              <div className="mt-1 font-semibold leading-snug">
                {course.title}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted">Duration</div>
                  <div className="font-medium">{course.durationDays} days</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Format</div>
                  <div className="font-medium capitalize">{course.format}</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Location</div>
                  <div className="font-medium">{course.location}</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Fee</div>
                  <div className="font-semibold text-foreground">
                    ${course.feeUSD}
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-white p-6 text-sm text-muted">
              <p className="font-semibold text-foreground mb-2">
                What happens next?
              </p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Submit this form and pay securely with Stripe.</li>
                <li>We confirm your seat by email within one business day.</li>
                <li>
                  You receive joining instructions, pre-reading and the trainer
                  contact 7 days before the course.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
