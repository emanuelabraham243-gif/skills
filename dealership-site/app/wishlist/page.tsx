import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import WishlistGrid from "@/components/WishlistGrid";
import { getAllCars } from "@/lib/data";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Cars you've saved for later.",
};

export default async function WishlistPage() {
  const cars = await getAllCars();

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading eyebrow="Saved" title="Your wishlist" description="Cars you've saved for later, kept on this device." />
      <div className="mt-8">
        <WishlistGrid cars={cars} />
      </div>
    </div>
  );
}
