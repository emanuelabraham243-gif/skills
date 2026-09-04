"use client";

import Link from "next/link";
import CarCard from "./CarCard";
import { useWishlist } from "@/lib/wishlist";
import type { Car } from "@/lib/types";

export default function WishlistGrid({ cars }: { cars: Car[] }) {
  const wishlistIds = useWishlist();
  const saved = cars.filter((c) => wishlistIds.includes(c.id));

  if (saved.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-10 text-center">
        <p className="text-ink">No saved cars yet.</p>
        <p className="mt-2 text-sm text-ink-soft">
          Tap the heart icon on any car to save it here for later —{" "}
          <Link href="/cars" className="text-accent hover:underline">
            browse our inventory
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {saved.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
