import { siteConfig } from "@/lib/site-config";

export default function TrustStats() {
  if (siteConfig.stats.length === 0) return null;

  return (
    <section className="border-y border-line bg-surface">
      <div className="container-page grid grid-cols-2 gap-6 py-10 sm:grid-cols-4 sm:py-12">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-bold text-purple sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-soft sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
