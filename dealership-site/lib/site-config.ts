export const siteConfig = {
  name: "Yemareyam Car Import",
  tagline: "Imported cars, inspected and ready — before you ever see them in person.",
  whatsappNumber: "251911234567", // digits only, country code first — update to real number
  phoneDisplay: "+251 91 123 4567",
  email: "hello@yemareyamcarimport.com",
  address: "Bole Road, near Friendship Center, Addis Ababa, Ethiopia",
  instagram: "https://instagram.com/yemareyamcarimport",
  facebook: "https://facebook.com/yemareyamcarimport",
  tiktok: "https://tiktok.com/@yemareyamcarimport",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
