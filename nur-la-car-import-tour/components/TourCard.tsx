import Image from "next/image";
import Link from "next/link";
import type { TourPackage } from "@/lib/types";
import { formatDuration, formatPrice, titleCase } from "@/lib/format";

const difficultyClass: Record<TourPackage["difficulty"], string> = {
  easy: "bg-accent-soft/30 text-accent",
  moderate: "bg-gold-soft text-gold-ink",
  challenging: "bg-amber-bg text-amber-ink",
};

export default function TourCard({ tour }: { tour: TourPackage }) {
  const primary = tour.images[0];

  return (
    <Link href={`/tours/${tour.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-dim ring-1 ring-line transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-ink/10 group-hover:ring-accent/40">
        {primary && (
          <Image
            src={primary.url}
            alt={primary.alt}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        )}

        <div className="absolute left-3 top-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${difficultyClass[tour.difficulty]}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {titleCase(tour.difficulty)}
          </span>
        </div>
        {tour.isFeatured && (
          <div className="absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-medium text-paper">
            Featured
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-4">
        <div>
          <h3 className="font-display text-lg leading-snug text-ink">{tour.title}</h3>
          <p className="text-sm text-ink-soft">{tour.destination}</p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft">
          <span>{formatDuration(tour.durationDays)}</span>
          <span aria-hidden>·</span>
          <span>Up to {tour.groupSizeMax} people</span>
        </div>

        <div className="mt-auto flex items-baseline justify-between pt-1">
          <span className="font-display text-xl text-ink">
            {formatPrice(tour.price, tour.currency)}
            <span className="ml-1 text-xs font-sans font-normal text-ink-soft">/ person</span>
          </span>
          <span className="text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
            View itinerary →
          </span>
        </div>
      </div>
    </Link>
  );
}
