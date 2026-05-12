"use client";

import { useState } from "react";

export type FAQItem = { q: string; a: string };

export default function Accordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-slate-50"
            >
              <span className="font-medium text-foreground">{item.q}</span>
              <span
                className={`shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-brand transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 -mt-1 text-sm text-muted leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
