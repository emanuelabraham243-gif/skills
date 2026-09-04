import type { Metadata } from "next";
import CompareGrid from "@/components/CompareGrid";
import { getAllCars } from "@/lib/data";

export const metadata: Metadata = {
  title: "Compare Cars",
  description: "Compare up to four cars side-by-side to help decide which one to buy.",
};

export default async function ComparePage() {
  const cars = await getAllCars();

  return (
    <div className="container-page py-10 sm:py-14">
      <CompareGrid cars={cars} />
    </div>
  );
}
