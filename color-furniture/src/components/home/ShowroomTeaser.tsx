import Button from "@/components/Button";
import CoverImage from "@/components/CoverImage";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export default function ShowroomTeaser() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 aspect-[4/5] overflow-hidden lg:order-1 lg:aspect-[5/6]">
          <CoverImage seed="color-showroom-teaser" label="COLOR Showroom" eyebrow="Addis Ababa" />
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <p className="eyebrow mb-5 text-[11px] font-medium uppercase text-wood-dark">
            The Showroom Experience
          </p>
          <h2 className="font-display text-3xl leading-[1.15] text-charcoal text-balance md:text-[2.5rem]">
            See It. Touch It. Take Your Time.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-charcoal-soft/80">
            Photographs only tell half the story. Our Bole showroom is set up as
            a series of fully furnished rooms, so you can feel the weight of a
            leather sofa or the grain of a solid oak table before you decide.
            Our design consultants are on hand for as long as you need them.
          </p>
          <ul className="mt-8 space-y-3 text-[14px] text-charcoal-soft/80">
            <li>{site.address.line1}, {site.address.line2}</li>
            {site.hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/showroom" size="lg">
              Plan Your Visit
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Request More Information
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
