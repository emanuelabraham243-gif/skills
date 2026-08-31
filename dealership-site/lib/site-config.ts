export const siteConfig = {
  name: "Yemareyam Car Import",
  // Path or URL to a square logo mark (e.g. "/logo/acme.png"). Leave empty
  // to fall back to the text wordmark — this is the one thing to swap,
  // along with `name` below, before showing this site to a new importer.
  logo: "",
  tagline: "Imported cars, inspected and ready — before you ever see them in person.",
  whatsappNumber: "251911234567", // digits only, country code first — update to real number
  phoneDisplay: "+251 91 123 4567",
  email: "hello@yemareyamcarimport.com",
  address: "Bole Road, near Friendship Center, Addis Ababa, Ethiopia",
  instagram: "https://instagram.com/yemareyamcarimport",
  facebook: "https://facebook.com/yemareyamcarimport",
  tiktok: "https://tiktok.com/@yemareyamcarimport",
  // Shown in the trust strip under the hero, numbers animate up into view —
  // swap these for the importer's real figures when known, otherwise these
  // read as reasonable placeholders. Use `value` instead of `to` for a
  // stat that isn't a count (e.g. "24/7") so it renders as static text.
  stats: [
    { to: 500, suffix: "+", label: "Cars Imported" },
    { to: 10, suffix: "+", label: "Years Experience" },
    { to: 1200, suffix: "+", separator: ",", label: "Happy Customers" },
    { value: "24/7", label: "Support" },
  ] as Array<
    | { to: number; suffix?: string; separator?: string; label: string; value?: undefined }
    | { value: string; label: string; to?: undefined }
  >,
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
