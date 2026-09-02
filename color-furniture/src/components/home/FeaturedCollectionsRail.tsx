import Link from "next/link";
import { collections } from "@/data/collections";
import CollectionCard from "@/components/CollectionCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function FeaturedCollectionsRail() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-28 md:px-10 md:pt-36">
      <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Featured Collections"
          title="Nine Collections. One Sensibility."
          description="Each collection is designed as a complete language of material, proportion and finish — mix them freely, or furnish a room from a single line."
        />
        <Link
          href="/collections"
          className="link-underline whitespace-nowrap text-[13px] uppercase tracking-[0.12em] text-wood-dark"
        >
          View All Collections →
        </Link>
      </Reveal>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
        {collections.map((c, i) => (
          <Reveal
            key={c.slug}
            delay={i * 60}
            className="w-[70vw] flex-none snap-start sm:w-[42vw] lg:w-[26vw]"
          >
            <CollectionCard collection={c} size="sm" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
