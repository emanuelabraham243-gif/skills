export const siteConfig = {
  name: "NUR LA Car Import & Tour Operation",
  shortName: "NUR LA",
  tagline: "Imported vehicles and guided tours across Ethiopia — one trusted team, Addis Ababa.",
  // Sourced from the business's Google Business listing.
  whatsappNumber: "251911676039",
  phoneDisplay: "+251 91 167 6039",
  // Not listed on the Google Business profile — placeholder until provided.
  email: "info@nurlacarimport.com",
  address: "2Q3P+R65, Addis Ababa, Ethiopia",
  hours: "Monday – Saturday, 7:30 AM – 5:30 PM (closed Sundays)",
  instagram: "https://instagram.com/nurlacarimport",
  facebook: "https://facebook.com/nurlacarimport",
  tiktok: "https://tiktok.com/@nurlacarimport",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
