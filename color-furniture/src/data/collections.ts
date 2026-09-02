export type CollectionSlug =
  | "living-room"
  | "sofas"
  | "bedroom"
  | "dining"
  | "office"
  | "tables"
  | "chairs"
  | "storage"
  | "accessories";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  shortName: string;
  description: string;
  editorial: string;
  heroImage: string;
}

export const collections: Collection[] = [
  {
    slug: "living-room",
    name: "Living Room",
    shortName: "Living",
    description:
      "Anchor pieces for the room where life happens — considered seating, low tables and media consoles.",
    editorial:
      "A living room should feel unhurried. We pair sculptural silhouettes with warm, tactile materials so the space invites you to stay.",
    heroImage: "color-living-room-hero",
  },
  {
    slug: "sofas",
    name: "Sofas & Seating",
    shortName: "Sofas",
    description:
      "Deep-seated sofas and modular sectionals upholstered in boucle, linen and full-grain leather.",
    editorial:
      "Seating is where craftsmanship shows first. Every frame is kiln-dried hardwood, hand-tied and finished with fabrics chosen for how they age.",
    heroImage: "color-sofas-hero",
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    shortName: "Bedroom",
    description:
      "Beds, nightstands and dressers built for calm mornings and quiet evenings.",
    editorial:
      "We design bedrooms as a retreat — soft edges, muted tones and joinery that disappears into the form.",
    heroImage: "color-bedroom-hero",
  },
  {
    slug: "dining",
    name: "Dining Room",
    shortName: "Dining",
    description:
      "Tables and chairs made for long dinners — solid timber, stone tops and hand-finished detailing.",
    editorial:
      "The dining table is where the household gathers. Ours are built to outlast the trends around them, from oak to honed marble.",
    heroImage: "color-dining-hero",
  },
  {
    slug: "office",
    name: "Office",
    shortName: "Office",
    description:
      "Desks, task chairs and shelving that make working from home feel considered, not improvised.",
    editorial:
      "A home office should earn its place in the room. We favour clean lines, real wood veneers and hardware that lasts.",
    heroImage: "color-office-hero",
  },
  {
    slug: "tables",
    name: "Tables",
    shortName: "Tables",
    description:
      "Coffee, side and console tables in stone, glass and solid timber.",
    editorial:
      "Small pieces carry a room's character. Each table is proportioned to hold its own beside a larger sofa or sideboard.",
    heroImage: "color-tables-hero",
  },
  {
    slug: "chairs",
    name: "Chairs",
    shortName: "Chairs",
    description:
      "Accent and lounge chairs — a single considered seat can define a corner.",
    editorial:
      "Not every chair needs to be part of a set. We design statement seating that stands beautifully on its own.",
    heroImage: "color-chairs-hero",
  },
  {
    slug: "storage",
    name: "Storage",
    shortName: "Storage",
    description:
      "Wardrobes, sideboards and shelving that keep a home organised without breaking its calm.",
    editorial:
      "Good storage is invisible until you need it. Soft-close hardware, real veneers, and proportions built for Ethiopian homes.",
    heroImage: "color-storage-hero",
  },
  {
    slug: "accessories",
    name: "Accessories",
    shortName: "Accessories",
    description:
      "Lighting, mirrors, rugs and objects that finish a room.",
    editorial:
      "The final ten percent is what makes a room feel finished. Considered objects, sourced with the same eye as our furniture.",
    heroImage: "color-accessories-hero",
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
