import Link from "next/link";

const TABS = [
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/inquiries", label: "Inquiries" },
] as const;

export default function AdminTabs({ active }: { active: "registrations" | "inquiries" }) {
  return (
    <div className="container-x -mt-4 mb-6">
      <nav className="inline-flex rounded-lg border border-border bg-white p-1 text-sm">
        {TABS.map((t) => {
          const isActive = t.href.endsWith(active);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={
                isActive
                  ? "rounded-md bg-brand text-white px-4 py-1.5 font-semibold"
                  : "rounded-md px-4 py-1.5 font-medium text-foreground/70 hover:text-brand"
              }
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
