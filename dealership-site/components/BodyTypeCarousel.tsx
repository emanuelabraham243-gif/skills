import Link from "next/link";
import type { CSSProperties } from "react";
import type { ReactNode } from "react";
import type { BodyType } from "@/lib/types";

const bodyTypes: { value: BodyType; label: string; icon: ReactNode }[] = [
  {
    value: "sedan",
    label: "Sedan",
    icon: (
      <svg viewBox="0 0 48 24" fill="currentColor" className="h-8 w-12">
        <path d="M2 17c0-1 .6-2 1.6-2.3l4-1.2 3.8-5.6C12.2 6.4 13.8 5.5 15.5 5.5h10c1.6 0 3.1.8 4 2.2l2.6 4 6-.4c2 0 4 1.6 4 3.7v2c0 1-.8 2-1.8 2H36c0 2.2-1.8 4-4 4s-4-1.8-4-4H16c0 2.2-1.8 4-4 4s-4-1.8-4-4H3.8C2.8 19 2 18.1 2 17Z" />
        <circle cx="12" cy="19" r="2.3" className="fill-paper" />
        <circle cx="32" cy="19" r="2.3" className="fill-paper" />
      </svg>
    ),
  },
  {
    value: "suv",
    label: "SUV",
    icon: (
      <svg viewBox="0 0 48 24" fill="currentColor" className="h-8 w-12">
        <path d="M4 17c-1 0-2-.9-2-2v-2.5c0-1.4.9-2.6 2.2-3l4.6-1.4 2.6-4.3C12.2 2.7 13.7 2 15.3 2H30c1.6 0 3 .9 3.7 2.2l1.8 3.4 7-.1c2 0 4.5 1.8 4.5 4v3c0 1.4-1.1 2.5-2.5 2.5h-1c0 2.2-1.8 4-4 4s-4-1.8-4-4H16c0 2.2-1.8 4-4 4s-4-1.8-4-4H4Z" />
        <circle cx="14" cy="19" r="2.3" className="fill-paper" />
        <circle cx="35" cy="19" r="2.3" className="fill-paper" />
      </svg>
    ),
  },
  {
    value: "van",
    label: "Van",
    icon: (
      <svg viewBox="0 0 48 24" fill="currentColor" className="h-8 w-12">
        <path d="M3 17c-1 0-2-.9-2-2V8c0-1.7 1.3-3 3-3h30c1.7 0 3.1 1 3.7 2.5l2.5 6c1.7.3 3.8 1.6 3.8 3.5v.9c0 1.2-1 2.1-2.1 2.1H43c0 2.2-1.8 4-4 4s-4-1.8-4-4H14c0 2.2-1.8 4-4 4s-4-1.8-4-4H3Z" />
        <circle cx="10" cy="19" r="2.3" className="fill-paper" />
        <circle cx="39" cy="19" r="2.3" className="fill-paper" />
      </svg>
    ),
  },
  {
    value: "crossover",
    label: "Crossover",
    icon: (
      <svg viewBox="0 0 48 24" fill="currentColor" className="h-8 w-12">
        <path d="M3 16.5c-1 0-1.8-.8-1.8-2v-2c0-1.3.9-2.4 2.1-2.7l4.4-1.1 3-4.4C11.6 2.9 13 2.2 14.5 2.2h13c1.5 0 2.9.7 3.8 1.9l3 4.1 6.4-.2c2 0 4.5 1.8 4.5 4v2.5c0 1.3-1 2.2-2.3 2.2h-1.2c0 2.2-1.8 4-4 4s-4-1.8-4-4H15c0 2.2-1.8 4-4 4s-4-1.8-4-4H3Z" />
        <circle cx="13" cy="18.5" r="2.3" className="fill-paper" />
        <circle cx="33" cy="18.5" r="2.3" className="fill-paper" />
      </svg>
    ),
  },
  {
    value: "hatchback",
    label: "Hatchback",
    icon: (
      <svg viewBox="0 0 48 24" fill="currentColor" className="h-8 w-12">
        <path d="M4 17c-1 0-2-.9-2-2v-1.8c0-1.3.8-2.5 2.1-2.9l4.2-1.4 2.9-4.6C11.9 2.9 13.4 2 15 2h12l6.5 6.5 6.4.4c1.7.1 3.1 1.5 3.1 3.2v2c0 1.6-1.3 2.9-2.9 2.9H40c0 2.2-1.8 4-4 4s-4-1.8-4-4H15c0 2.2-1.8 4-4 4s-4-1.8-4-4H4Z" />
        <circle cx="12" cy="19" r="2.3" className="fill-paper" />
        <circle cx="36" cy="19" r="2.3" className="fill-paper" />
      </svg>
    ),
  },
  {
    value: "pickup",
    label: "Pickup Truck",
    icon: (
      <svg viewBox="0 0 48 24" fill="currentColor" className="h-8 w-12">
        <path d="M2 17c-1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h6L14 3c.9-.9 2.2-1.5 3.5-1.5H24v9.5h5.5l3-6.2c.5-1 1.5-1.6 2.6-1.6H38c1.7 0 3.2 1.1 3.7 2.7L44 11h1c1.7 0 3 1.3 3 3v1c0 1.1-.9 2-2 2h-2c0 2.2-1.8 4-4 4s-4-1.8-4-4H15c0 2.2-1.8 4-4 4s-4-1.8-4-4H2Z" />
        <circle cx="11" cy="19" r="2.3" className="fill-paper" />
        <circle cx="36" cy="19" r="2.3" className="fill-paper" />
      </svg>
    ),
  },
];

export default function BodyTypeCarousel() {
  // Rendered twice back-to-back so the marquee-scroll animation (0 to -50%)
  // loops seamlessly — see .marquee-track in globals.css.
  const loop = [...bodyTypes, ...bodyTypes];

  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track flex w-max gap-4"
        style={{ "--marquee-duration": "26s" } as CSSProperties}
      >
        {loop.map((bt, i) => (
          <Link
            key={`${bt.value}-${i}`}
            href={`/cars?bodyType=${bt.value}`}
            className="flex w-36 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-surface py-8 text-purple transition-colors hover:border-purple hover:bg-purple-soft"
          >
            {bt.icon}
            <span className="text-xs font-semibold uppercase tracking-wide text-ink">{bt.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
