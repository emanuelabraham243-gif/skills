import { Suspense } from "react";
import type { Metadata } from "next";
import CatalogClient from "@/components/catalog/CatalogClient";
import { products } from "@/data/products";
import { collections } from "@/data/collections";

export const metadata: Metadata = {
  title: "Shop All Furniture",
  description:
    "Browse the full COLOR Furniture collection — sofas, dining, bedroom, office and more, curated and imported for modern Ethiopian homes.",
};

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogClient products={products} collections={collections} />
    </Suspense>
  );
}
