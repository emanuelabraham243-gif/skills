"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthUser } from "@/lib/auth";
import { formatPrice } from "@/lib/format";

export default function PriceGate({
  price,
  currency,
  className = "",
  compact = false,
}: {
  price: number;
  currency: string;
  className?: string;
  compact?: boolean;
}) {
  const user = useAuthUser();
  const pathname = usePathname();

  if (user) {
    return <span className={className}>{formatPrice(price, currency)}</span>;
  }

  return (
    <Link
      href={`/account?redirect=${encodeURIComponent(pathname)}`}
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-1.5 font-medium text-purple hover:underline ${compact ? "text-xs" : "text-sm"}`}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className={compact ? "h-3 w-3" : "h-3.5 w-3.5"}>
        <path
          fillRule="evenodd"
          d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
          clipRule="evenodd"
        />
      </svg>
      Login / Register to see the price
    </Link>
  );
}
