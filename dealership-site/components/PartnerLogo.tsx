import type { Partner } from "@/lib/types";

const categoryLabel: Record<Partner["category"], string> = {
  bank: "Financing Partner",
  insurer: "Insurance Partner",
  shipper: "Logistics Partner",
  other: "Partner",
};

export default function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-white px-6 text-center">
      <span className="font-display text-base text-ink">{partner.name}</span>
      <span className="text-[0.7rem] uppercase tracking-wide text-ink-soft">{categoryLabel[partner.category]}</span>
    </div>
  );
}
