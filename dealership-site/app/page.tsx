import Image from "next/image";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import SectionHeading from "@/components/SectionHeading";
import Stars from "@/components/Stars";
import PartnerLogo from "@/components/PartnerLogo";
import { getApprovedReviews, getFeaturedCars, getPartners } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const [featured, reviews, partners] = await Promise.all([
    getFeaturedCars(6),
    getApprovedReviews(),
    getPartners(),
  ]);

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  const heroImages = featured.slice(0, 4).map((c) => c.images[0]).filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-10 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Trusted Car Import &amp; Sales — Addis Ababa
            </p>
            <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
              Buy your next car with confidence, before you ever step into the showroom.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
              Every car we import is inspected, photographed in full, and listed with an
              honest condition summary — so what you see is exactly what you get when you
              arrive.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cars"
                className="rounded-full bg-ink px-7 py-3.5 text-center text-sm font-medium text-paper transition-colors hover:bg-accent sm:text-base"
              >
                Browse Available Cars
              </Link>
              <Link
                href="/process"
                className="rounded-full border border-line px-7 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent sm:text-base"
              >
                See How It Works
              </Link>
            </div>

            {reviews.length > 0 && (
              <div className="mt-8 flex items-center gap-3">
                <Stars rating={Math.round(avgRating)} />
                <p className="text-sm text-ink-soft">
                  <span className="font-medium text-ink">{avgRating.toFixed(1)}</span> from{" "}
                  {reviews.length}+ verified buyers
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            {/* Mobile / tablet: one clean hero photo */}
            {heroImages[0] && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:hidden">
                <Image
                  src={heroImages[0].url}
                  alt={heroImages[0].alt}
                  fill
                  unoptimized
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Desktop: scattered photo cluster, angled and overlapping */}
            <div className="relative hidden aspect-square lg:block">
              {heroImages[0] && (
                <div className="absolute left-[2%] top-[10%] z-10 w-[58%] rotate-[-4deg] overflow-hidden rounded-2xl shadow-xl shadow-ink/10">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={heroImages[0].url}
                      alt={heroImages[0].alt}
                      fill
                      unoptimized
                      priority
                      sizes="30vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              {heroImages[1] && (
                <div className="absolute right-0 top-[-2%] z-30 w-[38%] rotate-[8deg] overflow-hidden rounded-2xl shadow-xl shadow-ink/10">
                  <div className="relative aspect-square">
                    <Image src={heroImages[1].url} alt={heroImages[1].alt} fill unoptimized sizes="18vw" className="object-cover" />
                  </div>
                </div>
              )}
              {heroImages[2] && (
                <div className="absolute bottom-[4%] left-[-2%] z-20 w-[40%] rotate-[-9deg] overflow-hidden rounded-2xl shadow-xl shadow-ink/10">
                  <div className="relative aspect-[4/3]">
                    <Image src={heroImages[2].url} alt={heroImages[2].alt} fill unoptimized sizes="20vw" className="object-cover" />
                  </div>
                </div>
              )}
              {heroImages[3] && (
                <div className="absolute bottom-[-4%] right-[-4%] z-40 w-[32%] rotate-[11deg] overflow-hidden rounded-2xl shadow-xl shadow-ink/10">
                  <div className="relative aspect-[3/4]">
                    <Image src={heroImages[3].url} alt={heroImages[3].alt} fill unoptimized sizes="16vw" className="object-cover" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick search */}
      <section className="container-page mt-14 sm:mt-20">
        <form
          action="/cars"
          method="GET"
          className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-white p-4 sm:grid-cols-4 sm:gap-4 sm:p-5"
        >
          <div className="col-span-2 sm:col-span-1">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">
              Body type
            </label>
            <select name="bodyType" className="w-full rounded-lg border border-line px-3 py-2.5 text-sm">
              <option value="">Any</option>
              <option value="suv">SUV</option>
              <option value="sedan">Sedan</option>
              <option value="hatchback">Hatchback</option>
              <option value="pickup">Pickup</option>
              <option value="crossover">Crossover</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">
              Fuel
            </label>
            <select name="fuelType" className="w-full rounded-lg border border-line px-3 py-2.5 text-sm">
              <option value="">Any</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">
              Max budget (ETB)
            </label>
            <input
              name="priceMax"
              type="number"
              placeholder="e.g. 6000000"
              className="w-full rounded-lg border border-line px-3 py-2.5 text-sm"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              Search Cars
            </button>
          </div>
        </form>
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

      {/* Trust signals */}
      <section className="container-page mt-20 sm:mt-28">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Every car inspected", body: "Mechanical and cosmetic inspection before it's ever listed." },
            { title: "Full photo galleries", body: "5+ photos per car, primary angle first — no surprises." },
            { title: "Honest condition notes", body: "Public summaries written in plain language, not sales copy." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-line bg-white p-6">
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
              <div key={review.id} className="rounded-2xl border border-line bg-white p-6">
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
