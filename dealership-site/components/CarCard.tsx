import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/lib/types";
import { formatMileage, formatPrice, titleCase } from "@/lib/format";
import StatusBadge from "./StatusBadge";

export default function CarCard({ car }: { car: Car }) {
  const primary = car.images[0];
  const isSold = car.status === "sold";

  return (
    <Link href={`/cars/${car.slug}`} className="group flex flex-col">
      {/* The card is the photo — text lives outside it, not wrapped in a border/box */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-dim shadow-sm shadow-ink/5 transition-transform duration-300 ease-out group-hover:-translate-y-1">
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

        {/* Corner glow, visible only on hover, sweeping gently back and forth */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -right-1/4 -top-1/4 h-2/3 w-2/3 rounded-full bg-[radial-gradient(circle,_var(--accent-soft)_0%,_transparent_70%)] blur-2xl group-hover:animate-[glow-sweep_3s_ease-in-out_infinite]" />
        </div>

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
