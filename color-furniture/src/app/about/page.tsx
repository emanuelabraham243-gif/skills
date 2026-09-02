import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FinalCta from "@/components/FinalCta";
import CoverImage from "@/components/CoverImage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of COLOR Furniture — craftsmanship, imported quality, and considered design for modern Ethiopian homes.",
};

const stats = [
  { value: "10+", label: "Years in Addis Ababa" },
  { value: "1,200+", label: "Homes Furnished" },
  { value: "9", label: "Curated Collections" },
  { value: "600m²", label: "Showroom Floor" },
];

const pillars = [
  {
    title: "Sourced, Not Copied",
    text: "Every collection is imported directly from manufacturers we've vetted in person — Italy, Turkey, China and beyond. We do not sell reproductions.",
    seed: "color-about-sourcing",
  },
  {
    title: "Built to Last Generations",
    text: "We choose kiln-dried hardwood frames, full-grain leathers and natural fibers — materials that are meant to be lived on, not replaced in three years.",
    seed: "color-about-craft",
  },
  {
    title: "Designed for Ethiopian Homes",
    text: "Our buying team considers Addis Ababa's light, climate and room proportions when selecting every piece — furniture that belongs here, not just anywhere.",
    seed: "color-about-design",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex h-[75vh] min-h-[480px] items-end overflow-hidden bg-charcoal">
        <CoverImage seed="color-about-hero" label="COLOR Furniture" eyebrow="Our Story" className="opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/40" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 md:px-10">
          <p className="eyebrow mb-5 text-[11px] font-medium uppercase text-beige">Our Story</p>
          <h1 className="max-w-2xl font-display text-4xl leading-[1.1] text-ivory md:text-6xl">
            Furnishing Addis Ababa with Intention
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <p className="font-display text-2xl leading-relaxed text-charcoal text-balance md:text-3xl">
            COLOR was founded on a simple belief: that Ethiopian homes deserve
            furniture with the same quality, craftsmanship and design integrity
            found anywhere in the world.
          </p>
          <p className="mt-8 text-[15px] leading-relaxed text-charcoal-soft/75">
            What began as a single showroom on Bole Road has grown into
            Addis Ababa&rsquo;s home for curated, imported furniture — but our
            approach hasn&rsquo;t changed. We travel to meet our manufacturers, we
            test every material, and we stand behind every piece we sell.
            COLOR isn&rsquo;t a furniture store; it&rsquo;s a point of view on how a
            modern Ethiopian home should feel.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-line bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-6 py-16 md:grid-cols-4 md:px-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <p className="font-display text-4xl text-wood-dark md:text-5xl">{s.value}</p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.1em] text-charcoal-soft/70">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="space-y-24 md:space-y-32">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <Reveal
                className={`relative aspect-[4/5] overflow-hidden ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <CoverImage seed={pillar.seed} label={pillar.title} eyebrow="COLOR Furniture" />
              </Reveal>
              <Reveal className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className="font-display text-sm text-wood">{`0${i + 1}`}</span>
                <h2 className="mt-4 font-display text-3xl text-charcoal text-balance md:text-4xl">
                  {pillar.title}
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-charcoal-soft/80">
                  {pillar.text}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <FinalCta
        eyebrow="Visit Us"
        title="Come Experience COLOR in Person"
        description={`Our showroom on ${site.address.line1} is open every day. Bring your room's dimensions — our design consultants do the rest.`}
        imageSeed="color-about-cta"
      />
    </div>
  );
}
