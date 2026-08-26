export const siteConfig = {
  name: "Meskel Motors",
  tagline: "Imported cars, inspected and ready — before you ever see them in person.",
  whatsappNumber: "251911234567", // digits only, country code first — update to real number
  phoneDisplay: "+251 91 123 4567",
  email: "hello@meskelmotors.com",
  address: "Bole Road, near Friendship Center, Addis Ababa, Ethiopia",
  instagram: "https://instagram.com/meskelmotors",
  facebook: "https://facebook.com/meskelmotors",
  tiktok: "https://tiktok.com/@meskelmotors",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
