"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";
import type { Car } from "@/lib/types";
import { formatMileage, titleCase } from "@/lib/format";
import PriceGate from "./PriceGate";
import StatusBadge from "./StatusBadge";
import { addToCompare, isComparing } from "@/lib/compare";
import { isWishlisted, toggleWishlist } from "@/lib/wishlist";

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

function SpecChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper-dim px-2 py-1 text-[0.7rem] text-ink-soft">
      {icon}
      {label}
    </span>
  );
}

const icons = {
  mileage: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M10 2a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8Zm.75 8.31 3.4 2-.75 1.3-3.9-2.3a.9.9 0 0 1-.5-.81V6h1.5v4.31Z" />
    </svg>
  ),
  fuel: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M5 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9.41l1.29 1.3a1 1 0 0 0 1.7-.71V6a2 2 0 0 0-.59-1.41l-1.7-1.7-.71.71 1.5 1.5A1 1 0 0 1 13 6v3l-1-1V3a1 1 0 0 0-1-1H5Zm0 2h5v3H5V4Z" />
    </svg>
  ),
  transmission: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M10 2a1 1 0 0 1 1 1v2.09A6 6 0 0 1 15.91 9H18a1 1 0 1 1 0 2h-2.09A6 6 0 0 1 11 15.91V18a1 1 0 1 1-2 0v-2.09A6 6 0 0 1 4.09 11H2a1 1 0 1 1 0-2h2.09A6 6 0 0 1 9 4.09V2a1 1 0 0 1 1-1Zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  ),
  drivetrain: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M10 1a1 1 0 0 1 1 1v1.09a7.93 7.93 0 0 1 4.13 1.71l.77-.77a1 1 0 1 1 1.41 1.41l-.77.77A7.93 7.93 0 0 1 17.91 9H19a1 1 0 1 1 0 2h-1.09a7.93 7.93 0 0 1-1.71 4.13l.77.77a1 1 0 1 1-1.41 1.41l-.77-.77A7.93 7.93 0 0 1 11 17.91V19a1 1 0 1 1-2 0v-1.09a7.93 7.93 0 0 1-4.13-1.71l-.77.77a1 1 0 0 1-1.41-1.41l.77-.77A7.93 7.93 0 0 1 2.09 11H1a1 1 0 1 1 0-2h1.09a7.93 7.93 0 0 1 1.71-4.13l-.77-.77a1 1 0 0 1 1.41-1.41l.77.77A7.93 7.93 0 0 1 9 2.09V1a1 1 0 0 1 1-1Zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
    </svg>
  ),
  heart: (filled: boolean) => (
    <svg viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.6} className="h-4 w-4">
      <path d="M10 17.35c-.24 0-.47-.08-.65-.24C4.4 12.9 2 10.53 2 7.6 2 5.2 3.9 3.3 6.3 3.3c1.36 0 2.66.64 3.7 1.8a5 5 0 0 1 3.7-1.8c2.4 0 4.3 1.9 4.3 4.3 0 2.93-2.4 5.3-7.35 9.51-.18.16-.41.24-.65.24Z" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M15 3a2.5 2.5 0 1 0-2.45 2.99l-4.4 2.53a2.5 2.5 0 1 0 0 3.05l4.4 2.53A2.5 2.5 0 1 0 13.5 12c0-.24-.04-.47-.1-.69l-4.4-2.53a2.5 2.5 0 0 0 0-1.56l4.4-2.53c.35.19.75.3 1.18.31H15a2.5 2.5 0 0 0 0-5v2Z" />
    </svg>
  ),
  compare: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M6 3a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V6.41L3.71 7.71a1 1 0 1 1-1.42-1.42l3-3A1 1 0 0 1 6 3Zm8 14a1 1 0 0 1-1-1V6a1 1 0 1 1 2 0v7.59l1.29-1.3a1 1 0 1 1 1.42 1.42l-3 3A1 1 0 0 1 14 17Z" />
    </svg>
  ),
};

export default function CarCard({ car }: { car: Car }) {
  const primary = car.images[0];
  const isSold = car.status === "sold";
  const [isRecentArrival] = useState(() => Date.now() - new Date(car.createdAt).getTime() < FOURTEEN_DAYS_MS);
  const [wishlisted, setWishlisted] = useState(() => isWishlisted(car.id));
  const [comparing, setComparing] = useState(() => isComparing(car.id));

  const ribbon = car.isFeatured
    ? { label: "Hot Deal!", className: "bg-car-accent text-white" }
    : isRecentArrival
      ? { label: "Just Arrived!", className: "bg-arrived text-white" }
      : null;

  function handleWishlist(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(car.id);
    setWishlisted((v) => !v);
  }

  function handleShare(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}/cars/${car.slug}` : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: `${car.year} ${car.make} ${car.model}`, url }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  }

  function handleCompare(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (comparing) return;
    const added = addToCompare(car.id);
    if (added) setComparing(true);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm shadow-ink/5 transition-shadow hover:shadow-lg hover:shadow-ink/10">
      <Link href={`/cars/${car.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-paper-dim">
        {primary && (
          <Image
            src={primary.url}
            alt={primary.alt}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] ${isSold ? "grayscale" : ""}`}
          />
        )}

        {ribbon && (
          <div className={`absolute left-0 top-3 rounded-r-md px-3 py-1 text-xs font-semibold ${ribbon.className}`}>
            {ribbon.label}
          </div>
        )}
        <div className="absolute right-3 top-3">
          <StatusBadge status={car.status} className="bg-white/95 shadow-sm" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link href={`/cars/${car.slug}`}>
          <h3 className="font-display text-base font-semibold leading-snug text-ink">
            {car.year} {car.make} {car.model}
          </h3>
          {car.trim && <p className="text-sm text-ink-soft">{car.trim}</p>}
        </Link>

        <div className="flex flex-wrap gap-1.5">
          <SpecChip icon={icons.mileage} label={formatMileage(car.mileageKm)} />
          <SpecChip icon={icons.fuel} label={titleCase(car.fuelType)} />
          <SpecChip icon={icons.transmission} label={titleCase(car.transmission)} />
          {car.drivetrain && <SpecChip icon={icons.drivetrain} label={car.drivetrain} />}
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <PriceGate price={car.price} currency={car.currency} className="font-display text-lg font-semibold text-ink" />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCompare}
              aria-label={comparing ? "Added to compare" : "Add to compare"}
              aria-pressed={comparing}
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                comparing ? "border-purple bg-purple-soft text-purple" : "border-line text-ink-soft hover:border-purple hover:text-purple"
              }`}
            >
              {icons.compare}
            </button>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft hover:border-purple hover:text-purple"
            >
              {icons.share}
            </button>
            <button
              type="button"
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wishlisted}
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                wishlisted ? "border-car-accent bg-car-accent-soft text-car-accent" : "border-line text-ink-soft hover:border-car-accent hover:text-car-accent"
              }`}
            >
              {icons.heart(wishlisted)}
            </button>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-3 pt-2">
          <Link
            href={`/cars/${car.slug}`}
            className="flex-1 rounded-full bg-car-gradient px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            GET IT NOW
          </Link>
          <Link href={`/cars/${car.slug}`} className="text-sm font-medium text-purple hover:underline">
            View Car →
          </Link>
        </div>
      </div>
    </div>
  );
}
