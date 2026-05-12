"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/categories", label: "Categories" },
  { href: "/skills", label: "Skills" },
  { href: "/locations", label: "Locations" },
  { href: "/courses", label: "Courses" },
  { href: "/online-courses", label: "Online Courses" },
  { href: "/group-rates", label: "Group Rates" },
  { href: "/consultancy", label: "Consultancy" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border">
      <div className="container-x flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white font-bold">
            TH
          </span>
          <span className="font-semibold text-lg tracking-tight">
            TrainHub <span className="text-brand">Institute</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-5 min-w-0">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-brand transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors whitespace-nowrap leading-none h-9"
          >
            Explore Courses
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-border"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-white">
          <nav className="container-x py-3 grid grid-cols-2 gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:bg-brand-soft hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/courses"
              onClick={() => setOpen(false)}
              className="col-span-2 mt-1 inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white"
            >
              Explore Courses
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
