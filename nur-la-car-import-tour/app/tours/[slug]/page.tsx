import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import SectionHeading from "@/components/SectionHeading";
import TourCard from "@/components/TourCard";
import TourCTA from "@/components/TourCTA";
import { formatDuration, formatPrice, titleCase } from "@/lib/format";
import { getAllTours, getSimilarTours, getTourBySlug } from "@/lib/data";

export async function generateStaticParams() {
  const tours = await getAllTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tours/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return {};
  return {
    title: tour.title,
    description: tour.summary,
  };
}

export default async function TourDetailPage({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const similar = await getSimilarTours(tour);

  return (
    <div className="container-page py-8 sm:py-12">
      <Link href="/tours" className="text-sm text-ink-soft hover:text-accent">
        ← Back to all tours
      </Link>

      <div className="mt-4 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div>
          <Gallery images={tour.images} />

          <div className="mt-10 border-t border-line pt-6">
            <h2 className="font-display text-lg text-ink">Overview</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{tour.summary}</p>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="font-display text-lg text-ink">Day-by-day itinerary</h2>
            <ol className="mt-4 space-y-5">
              {tour.itinerary.map((day) => (
                <li key={day.day} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft/30 text-sm font-medium text-accent">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="font-medium text-ink">{day.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{day.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-lg text-ink">Included</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {tour.inclusions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-lg text-ink">Not included</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {tour.exclusions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-ink-soft">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{tour.title}</h1>
          <p className="mt-1 text-lg text-ink-soft">{tour.destination}</p>

          <p className="mt-5 font-display text-3xl text-ink">
            {formatPrice(tour.price, tour.currency)}
            <span className="ml-1 text-base font-sans font-normal text-ink-soft">/ person</span>
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {formatDuration(tour.durationDays)} · {titleCase(tour.difficulty)} · Up to {tour.groupSizeMax} people
          </p>

          <div className="mt-6">
            <TourCTA tour={tour} />
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <dt className="text-ink-soft">Category</dt>
                <dd className="text-ink">{titleCase(tour.category)}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Difficulty</dt>
                <dd className="text-ink">{titleCase(tour.difficulty)}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Duration</dt>
                <dd className="text-ink">{formatDuration(tour.durationDays)}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Max group size</dt>
                <dd className="text-ink">{tour.groupSizeMax} people</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-20">
          <SectionHeading eyebrow="You might also like" title="Similar tours" />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
