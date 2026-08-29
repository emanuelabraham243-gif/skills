"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { titleCase } from "@/lib/format";
import type { TourCategory, TourDifficulty } from "@/lib/types";

const categories: TourCategory[] = ["historical", "nature", "wildlife", "religious", "adventure", "cultural", "city"];
const difficulties: TourDifficulty[] = ["easy", "moderate", "challenging"];

export default function TourFiltersPanel({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const activeCount = ["category", "difficulty", "durationMax", "priceMax"].filter((key) =>
    searchParams.get(key),
  ).length;

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => {
      router.replace(`/tours?${params.toString()}`, { scroll: false });
    });
  }

  function clearAll() {
    startTransition(() => {
      router.replace("/tours", { scroll: false });
    });
  }

  const selectClass =
    "w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none";
  const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft";

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">
          <span className="font-medium text-ink">{resultCount}</span> tour{resultCount === 1 ? "" : "s"} found
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
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-4">
          <div>
            <label className={labelClass}>Category</label>
            <select
              className={selectClass}
              value={searchParams.get("category") ?? ""}
              onChange={(e) => update("category", e.target.value)}
            >
              <option value="">Any category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{titleCase(c)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Difficulty</label>
            <select
              className={selectClass}
              value={searchParams.get("difficulty") ?? ""}
              onChange={(e) => update("difficulty", e.target.value)}
            >
              <option value="">Any difficulty</option>
              {difficulties.map((d) => (
                <option key={d} value={d}>{titleCase(d)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Max duration (days)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 5"
              className={selectClass}
              defaultValue={searchParams.get("durationMax") ?? ""}
              onBlur={(e) => update("durationMax", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Max price (ETB)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 50000"
              className={selectClass}
              defaultValue={searchParams.get("priceMax") ?? ""}
              onBlur={(e) => update("priceMax", e.target.value)}
            />
          </div>

          <div className="col-span-2 flex items-end sm:col-span-4">
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
