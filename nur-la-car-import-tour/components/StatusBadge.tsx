import type { CarStatus } from "@/lib/types";

const statusConfig: Record<CarStatus, { label: string; className: string }> = {
  available: { label: "Available", className: "bg-accent-soft/30 text-accent" },
  reserved: { label: "Reserved", className: "bg-gold-soft text-gold-ink" },
  on_test_drive: { label: "On Test Drive", className: "bg-amber-bg text-amber-ink" },
  sold: { label: "Sold", className: "bg-ink/10 text-ink-soft" },
  coming_soon: { label: "Coming Soon", className: "bg-paper-dim text-ink-soft border border-line" },
};

export default function StatusBadge({ status, className = "" }: { status: CarStatus; className?: string }) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${config.className} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
