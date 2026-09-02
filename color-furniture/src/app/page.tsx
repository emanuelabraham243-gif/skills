import Link from "next/link";
import Hero from "@/components/home/Hero";
import FeaturedCollectionsRail from "@/components/home/FeaturedCollectionsRail";
import CategoryGrid from "@/components/home/CategoryGrid";
import WhyColor from "@/components/home/WhyColor";
import ShowroomTeaser from "@/components/home/ShowroomTeaser";
import InstagramGallery from "@/components/home/InstagramGallery";
import FinalCta from "@/components/FinalCta";
import ProductRail from "@/components/ProductRail";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { products } from "@/data/products";

export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <>
      <Hero />

      <FeaturedCollectionsRail />

      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Just Landed"
            title="New Arrivals"
            description="The latest pieces to arrive at our Addis Ababa showroom, fresh off the container."
          />
          <Link
            href="/catalog?sort=newest"
            className="link-underline whitespace-nowrap text-[13px] uppercase tracking-[0.12em] text-wood-dark"
          >
            Shop New Arrivals →
          </Link>
        </Reveal>
        <div className="mt-12">
          <ProductRail products={newArrivals} />
        </div>
      </section>

      <section className="border-y border-line bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Customer Favorites"
              title="Best Sellers"
              description="The pieces our clients return to us for, again and again."
            />
            <Link
              href="/catalog?sort=featured"
              className="link-underline whitespace-nowrap text-[13px] uppercase tracking-[0.12em] text-wood-dark"
            >
              Shop Best Sellers →
            </Link>
          </Reveal>
          <div className="mt-12">
            <ProductRail products={bestSellers} />
          </div>
        </div>
      </section>

      <CategoryGrid />

      <WhyColor />

      <ShowroomTeaser />

      <InstagramGallery />

      <FinalCta
        eyebrow="Ready When You Are"
        title="Let's Furnish Something Beautiful."
        description="Browse the full collection online, or come see it in person at our Addis Ababa showroom — our team is ready to help you plan the room."
        imageSeed="color-final-cta"
      />
    </>
  );
}
