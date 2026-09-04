import CountUp from "@/components/CountUp";
import { siteConfig } from "@/lib/site-config";

export default function TrustStats({ variant = "surface" }: { variant?: "surface" | "overlay" }) {
  if (siteConfig.stats.length === 0) return null;

  const grid = (
    <div className="container-page grid grid-cols-2 gap-6 py-10 sm:grid-cols-4 sm:py-12">
      {siteConfig.stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p
            className={`font-display text-3xl font-bold sm:text-4xl ${
              variant === "overlay" ? "text-ink" : "text-purple"
            }`}
          >
            {stat.to !== undefined ? (
              <>
                <CountUp to={stat.to} separator={stat.separator} duration={1.5} />
                {stat.suffix}
              </>
            ) : (
              stat.value
            )}
          </p>
          <p
            className={`mt-1 text-xs font-medium uppercase tracking-wide sm:text-sm ${
              variant === "overlay" ? "text-ink/70" : "text-ink-soft"
            }`}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );

  // "overlay": bare grid, dark text, meant to sit directly on a photo (the
  // homepage hero) — no card background of its own.
  if (variant === "overlay") return grid;

  return <section className="border-y border-line bg-surface">{grid}</section>;
}
