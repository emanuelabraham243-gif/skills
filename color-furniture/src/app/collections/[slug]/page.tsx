import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections, getCollection } from "@/data/collections";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FinalCta from "@/components/FinalCta";
import CoverImage from "@/components/CoverImage";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const collectionProducts = products.filter((p) => p.category === collection.slug);
  const otherCollections = collections.filter((c) => c.slug !== collection.slug).slice(0, 3);

  return (
    <div>
      <section className="relative flex h-[70vh] min-h-[440px] items-end overflow-hidden bg-charcoal">
        <CoverImage
          seed={collection.heroImage}
          label={collection.name}
          eyebrow="Collection"
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/40" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-5 flex gap-2 text-[12px] uppercase tracking-[0.08em] text-ivory/60">
            <Link href="/collections" className="hover:text-ivory">Collections</Link>
            <span>/</span>
            <span className="text-ivory">{collection.name}</span>
          </nav>
          <h1 className="font-display text-4xl text-ivory md:text-6xl">{collection.name}</h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ivory/75">
            {collection.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xl italic leading-relaxed text-charcoal-soft/80 md:text-2xl">
            “{collection.editorial}”
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-28 md:px-10">
        <div className="mb-10 flex items-center justify-between border-b border-line pb-6">
          <h2 className="font-display text-2xl text-charcoal">
            {collectionProducts.length} {collectionProducts.length === 1 ? "Piece" : "Pieces"}
          </h2>
          <Link
            href={`/catalog?category=${collection.slug}`}
            className="link-underline text-[13px] uppercase tracking-[0.12em] text-wood-dark"
          >
            Filter &amp; Sort →
          </Link>
        </div>

        {collectionProducts.length === 0 ? (
          <p className="py-16 text-center text-[15px] text-charcoal-soft/70">
            New pieces for this collection are arriving soon. In the meantime,
            explore the full catalog or ask us on WhatsApp.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-line bg-cream py-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <h2 className="font-display text-2xl text-charcoal">Explore More Collections</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {otherCollections.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-charcoal"
              >
                <CoverImage
                  seed={c.heroImage}
                  label={c.name}
                  eyebrow="Collection"
                  className="opacity-85 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25" />
                <span className="absolute inset-x-0 bottom-0 p-5 font-display text-lg text-ivory">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title={`Bring ${collection.shortName} Home`}
        description="Visit our Addis Ababa showroom to see this collection in person, or order directly on WhatsApp."
        imageSeed={collection.heroImage}
      />
    </div>
  );
}
