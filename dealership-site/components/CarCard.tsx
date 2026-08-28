"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Car } from "@/lib/types";
import { formatMileage, formatPrice, titleCase } from "@/lib/format";
import StatusBadge from "./StatusBadge";

const MAX_TILT_DEG = 10;

// Shapes the response so it's almost flat near the card's center and ramps
// up toward the edges/corners, rather than a flat linear response.
function shapeOffset(normalized: number) {
  return Math.sign(normalized) * Math.pow(Math.abs(normalized), 1.6);
}

export default function CarCard({ car }: { car: Car }) {
  const primary = car.images[0];
  const isSold = car.status === "sold";
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  // Cached once per hover session — the card itself is transformed while
  // hovering, so re-measuring getBoundingClientRect() on every move would
  // read a distorted (rotated/scaled) box and the tracking would drift.
  const rectRef = useRef<DOMRect | null>(null);

  function handleMouseEnter() {
    if (cardRef.current) rectRef.current = cardRef.current.getBoundingClientRect();
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = rectRef.current ?? card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const nx = shapeOffset((px - 0.5) * 2);
      const ny = shapeOffset((py - 0.5) * 2);
      const rotateY = nx * MAX_TILT_DEG;
      const rotateX = -ny * MAX_TILT_DEG;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
      card.style.setProperty("--glow-x", `${px * 100}%`);
      card.style.setProperty("--glow-y", `${py * 100}%`);
      card.style.setProperty("--glow-opacity", "1");
    });
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    rectRef.current = null;
    if (!card) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
    card.style.setProperty("--glow-opacity", "0");
  }

  return (
    <Link href={`/cars/${car.slug}`} className="group flex flex-col">
      {/* The card is the photo — text lives outside it, not wrapped in a border/box */}
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-dim shadow-sm shadow-ink/5 transition-transform duration-300 ease-out will-change-transform"
      >
        {primary && (
          <Image
            src={primary.url}
            alt={primary.alt}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover ${isSold ? "grayscale" : ""}`}
          />
        )}

        {/* Glow that tracks the cursor, synced with the tilt via the same handler */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: "var(--glow-opacity, 0)",
            background:
              "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), var(--accent-soft) 0%, transparent 55%)",
          }}
        />

        <div className="absolute left-3 top-3">
          <StatusBadge status={car.status} className="bg-white/95 shadow-sm" />
        </div>
        {car.isFeatured && (
          <div className="absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-medium text-paper">
            Featured
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-4">
        <div>
          <h3 className="font-display text-lg leading-snug text-ink">
            {car.year} {car.make} {car.model}
          </h3>
          {car.trim && <p className="text-sm text-ink-soft">{car.trim}</p>}
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft">
          <span>{formatMileage(car.mileageKm)}</span>
          <span aria-hidden>·</span>
          <span>{titleCase(car.transmission)}</span>
          <span aria-hidden>·</span>
          <span>{titleCase(car.fuelType)}</span>
        </div>

        <div className="mt-auto flex items-baseline justify-between pt-1">
          <span className="font-display text-xl text-ink">{formatPrice(car.price, car.currency)}</span>
          <span className="text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
