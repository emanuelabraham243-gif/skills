import Link from "next/link";
import type { CSSProperties } from "react";

// Real manufacturer logos are trademarked assets this project has no rights
// to use, and there's no way to fetch them here anyway (no outbound network
// access). These monogram badges are a deliberate stand-in — a deterministic
// color per make so each brand still reads as a distinct "logo" — not a
// substitute for the real thing. Swap in licensed brand marks if/when
// available.
const monogramPalette = [
  "#3d2a6b", "#f5821f", "#0f6e63", "#b5592f", "#16a34a",
  "#9333ea", "#0369a1", "#c1892c", "#be123c", "#166534",
];

function monogramColor(make: string): string {
  let hash = 0;
  for (let i = 0; i < make.length; i++) hash = (hash * 31 + make.charCodeAt(i)) >>> 0;
  return monogramPalette[hash % monogramPalette.length];
}

function initials(make: string): string {
  return make.slice(0, 2).toUpperCase();
}

export default function BrandCarousel({ makes }: { makes: string[] }) {
  if (makes.length === 0) return null;

  // Rendered twice back-to-back so the marquee-scroll animation (0 to -50%)
  // loops seamlessly — see .marquee-track in globals.css.
  const loop = [...makes, ...makes];

  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track flex w-max gap-4"
        style={{ "--marquee-duration": "32s" } as CSSProperties}
      >
        {loop.map((make, i) => (
          <Link
            key={`${make}-${i}`}
            href={`/cars?make=${encodeURIComponent(make)}`}
            className="flex h-28 w-40 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-surface text-center transition-colors hover:border-purple hover:bg-purple-soft"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: monogramColor(make) }}
              aria-hidden
            >
              {initials(make)}
            </span>
            <span className="font-display text-base font-semibold text-ink">{make}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
