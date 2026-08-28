import { Suspense } from "react";
import type { Metadata } from "next";
import CarCard from "@/components/CarCard";
import CarFiltersPanel from "@/components/CarFiltersPanel";
import SectionHeading from "@/components/SectionHeading";
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
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow="Inventory"
        title="Browse our current stock"
        description="Every car listed here has been inspected and photographed in full. Use the filters to narrow down by make, budget, mileage and more."
      />

      <Suspense fallback={<div className="mt-8 h-16" />}>
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
  );
}
