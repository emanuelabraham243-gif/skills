import Image from "next/image";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import TourCard from "@/components/TourCard";
import SectionHeading from "@/components/SectionHeading";
import Stars from "@/components/Stars";
import { getApprovedReviews, getFeaturedCars, getFeaturedTours } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const [cars, tours, reviews] = await Promise.all([
    getFeaturedCars(6),
    getFeaturedTours(6),
    getApprovedReviews(),
  ]);

  const heroCar = cars[0]?.images[0];
  const heroTour = tours[0]?.images[0];

  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-10 sm:pt-16">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Addis Ababa — Car Import &amp; Tour Operation
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
            One trusted team for your next car — and your next journey across Ethiopia.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            We import and inspect vehicles for buyers in Addis Ababa, and design guided tours
            to Ethiopia&rsquo;s historic and natural landmarks — Simien, Lalibela, Danakil and beyond.
          </p>

          <div className="mt-8 flex items-center gap-4 text-sm text-ink-soft">
            <div className="flex items-center gap-2">
              <Stars rating={5} />
              <span className="font-medium text-ink">5.0</span>
            </div>
            <span aria-hidden>·</span>
            <span>{siteConfig.address.split(",")[1]?.trim() ?? "Addis Ababa"}</span>
            <span aria-hidden>·</span>
            <span>{siteConfig.hours}</span>
          </div>
        </div>

        {/* Two-panel service split — cars and tours as equal pillars */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            href="/cars"
            className="group relative aspect-[16/11] overflow-hidden rounded-2xl bg-paper-dim ring-1 ring-line transition-shadow hover:shadow-lg hover:shadow-ink/10"
          >
            {heroCar && (
              <Image
                src={heroCar.url}
                alt={heroCar.alt}
                fill
                unoptimized
                priority
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h2 className="font-display text-2xl text-paper">Imported Cars</h2>
              <p className="mt-1 text-sm text-paper/80">Inspected vehicles, honest condition reports.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-paper">
                Browse inventory →
              </span>
            </div>
          </Link>

          <Link
            href="/tours"
            className="group relative aspect-[16/11] overflow-hidden rounded-2xl bg-paper-dim ring-1 ring-line transition-shadow hover:shadow-lg hover:shadow-ink/10"
          >
            {heroTour && (
              <Image
                src={heroTour.url}
                alt={heroTour.alt}
                fill
                unoptimized
                priority
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h2 className="font-display text-2xl text-paper">Guided Tours</h2>
              <p className="mt-1 text-sm text-paper/80">Historic, cultural and wildlife routes across Ethiopia.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-paper">
                Explore tours →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured cars */}
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
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Featured tours */}
      <section className="container-page mt-20 sm:mt-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Tours"
            title="Popular tour packages"
            description="Small-group departures led by licensed, English-speaking guides."
          />
          <Link href="/tours" className="shrink-0 text-sm font-medium text-accent hover:underline">
            View all tours →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <section className="container-page mt-20 sm:mt-28">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Every car inspected", body: "Mechanical and cosmetic inspection before it's ever listed." },
            { title: "Licensed tour guides", body: "Small groups led by experienced, English-speaking local guides." },
            { title: "One point of contact", body: "The same team handles your vehicle purchase and your trip planning." },
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
          <SectionHeading eyebrow="Reviews" title="What our customers are saying" align="center" />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="rounded-2xl border border-line bg-surface p-6">
                <Stars rating={review.rating} />
                <p className="mt-3 text-sm leading-relaxed text-ink">&ldquo;{review.body}&rdquo;</p>
                <p className="mt-4 text-sm font-medium text-ink-soft">
                  {review.customerName}
                  {review.itemLabel && <span className="font-normal"> · {review.itemLabel}</span>}
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

      <section className="container-page mt-20 mb-24 sm:mt-28">
        <div className="rounded-3xl bg-ink px-6 py-14 text-center sm:px-12 sm:py-20">
          <h2 className="font-display text-2xl text-paper sm:text-3xl">
            Don&rsquo;t see the right car — or the right trip?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-paper/70 sm:text-base">
            Tell us what you&rsquo;re looking for and we&rsquo;ll source the vehicle or build the
            itinerary for you.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/custom-request"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-ink hover:bg-accent-soft"
            >
              Request a Vehicle
            </Link>
            <Link
              href="/plan-a-tour"
              className="rounded-full border border-paper/30 px-7 py-3.5 text-sm font-medium text-paper hover:border-paper"
            >
              Plan a Tour
            </Link>
          </div>
        </div>
      </section>

      <p className="sr-only">{siteConfig.name}</p>
    </div>
  );
}
