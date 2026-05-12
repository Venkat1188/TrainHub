import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import type { Course } from "@/lib/courses";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <Placeholder
        src={`/images/courses/${course.slug}.jpg`}
        alt={course.title}
        label={course.category}
        className="rounded-none border-x-0 border-t-0"
      />
      <div className="flex flex-col gap-3 p-5 flex-1">
        <span className="inline-block self-start text-[11px] font-semibold uppercase tracking-wide text-brand bg-brand-soft px-2 py-1 rounded">
          {course.category}
        </span>
        <h3 className="font-semibold text-foreground leading-snug group-hover:text-brand transition-colors">
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="text-sm text-muted leading-relaxed flex-1">
          {course.shortDescription}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {course.skills.slice(0, 4).map((s) => (
            <span
              key={s}
              className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border mt-1">
          <span>{course.durationDays} days</span>
          <span className="capitalize">{course.format}</span>
          <span className="font-semibold text-foreground">
            ${course.feeUSD}
          </span>
        </div>
        <div className="flex gap-2 pt-2">
          <Link
            href={`/courses/${course.slug}`}
            className="flex-1 text-center text-sm font-semibold text-brand border border-brand rounded-md py-2 hover:bg-brand-soft transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/courses/${course.slug}/register`}
            className="flex-1 text-center text-sm font-semibold text-white bg-brand rounded-md py-2 hover:bg-brand-dark transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </article>
  );
}
