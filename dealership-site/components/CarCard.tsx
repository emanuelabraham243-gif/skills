"use client";

import { ArrowLeftRight, ArrowRight, Compass, Fuel, Gauge, Heart, Settings2, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
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
  mileage: <Gauge className="h-3.5 w-3.5" strokeWidth={2.25} />,
  fuel: <Fuel className="h-3.5 w-3.5" strokeWidth={2.25} />,
  transmission: <Settings2 className="h-3.5 w-3.5" strokeWidth={2.25} />,
  drivetrain: <Compass className="h-3.5 w-3.5" strokeWidth={2.25} />,
  heart: (filled: boolean) => (
    <Heart className="h-4 w-4" strokeWidth={1.8} fill={filled ? "currentColor" : "none"} />
  ),
  share: <Share2 className="h-4 w-4" strokeWidth={1.8} />,
  compare: <ArrowLeftRight className="h-4 w-4" strokeWidth={1.8} />,
};

export default function CarCard({ car }: { car: Car }) {
  const primary = car.images[0];
  const isSold = car.status === "sold";
  const [isRecentArrival] = useState(() => Date.now() - new Date(car.createdAt).getTime() < FOURTEEN_DAYS_MS);
  const [wishlisted, setWishlisted] = useState(() => isWishlisted(car.id));
  const [comparing, setComparing] = useState(() => isComparing(car.id));
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  function handleCardMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }

  const ribbon = car.isFeatured
    ? { label: "Hot Deal!", className: "bg-accent text-white" }
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
    <div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, opacity: 0 }))}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm shadow-ink/5 transition-shadow hover:shadow-lg hover:shadow-ink/10"
    >
      {/* Mouse-tracking spotlight glow — a subtle premium touch adapted from
          React Bits' SpotlightCard, tuned to this site's accent color. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: spotlight.opacity * 0.5,
          background: `radial-gradient(280px circle at ${spotlight.x}px ${spotlight.y}px, var(--accent), transparent 70%)`,
          mixBlendMode: "soft-light",
        }}
      />

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
                wishlisted ? "border-accent bg-accent-soft text-accent" : "border-line text-ink-soft hover:border-accent hover:text-accent"
              }`}
            >
              {icons.heart(wishlisted)}
            </button>
          </div>
        </div>

        <div className="mt-auto pt-2">
          <Link
            href={`/cars/${car.slug}`}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-purple px-4 py-2.5 text-sm font-semibold text-purple-ink transition-colors hover:opacity-90"
          >
            View Details
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </div>
  );
}
