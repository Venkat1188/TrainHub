import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import { Section } from "@/components/Section";

export default function AboutBlurb() {
  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <Placeholder
          src="/images/about/training.jpg"
          alt="Training in action"
          label="Training in action"
          ratio="aspect-[4/3]"
          className="rounded-2xl"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">
            About us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            About TrainHub Institute
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            TrainHub Institute is a professional training provider focused on
            short, applied courses for working professionals. We work with
            individuals, government agencies, NGOs and private companies
            across more than 60 countries.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            Our programs are designed and delivered by senior practitioners,
            so participants spend more time on real exercises and less time
            on theory. Most courses run for one or two weeks and include
            assessment, certification and follow-up materials.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
            >
              Learn More About Us
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center rounded-md border border-brand text-brand px-5 py-2.5 text-sm font-semibold hover:bg-brand-soft transition-colors"
            >
              Explore All Courses
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
