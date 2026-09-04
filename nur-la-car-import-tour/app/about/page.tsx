import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — our team, and how we combine vehicle imports with guided tours across Ethiopia.`,
};

const values = [
  {
    title: "Transparency first",
    body: "Honest condition summaries and full photo galleries for every car — the same information we'd want if we were buying.",
  },
  {
    title: "Locally licensed guides",
    body: "Every tour is led by an experienced, English-speaking guide who knows the route, the history, and the communities along it.",
  },
  {
    title: "One team, two services",
    body: "The same people who source and inspect your vehicle can also plan your next trip — one point of contact either way.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="About us"
            title={`Why we started ${siteConfig.name}`}
          />
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            <p>
              {siteConfig.name} began as an import business for buyers in Addis Ababa who wanted
              a straightforward way to buy a vehicle without relying on word of mouth and grainy
              phone photos. Every car we bring in is inspected, prepared, and listed with an
              honest, plain-language write-up.
            </p>
            <p>
              Over time, customers who trusted us with a car purchase started asking us to help
              plan trips around the country — so we built out a tour operation alongside it,
              covering Ethiopia&rsquo;s major historic, cultural and natural landmarks with
              licensed local guides.
            </p>
            <p>
              We&rsquo;re a small, Addis Ababa-based team that handles both sides of the business
              directly — no middlemen, one point of contact from your first message through to
              handover or homecoming.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/cars/toyota-land-cruiser-prado-2020/0.svg"
            alt="Our vehicle lot"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-20 grid gap-4 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-display text-lg text-ink">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 rounded-2xl border border-line bg-paper-dim p-6 text-sm text-ink-soft sm:p-8">
        <p>
          <strong className="font-medium text-ink">Visit us:</strong> {siteConfig.address} ·{" "}
          {siteConfig.hours}
        </p>
      </div>
    </div>
  );
}
