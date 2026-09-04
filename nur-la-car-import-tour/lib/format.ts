export function formatPrice(price: number, currency: string = "ETB"): string {
  if (currency === "ETB") {
    return `ETB ${new Intl.NumberFormat("en-US").format(price)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat("en-US").format(km)} km`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDuration(days: number): string {
  const nights = days - 1;
  if (nights <= 0) return `${days} day`;
  return `${days} days / ${nights} nights`;
}

export function titleCase(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
