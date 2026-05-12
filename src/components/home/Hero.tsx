import Link from "next/link";

const POPULAR = [
  "Data Analytics",
  "Project Management",
  "Public Health",
  "Finance",
  "Cybersecurity",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-sky-600 text-white">
      <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_40%)]" />
      <div className="container-x relative py-20 sm:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold ring-1 ring-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              New 2026 schedule now open for registration
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Practical Training for{" "}
              <span className="text-sky-200">Working Professionals</span>
            </h1>
            <p className="mt-5 text-lg text-white/85 leading-relaxed">
              Short, intensive courses in research, technology, finance and
              management — delivered online, in-classroom and on-site by
              instructors with deep industry experience. Learn the skills you
              need now, then take them straight back to work.
            </p>

            <form
              action="/courses"
              className="mt-8 flex flex-col sm:flex-row gap-2"
            >
              <input
                type="search"
                name="q"
                placeholder="Search courses, e.g. data analysis"
                className="flex-1 rounded-md bg-white/95 text-foreground placeholder:text-slate-500 px-4 py-3 text-sm outline-none ring-2 ring-transparent focus:ring-sky-300"
              />
              <button
                type="submit"
                className="rounded-md bg-white text-brand-dark font-semibold px-5 py-3 text-sm hover:bg-sky-50 transition-colors"
              >
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/courses"
                className="inline-flex w-full sm:w-auto sm:min-w-[11rem] items-center justify-center rounded-md bg-white text-brand-dark font-semibold px-6 py-3 text-sm hover:bg-sky-50 transition-colors"
              >
                Explore Courses
              </Link>
              <Link
                href="/about"
                className="inline-flex w-full sm:w-auto sm:min-w-[11rem] items-center justify-center rounded-md border border-white/40 text-white font-semibold px-6 py-3 text-sm hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-white/70 mr-2">
                Popular subjects:
              </span>
              {POPULAR.map((p) => (
                <Link
                  key={p}
                  href="/categories"
                  className="text-xs rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1 hover:bg-white/20 transition-colors"
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative aspect-[5/6] rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden
      />
      <div className="absolute top-6 left-6 right-6 rounded-xl bg-white/95 text-foreground p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[10px] uppercase tracking-widest text-muted">Live cohort</span>
        </div>
        <div className="text-xs font-semibold mb-2">Data Analytics — Week 2</div>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-md bg-gradient-to-br from-brand-soft to-sky-100" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/95 text-foreground p-4 shadow-xl">
        <div className="text-[10px] uppercase tracking-widest text-muted mb-1">Certificate of completion</div>
        <div className="text-sm font-semibold leading-tight mb-3">Practical M&amp;E for NGOs</div>
        <div className="flex items-center justify-between">
          <div className="h-2 w-24 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full w-[78%] bg-brand" />
          </div>
          <span className="text-[10px] font-semibold text-brand">78%</span>
        </div>
      </div>
    </div>
  );
}
