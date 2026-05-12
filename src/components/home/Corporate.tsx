import Link from "next/link";

const POINTS = [
  {
    title: "Volume Discounts",
    body: "Save up to 50% per seat as your group size grows — predictable pricing for whole-team enrolment.",
  },
  {
    title: "Tailored Curriculum",
    body: "We adapt content, datasets and exercises to your sector, tools and internal terminology.",
  },
  {
    title: "Flexible Delivery",
    body: "Run sessions on-site at your office, fully online or as a blended programme — your choice of pace and timezone.",
  },
  {
    title: "Post-Training Support",
    body: "Two months of follow-up Q&A with the trainer plus take-home templates and reference material.",
  },
];

const STATS = [
  { v: "20+", l: "Years training teams" },
  { v: "500+", l: "Organisations served" },
  { v: "12,500+", l: "Professionals trained" },
  { v: "97%", l: "Would recommend" },
];

export default function Corporate() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-brand-dark to-brand text-white">
      <div className="container-x py-20 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-sky-300 mb-3">
            Corporate Training
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Build a Stronger Team, Faster
          </h2>
          <p className="mt-4 text-white/80 leading-relaxed max-w-xl">
            Bring any of our courses in-house and we&apos;ll tailor it to your
            team&apos;s tools, sector and goals. Group rates start from three
            participants and scale to whole departments.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            {POINTS.map((p) => (
              <div key={p.title} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-white/75">{p.body}</p>
              </div>
            ))}
          </div>
          <Link
            href="/group-rates"
            className="mt-8 inline-flex items-center rounded-md bg-white text-brand-dark font-semibold px-6 py-3 text-sm hover:bg-sky-50 transition-colors"
          >
            Get Group Rates Quote
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:pl-8">
          {STATS.map((s) => (
            <div
              key={s.l}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8 text-center"
            >
              <div className="text-4xl font-bold">{s.v}</div>
              <div className="mt-1 text-sm text-white/70">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
