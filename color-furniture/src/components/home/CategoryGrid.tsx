import { collections } from "@/data/collections";
import CollectionCard from "@/components/CollectionCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const featuredSlugs = ["living-room", "sofas", "bedroom", "dining", "office"];

export default function CategoryGrid() {
  const items = featuredSlugs
    .map((slug) => collections.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <SectionHeading
          eyebrow="Shop by Room"
          title="Every Room, Considered"
          description="From the living room to the home office, each collection is designed to work together — or stand entirely on its own."
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-6 md:grid-rows-2 md:gap-5">
        {items[0] && (
          <Reveal className="col-span-2 md:col-span-4 md:row-span-2">
            <CollectionCard collection={items[0]!} size="lg" />
          </Reveal>
        )}
        {items.slice(1, 3).map((c, i) => (
          <Reveal key={c!.slug} delay={i * 100} className="col-span-1 md:col-span-2">
            <CollectionCard collection={c!} size="sm" />
          </Reveal>
        ))}
        {items.slice(3, 5).map((c, i) => (
          <Reveal key={c!.slug} delay={i * 100} className="col-span-1 md:col-span-3">
            <CollectionCard collection={c!} size="sm" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
