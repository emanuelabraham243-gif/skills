import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const reasons = [
  {
    n: "01",
    title: "Imported, Original Pieces",
    text: "Every piece is sourced from trusted international makers and inspected on arrival — never local reproductions.",
  },
  {
    n: "02",
    title: "Built to Live In",
    text: "Solid hardwood frames, full-grain leathers and natural fabrics chosen to age with character, not wear out.",
  },
  {
    n: "03",
    title: "Design Consultation",
    text: "Our team helps you plan a room from scratch — layout, materials and finishes — at no extra cost.",
  },
  {
    n: "04",
    title: "Delivery & Setup",
    text: "White-glove delivery and assembly across Addis Ababa, with careful handling from our door to yours.",
  },
];

export default function WhyColor() {
  return (
    <section className="border-y border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="Why COLOR"
            title="A Different Way to Furnish"
            description="We built COLOR because Addis Ababa deserved a furniture house that treats quality, design and service as inseparable."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.n} delay={i * 90}>
              <span className="font-display text-sm text-wood">{r.n}</span>
              <h3 className="mt-4 font-display text-xl text-charcoal">{r.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-charcoal-soft/75">
                {r.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
