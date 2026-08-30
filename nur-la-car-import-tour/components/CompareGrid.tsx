"use client";

import Image from "next/image";
import type { Car } from "@/lib/types";
import { formatMileage, titleCase } from "@/lib/format";
import PriceGate from "./PriceGate";
import { addToCompare, removeFromCompare, useCompareList, MAX_COMPARE } from "@/lib/compare";

const specRows: { label: string; get: (c: Car) => string }[] = [
  { label: "Year", get: (c) => String(c.year) },
  { label: "Mileage", get: (c) => formatMileage(c.mileageKm) },
  { label: "Fuel type", get: (c) => titleCase(c.fuelType) },
  { label: "Transmission", get: (c) => titleCase(c.transmission) },
  { label: "Body type", get: (c) => titleCase(c.bodyType) },
  { label: "Drivetrain", get: (c) => c.drivetrain ?? "—" },
  { label: "Engine", get: (c) => c.engine ?? "—" },
  { label: "Exterior color", get: (c) => c.exteriorColor },
  { label: "Seats", get: (c) => (c.seats ? String(c.seats) : "—") },
];

export default function CompareGrid({ cars }: { cars: Car[] }) {
  const ids = useCompareList();
  const selected = ids.map((id) => cars.find((c) => c.id === id)).filter((c): c is Car => Boolean(c));
  const availableCars = cars.filter((c) => !ids.includes(c.id));
  const slots = Array.from({ length: MAX_COMPARE });

  return (
    <div>
      <div className="overflow-hidden rounded-3xl bg-car-gradient p-8 sm:p-12">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Not sure which car to buy?</h1>
        <p className="mt-2 text-lg font-medium text-white/90">Compare cars side-by-side</p>
        <p className="mt-2 max-w-xl text-sm text-white/70">
          Pick any two or more vehicles and we&rsquo;ll align specs and pricing for a clean decision.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {slots.map((_, i) => {
          const car = selected[i];
          if (car) {
            const primary = car.images[0];
            return (
              <div key={car.id} className="relative rounded-2xl border border-line bg-surface p-3">
                <button
                  type="button"
                  onClick={() => removeFromCompare(car.id)}
                  aria-label="Remove from comparison"
                  className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-xs text-white hover:bg-ink"
                >
                  ✕
                </button>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-dim">
                  {primary && <Image src={primary.url} alt={primary.alt} fill unoptimized className="object-cover" />}
                </div>
                <p className="mt-3 text-sm font-medium leading-snug text-ink">
                  {car.year} {car.make} {car.model}
                </p>
                <PriceGate price={car.price} currency={car.currency} compact className="text-xs font-medium text-ink-soft" />
              </div>
            );
          }
          return (
            <div
              key={i}
              className="relative flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line text-ink-soft transition-colors hover:border-purple hover:text-purple"
            >
              <span className="pointer-events-none flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-current text-2xl leading-none">
                +
              </span>
              <span className="pointer-events-none text-sm font-medium">Add Car</span>
              {availableCars.length > 0 && (
                <select
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  value=""
                  onChange={(e) => {
                    if (e.target.value) addToCompare(e.target.value);
                  }}
                  aria-label="Add a car to compare"
                >
                  <option value="" disabled>
                    Select a car…
                  </option>
                  {availableCars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.year} {c.make} {c.model}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>

      {selected.length >= 2 ? (
        <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-paper-dim text-left text-xs uppercase tracking-wide text-ink-soft">
                <th className="px-4 py-3">Spec</th>
                {selected.map((c) => (
                  <th key={c.id} className="px-4 py-3 font-medium text-ink">
                    {c.year} {c.make} {c.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="px-4 py-3 text-ink-soft">Price</td>
                {selected.map((c) => (
                  <td key={c.id} className="px-4 py-3">
                    <PriceGate price={c.price} currency={c.currency} className="font-medium text-ink" />
                  </td>
                ))}
              </tr>
              {specRows.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-ink-soft">{row.label}</td>
                  {selected.map((c) => (
                    <td key={c.id} className="px-4 py-3 text-ink">
                      {row.get(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-ink-soft">Add at least 2 cars to see a side-by-side comparison.</p>
      )}
    </div>
  );
}
