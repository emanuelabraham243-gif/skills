import type { Metadata } from "next";
import { collections } from "@/data/collections";
import CollectionCard from "@/components/CollectionCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore COLOR Furniture's collections — Living Room, Sofas, Bedroom, Dining, Office, Tables, Chairs, Storage and Accessories.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-32 md:px-10 md:pt-40">
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-5 text-[11px] font-medium uppercase text-wood-dark">
          Explore
        </p>
        <h1 className="font-display text-4xl text-charcoal md:text-5xl">
          Nine Collections
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed text-charcoal-soft/75">
          Each collection is its own complete language of material, proportion
          and finish. Furnish a single room, or build a home around one
          consistent point of view.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={i * 60}>
            <CollectionCard collection={c} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
