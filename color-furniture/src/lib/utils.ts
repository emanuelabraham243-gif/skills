import type { Product } from "@/data/products";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function availabilityTone(availability: Product["availability"]) {
  switch (availability) {
    case "In Stock":
      return "text-[#5c6b4f]";
    case "Made to Order":
      return "text-[#8a6a3a]";
    case "Out of Stock":
      return "text-[#a04a3a]";
    default:
      return "text-charcoal";
  }
}
