"use client";

import { useState } from "react";

export default function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="font-medium text-ink">{item.question}</span>
              <span className={`shrink-0 text-xl text-ink-soft transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-ink-soft sm:px-6">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
