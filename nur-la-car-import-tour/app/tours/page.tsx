import { Suspense } from "react";
import type { Metadata } from "next";
import TourCard from "@/components/TourCard";
import TourFiltersPanel from "@/components/TourFiltersPanel";
import SectionHeading from "@/components/SectionHeading";
import { getAllTours } from "@/lib/data";
import type { TourCategory, TourDifficulty, TourFilters } from "@/lib/types";

export const metadata: Metadata = {
  title: "Browse Tours",
  description: "Guided tours across Ethiopia — historical, cultural, wildlife and adventure routes led by licensed local guides.",
};

function parseFilters(sp: Record<string, string | string[] | undefined>): TourFilters {
  const get = (key: string) => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };
  const num = (key: string) => {
    const v = get(key);
    const n = v ? Number(v) : undefined;
    return n && !Number.isNaN(n) ? n : undefined;
  };
  return {
    category: (get("category") as TourCategory) || undefined,
    difficulty: (get("difficulty") as TourDifficulty) || undefined,
    durationMax: num("durationMax"),
    priceMax: num("priceMax"),
    query: get("q") || undefined,
  };
}

export default async function ToursPage({ searchParams }: PageProps<"/tours">) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const tours = await getAllTours(filters);

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow="Tours"
        title="Browse our tour packages"
        description="Small-group departures across Ethiopia's historic, natural and cultural landmarks. Use the filters to narrow by category, difficulty or budget."
      />

      <Suspense fallback={<div className="mt-8 h-16" />}>
        <TourFiltersPanel resultCount={tours.length} />
      </Suspense>

      {tours.length === 0 ? (
        <div className="rounded-2xl border border-line bg-surface p-10 text-center">
          <p className="text-ink">No tours match those filters right now.</p>
          <p className="mt-2 text-sm text-ink-soft">
            Try widening your search, or let us know what you have in mind —{" "}
            <a href="/plan-a-tour" className="text-accent hover:underline">
              tell us your ideal trip
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
