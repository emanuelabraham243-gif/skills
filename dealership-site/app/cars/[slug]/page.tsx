import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CarCard from "@/components/CarCard";
import CarCTA from "@/components/CarCTA";
import Gallery from "@/components/Gallery";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { formatMileage, formatPrice, titleCase } from "@/lib/format";
import { getAllCars, getCarBySlug, getSimilarCars } from "@/lib/data";

export async function generateStaticParams() {
  const cars = await getAllCars();
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cars/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return {};
  return {
    title: `${car.year} ${car.make} ${car.model}`,
    description: car.conditionSummary,
  };
}

export default async function CarDetailPage({ params }: PageProps<"/cars/[slug]">) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) notFound();

  const similar = await getSimilarCars(car);

  const specs: [string, string | undefined][] = [
    ["Make", car.make],
    ["Model", car.model],
    ["Trim", car.trim],
    ["Year", String(car.year)],
    ["Body type", titleCase(car.bodyType)],
    ["Mileage", formatMileage(car.mileageKm)],
    ["Fuel type", titleCase(car.fuelType)],
    ["Transmission", titleCase(car.transmission)],
    ["Drivetrain", car.drivetrain],
    ["Engine", car.engine],
    ["Exterior color", car.exteriorColor],
    ["Interior color", car.interiorColor],
    ["Seats", car.seats ? String(car.seats) : undefined],
    ["Doors", car.doors ? String(car.doors) : undefined],
  ];

  return (
    <div className="container-page py-8 sm:py-12">
      <Link href="/cars" className="text-sm text-ink-soft hover:text-accent">
        ← Back to all cars
      </Link>

      <div className="mt-4 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div>
          <Gallery images={car.images} />
        </div>

        <div>
          <StatusBadge status={car.status} />
          <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {car.year} {car.make} {car.model}
          </h1>
          {car.trim && <p className="mt-1 text-lg text-ink-soft">{car.trim}</p>}

          <p className="mt-5 font-display text-3xl text-ink">{formatPrice(car.price, car.currency)}</p>
          <p className="mt-1 text-sm text-ink-soft">{formatMileage(car.mileageKm)} · {titleCase(car.transmission)} · {titleCase(car.fuelType)}</p>

          <div className="mt-6">
            <CarCTA car={car} />
          </div>

          {car.specSheetUrl && (
            <a
              href={car.specSheetUrl}
              download
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-accent"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M10 12.5a.75.75 0 0 0 .53-.22l3.5-3.5a.75.75 0 1 0-1.06-1.06L10.75 9.94V3a.75.75 0 0 0-1.5 0v6.94L7.03 7.72a.75.75 0 0 0-1.06 1.06l3.5 3.5c.14.14.33.22.53.22Z" />
                <path d="M4.5 13.25a.75.75 0 0 0-1.5 0v2.5A2.25 2.25 0 0 0 5.25 18h9.5A2.25 2.25 0 0 0 17 15.75v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .414-.336.75-.75.75h-9.5a.75.75 0 0 1-.75-.75v-2.5Z" />
              </svg>
              Download spec sheet (PDF)
            </a>
          )}

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="font-display text-lg text-ink">Condition summary</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{car.conditionSummary}</p>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="font-display text-lg text-ink">Specifications</h2>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {specs
                .filter(([, value]) => Boolean(value))
                .map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-ink-soft">{label}</dt>
                    <dd className="text-ink">{value}</dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-20">
          <SectionHeading eyebrow="You might also like" title="Similar cars" />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
