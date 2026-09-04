import type { Metadata } from "next";
import PartnerLogo from "@/components/PartnerLogo";
import SectionHeading from "@/components/SectionHeading";
import { getPartners } from "@/lib/data";
import type { PartnerCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Partners",
  description: "The banks, insurers and logistics partners we work with to make buying an imported car easier.",
};

const categoryOrder: PartnerCategory[] = ["bank", "insurer", "shipper", "other"];
const categoryTitle: Record<PartnerCategory, string> = {
  bank: "Financing Partners",
  insurer: "Insurance Partners",
  shipper: "Logistics & Shipping Partners",
  other: "Other Partners",
};
const categoryBody: Record<PartnerCategory, string> = {
  bank: "Ask us about auto loan introductions with any of these banks — we help prepare the paperwork.",
  insurer: "Comprehensive and third-party cover, arranged before you drive off the lot.",
  shipper: "The shipping and clearing partners who move every vehicle from origin to our lot.",
  other: "",
};

export default async function PartnersPage() {
  const partners = await getPartners();
  const grouped = categoryOrder
    .map((cat) => ({ cat, items: partners.filter((p) => p.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow="Partners"
        title="Who we work with"
        description="We've built relationships with trusted banks, insurers and logistics partners so you're never handling financing, cover, or shipping paperwork alone."
      />

      <div className="mt-12 space-y-14">
        {grouped.map(({ cat, items }) => (
          <div key={cat}>
            <h2 className="font-display text-xl text-ink sm:text-2xl">{categoryTitle[cat]}</h2>
            {categoryBody[cat] && <p className="mt-1 max-w-xl text-sm text-ink-soft">{categoryBody[cat]}</p>}
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((partner) => (
                <PartnerLogo key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
