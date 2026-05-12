const STATS = [
  { value: "120+", label: "Courses on offer" },
  { value: "12,500+", label: "Professionals trained" },
  { value: "60+", label: "Countries reached" },
  { value: "97%", label: "Would recommend" },
];

export default function Stats() {
  return (
    <section className="bg-brand text-white">
      <div className="container-x py-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl sm:text-4xl font-bold">{s.value}</div>
            <div className="mt-1 text-sm text-white/80">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
