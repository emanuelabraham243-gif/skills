import { Search } from "lucide-react";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import SectionHeading from "@/components/SectionHeading";
import Stars from "@/components/Stars";
import PartnerLogo from "@/components/PartnerLogo";
import BodyTypeCarousel from "@/components/BodyTypeCarousel";
import BrandCarousel from "@/components/BrandCarousel";
import HeroSlideshow from "@/components/HeroSlideshow";
import TrustStats from "@/components/TrustStats";
import { getAllCars, getApprovedReviews, getFeaturedCars, getMakes, getPartners } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const [featured, allCars, reviews, partners] = await Promise.all([
    getFeaturedCars(6),
    getAllCars(),
    getApprovedReviews(),
    getPartners(),
  ]);

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  const heroImages = featured.slice(0, 4).map((c) => c.images[0]).filter(Boolean);
  const makes = getMakes(allCars);

  return (
    <div>
      {/* Hero — full-bleed auto-rotating photo slideshow with text overlaid.
          Height comes from the content (text + search bar) rather than a
          fixed vh, so the photo always extends exactly behind both with no
          leftover blank gap. */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <HeroSlideshow images={heroImages} />

        <div className="container-page relative z-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Trusted Car Import &amp; Sales — Addis Ababa
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
            Connecting you with the right car every time.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Every car we import is inspected, photographed in full, and listed with an honest
            condition summary — so what you see is exactly what you get when you arrive.
          </p>

          {reviews.length > 0 && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <Stars rating={Math.round(avgRating)} />
              <p className="text-sm text-white/80">
                <span className="font-medium text-white">{avgRating.toFixed(1)}</span> from{" "}
                {reviews.length}+ verified buyers
              </p>
            </div>
          )}
        </div>

        <div className="container-page relative z-10 mt-8 sm:mt-10">
          <form
            action="/cars"
            method="GET"
            className="rounded-2xl border border-line bg-surface p-3 shadow-xl shadow-ink/30 sm:p-4"
          >
          <div className="flex items-center gap-2 rounded-xl border border-line px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-ink-soft" strokeWidth={2} />
            <input
              name="q"
              placeholder="Search brand, model, keywords…"
              className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/60"
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-purple sm:grid-cols-3 lg:grid-cols-6">
            <label className="flex flex-col justify-center px-4 py-2.5">
              <span className="text-[0.65rem] font-medium uppercase tracking-wide text-purple-ink/60">Make</span>
              <select name="make" className="mt-0.5 bg-transparent text-sm text-purple-ink outline-none [color-scheme:dark]">
                <option value="" className="text-ink">Any make</option>
                {makes.map((m) => (
                  <option key={m} value={m} className="text-ink">{m}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col justify-center border-t border-purple-ink/10 px-4 py-2.5 sm:border-t-0 sm:border-l">
              <span className="text-[0.65rem] font-medium uppercase tracking-wide text-purple-ink/60">Body type</span>
              <select name="bodyType" className="mt-0.5 bg-transparent text-sm text-purple-ink outline-none [color-scheme:dark]">
                <option value="" className="text-ink">Any body type</option>
                <option value="suv" className="text-ink">SUV</option>
                <option value="sedan" className="text-ink">Sedan</option>
                <option value="hatchback" className="text-ink">Hatchback</option>
                <option value="pickup" className="text-ink">Pickup</option>
                <option value="crossover" className="text-ink">Crossover</option>
              </select>
            </label>

            <label className="flex flex-col justify-center border-t border-purple-ink/10 px-4 py-2.5 sm:border-t-0 sm:border-l">
              <span className="text-[0.65rem] font-medium uppercase tracking-wide text-purple-ink/60">Fuel</span>
              <select name="fuelType" className="mt-0.5 bg-transparent text-sm text-purple-ink outline-none [color-scheme:dark]">
                <option value="" className="text-ink">Any fuel</option>
                <option value="petrol" className="text-ink">Petrol</option>
                <option value="diesel" className="text-ink">Diesel</option>
                <option value="hybrid" className="text-ink">Hybrid</option>
                <option value="electric" className="text-ink">Electric</option>
              </select>
            </label>

            <label className="flex flex-col justify-center border-t border-purple-ink/10 px-4 py-2.5 sm:border-t sm:border-l lg:border-t-0">
              <span className="text-[0.65rem] font-medium uppercase tracking-wide text-purple-ink/60">Year (min)</span>
              <input
                name="yearMin"
                type="number"
                inputMode="numeric"
                placeholder="e.g. 2018"
                className="mt-0.5 bg-transparent text-sm text-purple-ink outline-none placeholder:text-purple-ink/40"
              />
            </label>

            <label className="flex flex-col justify-center border-t border-purple-ink/10 px-4 py-2.5 sm:border-l lg:border-t-0">
              <span className="text-[0.65rem] font-medium uppercase tracking-wide text-purple-ink/60">Max budget (ETB)</span>
              <input
                name="priceMax"
                type="number"
                inputMode="numeric"
                placeholder="e.g. 6000000"
                className="mt-0.5 bg-transparent text-sm text-purple-ink outline-none placeholder:text-purple-ink/40"
              />
            </label>

            <div className="flex items-center justify-center border-t border-purple-ink/10 p-2 sm:col-span-3 sm:border-t sm:border-l lg:col-span-1 lg:border-t-0">
              <button
                type="submit"
                className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:opacity-90"
              >
                Find Your Car
              </button>
            </div>
          </div>
          </form>
        </div>
      </section>

      <TrustStats />

      {/* Search by body type */}
      <section className="container-page mt-16 sm:mt-24">
        <SectionHeading
          eyebrow="Browse"
          title="Search by Body Type"
          description="Find the car that fits your lifestyle and personality."
        />
        <div className="mt-8">
          <BodyTypeCarousel />
        </div>
      </section>

      {/* Featured / new arrivals */}
      <section className="container-page mt-20 sm:mt-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Inventory"
            title="Featured & new arrivals"
            description="A rotating selection of our most recent, most-viewed, and best-value imports."
          />
          <Link href="/cars" className="shrink-0 text-sm font-medium text-accent hover:underline">
            View all cars →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="container-page mt-20 sm:mt-28">
        <SectionHeading
          eyebrow="Makes"
          title="Discover Top Car Brands"
          description="Explore the most trusted and popular car brands in our inventory."
        />
        <div className="mt-8">
          <BrandCarousel makes={makes} />
        </div>
      </section>

      {/* Trust signals */}
      <section className="container-page mt-20 sm:mt-28">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Every car inspected", body: "Mechanical and cosmetic inspection before it's ever listed." },
            { title: "Full photo galleries", body: "5+ photos per car, primary angle first — no surprises." },
            { title: "Honest condition notes", body: "Public summaries written in plain language, not sales copy." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews snippet */}
      {reviews.length > 0 && (
        <section className="container-page mt-20 sm:mt-28">
          <SectionHeading eyebrow="Reviews" title="What buyers are saying" align="center" />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="rounded-2xl border border-line bg-surface p-6">
                <Stars rating={review.rating} />
                <p className="mt-3 text-sm leading-relaxed text-ink">&ldquo;{review.body}&rdquo;</p>
                <p className="mt-4 text-sm font-medium text-ink-soft">
                  {review.customerName}
                  {review.carLabel && <span className="font-normal"> · {review.carLabel}</span>}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/reviews" className="text-sm font-medium text-accent hover:underline">
              Read all reviews →
            </Link>
          </div>
        </section>
      )}

      {/* Partners */}
      {partners.length > 0 && (
        <section className="container-page mt-20 sm:mt-28">
          <SectionHeading eyebrow="Partners" title="Financing, insurance and shipping we trust" align="center" />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {partners.slice(0, 8).map((partner) => (
              <PartnerLogo key={partner.id} partner={partner} />
            ))}
          </div>
        </section>
      )}

      <section className="container-page mt-20 mb-24 sm:mt-28">
        <div className="rounded-3xl bg-ink px-6 py-14 text-center sm:px-12 sm:py-20">
          <h2 className="font-display text-2xl text-paper sm:text-3xl">
            Don&rsquo;t see the right car in stock?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-paper/70 sm:text-base">
            Tell us exactly what you&rsquo;re looking for and we&rsquo;ll source it for you through
            our import network.
          </p>
          <Link
            href="/custom-request"
            className="mt-7 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-ink hover:bg-accent-soft"
          >
            Request a Vehicle
          </Link>
        </div>
      </section>

      <p className="sr-only">{siteConfig.name}</p>
    </div>
  );
}
