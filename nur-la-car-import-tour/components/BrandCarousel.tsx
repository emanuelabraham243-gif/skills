"use client";

import Link from "next/link";
import { useRef } from "react";

export default function BrandCarousel({ makes }: { makes: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * 220, behavior: "smooth" });
  }

  if (makes.length === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className="absolute -left-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-car-accent text-white shadow-md sm:flex"
      >
        ‹
      </button>
      <div ref={trackRef} className="scroll-snap-x flex gap-4 overflow-x-auto pb-2">
        {makes.map((make) => (
          <Link
            key={make}
            href={`/cars?make=${encodeURIComponent(make)}`}
            className="scroll-snap-item flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-line bg-surface text-center transition-colors hover:border-purple hover:bg-purple-soft"
          >
            <span className="font-display text-lg font-semibold text-ink">{make}</span>
          </Link>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className="absolute -right-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-car-accent text-white shadow-md sm:flex"
      >
        ›
      </button>
    </div>
  );
}
