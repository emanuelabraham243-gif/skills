import { Suspense } from "react";
import type { Metadata } from "next";
import CarCard from "@/components/CarCard";
import CarFiltersPanel from "@/components/CarFiltersPanel";
import SectionHeading from "@/components/SectionHeading";
import BodyTypeCarousel from "@/components/BodyTypeCarousel";
import BrandCarousel from "@/components/BrandCarousel";
import { getAllCars, getMakes } from "@/lib/data";
import type { BodyType, CarFilters, FuelType, Transmission } from "@/lib/types";

export const metadata: Metadata = {
  title: "Browse Cars",
  description: "Filter our full inventory of inspected, imported cars by make, price, mileage and more.",
};

function parseFilters(sp: Record<string, string | string[] | undefined>): CarFilters {
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
    make: get("make") || undefined,
    model: get("model") || undefined,
    yearMin: num("yearMin"),
    yearMax: num("yearMax"),
    priceMin: num("priceMin"),
    priceMax: num("priceMax"),
    mileageMax: num("mileageMax"),
    fuelType: (get("fuelType") as FuelType) || undefined,
    transmission: (get("transmission") as Transmission) || undefined,
    bodyType: (get("bodyType") as BodyType) || undefined,
    query: get("q") || undefined,
  };
}

export default async function CarsPage({ searchParams }: PageProps<"/cars">) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const [cars, allCars] = await Promise.all([getAllCars(filters), getAllCars()]);
  const makes = getMakes(allCars);

  return (
    <div>
      <section className="relative overflow-hidden pt-8 sm:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-10 select-none whitespace-nowrap text-center font-display text-[15vw] font-black leading-none text-ink/[0.04] sm:text-[8rem]"
        >
          NUR LA CARS
        </div>

        <div className="container-page relative z-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-car-accent">Inventory</p>
          <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-bold leading-tight text-car-gradient sm:text-4xl">
            Browse our current stock
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            Every car listed here has been inspected and photographed in full. Use the filters to
            narrow down by make, budget, mileage and more.
          </p>
        </div>

        <div className="container-page relative z-10 mt-6">
          <form
            action="/cars"
            method="GET"
            className="rounded-2xl border border-line bg-surface p-3 shadow-lg shadow-ink/10 sm:p-4"
          >
            <div className="flex items-center gap-2 rounded-xl border border-line px-4 py-3">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-ink-soft">
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.45 4.39l3.08 3.08a.75.75 0 1 1-1.06 1.06l-3.08-3.08A7 7 0 0 1 2 9Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                name="q"
                placeholder="Search brand, model, keywords…"
                className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/60"
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-purple sm:grid-cols-4">
              <label className="flex flex-col justify-center px-4 py-2.5">
                <span className="text-[0.65rem] font-medium uppercase tracking-wide text-purple-ink/60">Make</span>
                <select name="make" className="mt-0.5 bg-transparent text-sm text-purple-ink outline-none [color-scheme:dark]">
                  <option value="" className="text-ink">Any make</option>
                  {makes.map((m) => (
                    <option key={m} value={m} className="text-ink">{m}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col justify-center border-t border-purple-ink/10 px-4 py-2.5 sm:border-t-0 sm:border-l">
                <span className="text-[0.65rem] font-medium uppercase tracking-wide text-purple-ink/60">Max budget (ETB)</span>
                <input
                  name="priceMax"
                  type="number"
                  inputMode="numeric"
                  placeholder="e.g. 6000000"
                  className="mt-0.5 bg-transparent text-sm text-purple-ink outline-none placeholder:text-purple-ink/40"
                />
              </label>
              <div className="col-span-2 flex items-center justify-center border-t border-purple-ink/10 p-2 sm:col-span-2 sm:border-t-0 sm:border-l">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-car-accent px-4 py-2.5 text-sm font-semibold text-car-accent-ink transition-colors hover:opacity-90"
                >
                  Find Your Car
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <div className="container-page mt-14 sm:mt-16">
        <SectionHeading eyebrow="Browse" title="Search by Body Type" />
        <div className="mt-6">
          <BodyTypeCarousel />
        </div>
      </div>

      <div className="container-page mt-14 sm:mt-16">
        <SectionHeading eyebrow="Makes" title="Discover Top Car Brands" />
        <div className="mt-6">
          <BrandCarousel makes={makes} />
        </div>
      </div>

      <div className="container-page mt-14 py-4 sm:mt-16">
        <Suspense fallback={<div className="h-16" />}>
          <CarFiltersPanel makes={makes} resultCount={cars.length} />
        </Suspense>

        {cars.length === 0 ? (
          <div className="rounded-2xl border border-line bg-surface p-10 text-center">
            <p className="text-ink">No cars match those filters right now.</p>
            <p className="mt-2 text-sm text-ink-soft">
              Try widening your search, or let us find one for you —{" "}
              <a href="/custom-request" className="text-accent hover:underline">
                request a vehicle
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
