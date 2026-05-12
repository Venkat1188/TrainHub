import Link from "next/link";

export default function PageHeader({
  title,
  subtitle,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  crumbs?: { href: string; label: string }[];
}) {
  return (
    <section className="bg-gradient-to-br from-brand-dark via-brand to-sky-600 text-white">
      <div className="container-x py-14 sm:py-20">
        <nav className="text-xs text-white/70 mb-3" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.href}>
              {" / "}
              <Link href={c.href} className="hover:text-white">
                {c.label}
              </Link>
            </span>
          ))}
        </nav>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-white/85 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
