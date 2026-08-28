"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { titleCase } from "@/lib/format";
import type { BodyType, FuelType, Transmission } from "@/lib/types";

const bodyTypes: BodyType[] = ["sedan", "suv", "hatchback", "pickup", "van", "coupe", "crossover"];
const fuelTypes: FuelType[] = ["petrol", "diesel", "hybrid", "electric"];
const transmissions: Transmission[] = ["automatic", "manual"];

export default function CarFiltersPanel({
  makes,
  resultCount,
}: {
  makes: string[];
  resultCount: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const activeCount = ["make", "yearMin", "yearMax", "priceMin", "priceMax", "mileageMax", "fuelType", "transmission", "bodyType"].filter(
    (key) => searchParams.get(key),
  ).length;

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => {
      router.replace(`/cars?${params.toString()}`, { scroll: false });
    });
  }

  function clearAll() {
    startTransition(() => {
      router.replace("/cars", { scroll: false });
    });
  }

  const selectClass =
    "w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none";
  const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft";

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">
          <span className="font-medium text-ink">{resultCount}</span> car{resultCount === 1 ? "" : "s"} found
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink"
        >
          Filters {activeCount > 0 && <span className="rounded-full bg-accent px-1.5 py-0.5 text-xs text-accent-ink">{activeCount}</span>}
        </button>
      </div>

      {open && (
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-3 lg:grid-cols-4">
          <div>
            <label className={labelClass}>Make</label>
            <select
              className={selectClass}
              value={searchParams.get("make") ?? ""}
              onChange={(e) => update("make", e.target.value)}
            >
              <option value="">Any make</option>
              {makes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Body type</label>
            <select
              className={selectClass}
              value={searchParams.get("bodyType") ?? ""}
              onChange={(e) => update("bodyType", e.target.value)}
            >
              <option value="">Any body type</option>
              {bodyTypes.map((b) => (
                <option key={b} value={b}>{titleCase(b)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Fuel type</label>
            <select
              className={selectClass}
              value={searchParams.get("fuelType") ?? ""}
              onChange={(e) => update("fuelType", e.target.value)}
            >
              <option value="">Any fuel type</option>
              {fuelTypes.map((f) => (
                <option key={f} value={f}>{titleCase(f)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Transmission</label>
            <select
              className={selectClass}
              value={searchParams.get("transmission") ?? ""}
              onChange={(e) => update("transmission", e.target.value)}
            >
              <option value="">Any transmission</option>
              {transmissions.map((t) => (
                <option key={t} value={t}>{titleCase(t)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Year (min)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 2018"
              className={selectClass}
              defaultValue={searchParams.get("yearMin") ?? ""}
              onBlur={(e) => update("yearMin", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Year (max)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 2024"
              className={selectClass}
              defaultValue={searchParams.get("yearMax") ?? ""}
              onBlur={(e) => update("yearMax", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Price min (ETB)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 2000000"
              className={selectClass}
              defaultValue={searchParams.get("priceMin") ?? ""}
              onBlur={(e) => update("priceMin", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Price max (ETB)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 8000000"
              className={selectClass}
              defaultValue={searchParams.get("priceMax") ?? ""}
              onBlur={(e) => update("priceMax", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Max mileage (km)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 50000"
              className={selectClass}
              defaultValue={searchParams.get("mileageMax") ?? ""}
              onBlur={(e) => update("mileageMax", e.target.value)}
            />
          </div>

          <div className="col-span-2 flex items-end sm:col-span-3 lg:col-span-4">
            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-medium text-accent hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
