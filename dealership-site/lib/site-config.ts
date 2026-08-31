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
  // Shown in the trust strip under the hero — swap these for the importer's
  // real numbers when known, otherwise these read as reasonable placeholders.
  stats: [
    { value: "500+", label: "Cars Imported" },
    { value: "10+", label: "Years Experience" },
    { value: "1,200+", label: "Happy Customers" },
    { value: "24/7", label: "Support" },
  ],
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
