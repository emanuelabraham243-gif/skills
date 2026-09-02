export const site = {
  name: "COLOR",
  fullName: "COLOR Furniture",
  tagline: "Furniture That Defines Your Space.",
  description:
    "COLOR Furniture is Addis Ababa's home for curated, imported furniture — sofas, dining, bedroom and office pieces designed for modern Ethiopian living.",
  url: "https://colorfurniture.et",
  phone: "+251 91 122 9324",
  phoneHref: "tel:+251911229324",
  whatsappNumber: "251911229324",
  email: "hello@colorfurniture.et",
  address: {
    line1: "Bole Road, near Edna Mall",
    line2: "Addis Ababa, Ethiopia",
    mapsQuery: "COLOR Furniture, Bole Road, Addis Ababa, Ethiopia",
  },
  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
    { days: "Sunday", time: "11:00 AM – 5:00 PM" },
  ],
  social: {
    instagram: "https://instagram.com/colorfurniture.et",
    facebook: "https://facebook.com/colorfurniture.et",
    tiktok: "https://tiktok.com/@colorfurniture.et",
  },
};

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${site.whatsappNumber}?text=${encoded}`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    site.address.mapsQuery
  )}`;
}
