import type { Metadata } from "next";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import CoverImage from "@/components/CoverImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { mapsLink, site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "Visit the COLOR Furniture showroom in Addis Ababa — address, opening hours, and everything you need to plan your visit.",
};

const galleryImages = [
  "color-showroom-1",
  "color-showroom-2",
  "color-showroom-3",
  "color-showroom-4",
];

const experienceSteps = [
  {
    n: "01",
    title: "Walk Through Furnished Rooms",
    text: "Our showroom is arranged as full living rooms, bedrooms and dining sets — not aisles — so you can see pieces the way they'll live in your home.",
  },
  {
    n: "02",
    title: "Talk to a Design Consultant",
    text: "Bring photos or measurements of your space. Our consultants will help you choose pieces, materials and layouts that fit.",
  },
  {
    n: "03",
    title: "Order With Confidence",
    text: "Reserve in-stock pieces on the spot, or place an order for made-to-order collections with a clear delivery timeline.",
  },
];

export default function ShowroomPage() {
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    site.address.mapsQuery
  )}&output=embed`;

  return (
    <div>
      <section className="relative flex h-[75vh] min-h-[480px] items-end overflow-hidden bg-charcoal">
        <CoverImage seed="color-showroom-hero" label="COLOR Furniture" eyebrow="Showroom" className="opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/40" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 md:px-10">
          <p className="eyebrow mb-5 text-[11px] font-medium uppercase text-beige">
            Visit COLOR
          </p>
          <h1 className="max-w-2xl font-display text-4xl leading-[1.1] text-ivory md:text-6xl">
            The Showroom
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-3xl text-charcoal">Plan Your Visit</h2>
            <dl className="mt-8 space-y-7 text-[15px] text-charcoal-soft/85">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal-soft/50">
                  Address
                </dt>
                <dd className="mt-2">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal-soft/50">
                  Opening Hours
                </dt>
                <dd className="mt-2 space-y-1">
                  {site.hours.map((h) => (
                    <p key={h.days}>
                      {h.days}: {h.time}
                    </p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal-soft/50">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a href={site.phoneHref} className="link-underline">
                    {site.phone}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                href={whatsappLink(`Hello ${site.name}, I'd like to plan a visit to your showroom.`)}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="!bg-[#25D366] !text-white hover:!bg-[#1ebc59]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Us
              </Button>
              <Button href={mapsLink()} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
                Get Directions
              </Button>
            </div>
          </Reveal>

          <Reveal delay={100} className="aspect-[4/3] w-full overflow-hidden border border-line lg:aspect-auto">
            <iframe
              title="COLOR Furniture showroom location"
              src={mapEmbedSrc}
              className="h-full min-h-[360px] w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {galleryImages.map((seed, i) => (
            <Reveal
              key={seed}
              delay={i * 80}
              className={`relative aspect-[3/4] overflow-hidden ${i === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""}`}
            >
              <CoverImage seed={seed} label="COLOR Furniture" eyebrow="Showroom" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-5 text-[11px] font-medium uppercase text-wood-dark">
              What to Expect
            </p>
            <h2 className="font-display text-3xl text-charcoal md:text-4xl">
              The COLOR Visit Experience
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {experienceSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <span className="font-display text-sm text-wood">{step.n}</span>
                <h3 className="mt-4 font-display text-xl text-charcoal">{step.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-charcoal-soft/75">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
