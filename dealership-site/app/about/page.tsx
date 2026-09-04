import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}, our team, and why we built a transparent way to buy imported cars in Ethiopia.`,
};

const values = [
  {
    title: "Transparency first",
    body: "We publish honest condition summaries and full photo galleries for every car — the same information we'd want if we were buying.",
  },
  {
    title: "Every car inspected",
    body: "Nothing goes on the lot, let alone the site, without a mechanical and cosmetic inspection and a proper detail.",
  },
  {
    title: "We handle the hard parts",
    body: "Sourcing, shipping, customs clearance and paperwork are on us, so you're only making one decision: which car.",
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
              Buying an imported car in Ethiopia has traditionally meant relying on word of mouth,
              grainy phone photos, and a lot of trust in someone you&rsquo;ve just met. We started {siteConfig.name}{" "}
              to change that — treating every listing the way we&rsquo;d want to be treated as buyers
              ourselves: full photos, honest write-ups, and a clear process from first message to
              handover.
            </p>
            <p>
              We&rsquo;re a small, Addis Ababa-based team of importers, mechanics and customer support
              staff who inspect, prepare, and stand behind every car that comes through our lot. We
              work directly with banking, insurance and logistics partners so financing and paperwork
              are as painless as possible.
            </p>
            <p>
              Most of our customers make their decision — and often their deposit — before ever
              setting foot on the lot. Everything about how we list cars is built around earning
              that trust.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/cars/toyota-land-cruiser-prado-2020/0.svg"
            alt="Our showroom lot"
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

      <div className="mt-20 grid grid-cols-2 gap-6 border-t border-line pt-12 sm:grid-cols-4">
        {[
          ["500+", "Cars imported"],
          ["8", "Years in business"],
          ["3", "Banking partners"],
          ["4.8/5", "Average review"],
        ].map(([stat, label]) => (
          <div key={label}>
            <p className="font-display text-3xl text-ink sm:text-4xl">{stat}</p>
            <p className="mt-1 text-sm text-ink-soft">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
