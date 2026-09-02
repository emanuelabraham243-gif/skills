import type { CollectionSlug } from "./collections";

export type Availability = "In Stock" | "Made to Order" | "Out of Stock";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Dimensions {
  width: number;
  depth: number;
  height: number;
  unit: "cm";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CollectionSlug;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: "ETB";
  availability: Availability;
  leadTime?: string;
  materials: string[];
  colors: ProductColor[];
  dimensions: Dimensions;
  care: string[];
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

function img(seed: string, i: number) {
  return `color-${seed}-${i}`;
}

const COLOR_SWATCHES: Record<string, string> = {
  Ivory: "#f3ede2",
  Charcoal: "#2b2723",
  Camel: "#b98a55",
  Terracotta: "#a85c3b",
  Sage: "#8a9078",
  Walnut: "#5c4229",
  Black: "#1a1714",
  "Natural Oak": "#c9a877",
  Taupe: "#a9998a",
  Brass: "#b08d57",
};

function swatch(...names: string[]): ProductColor[] {
  return names.map((name) => ({ name, hex: COLOR_SWATCHES[name] ?? "#ccc" }));
}

export const products: Product[] = [
  // Living Room
  {
    id: "p-gondar-console",
    slug: "gondar-media-console",
    name: "Gondar Media Console",
    category: "living-room",
    tagline: "Walnut veneer console with soft-close storage",
    description:
      "Named for the imperial city, the Gondar console pairs a solid oak frame with book-matched walnut veneer doors. Cable-management channels and soft-close hinges keep the front clean while hiding everything behind it.",
    price: 128000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Solid Oak", "Walnut Veneer", "Powder-Coated Steel"],
    colors: swatch("Walnut", "Charcoal"),
    dimensions: { width: 180, depth: 42, height: 48, unit: "cm" },
    care: [
      "Dust with a soft, dry microfibre cloth.",
      "Avoid direct sunlight to prevent veneer fading.",
      "Use coasters under hot electronics to protect the finish.",
    ],
    images: [img("gondar-console", 1), img("gondar-console", 2), img("gondar-console", 3)],
    isFeatured: true,
    createdAt: "2026-06-01",
  },
  {
    id: "p-kaffa-armchair",
    slug: "kaffa-accent-armchair",
    name: "Kaffa Accent Armchair",
    category: "living-room",
    tagline: "Boucle armchair with a solid beech frame",
    description:
      "Kaffa takes its name from the birthplace of coffee — a chair meant for slow mornings. A generous boucle seat sits on a turned beech frame finished in natural oak.",
    price: 84000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Boucle Fabric", "Solid Beech"],
    colors: swatch("Ivory", "Sage", "Terracotta"),
    dimensions: { width: 78, depth: 82, height: 76, unit: "cm" },
    care: [
      "Vacuum boucle upholstery weekly with a low-suction attachment.",
      "Blot spills immediately; do not rub.",
      "Professional cleaning recommended for deep stains.",
    ],
    images: [img("kaffa-armchair", 1), img("kaffa-armchair", 2), img("kaffa-armchair", 3)],
    isBestSeller: true,
    createdAt: "2026-03-14",
  },
  {
    id: "p-adwa-bar-cabinet",
    slug: "adwa-bar-cabinet",
    name: "Adwa Bar Cabinet",
    category: "living-room",
    tagline: "Brass-detailed bar cabinet in solid walnut",
    description:
      "A statement cabinet for entertaining, with a fluted walnut facade, brass hardware, and a felt-lined interior with integrated glass storage.",
    price: 165000,
    currency: "ETB",
    availability: "Made to Order",
    leadTime: "6–8 weeks",
    materials: ["Solid Walnut", "Brass", "Tempered Glass"],
    colors: swatch("Walnut", "Black"),
    dimensions: { width: 110, depth: 45, height: 95, unit: "cm" },
    care: [
      "Wipe brass hardware with a dry cloth; avoid abrasive cleaners.",
      "Keep away from excess humidity.",
    ],
    images: [img("adwa-bar-cabinet", 1), img("adwa-bar-cabinet", 2), img("adwa-bar-cabinet", 3)],
    isNew: true,
    createdAt: "2026-08-02",
  },

  // Sofas
  {
    id: "p-sidama-sofa",
    slug: "sidama-three-seater-sofa",
    name: "Sidama Three-Seater Sofa",
    category: "sofas",
    tagline: "Deep-seated sofa in full-grain leather",
    description:
      "The Sidama is built for real living — a kiln-dried hardwood frame, hand-tied springs, and high-density foam wrapped in full-grain leather that softens beautifully with age.",
    price: 385000,
    compareAtPrice: 430000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Genuine Leather", "Solid Hardwood Frame", "High-Density Foam"],
    colors: swatch("Charcoal", "Camel", "Walnut"),
    dimensions: { width: 224, depth: 96, height: 84, unit: "cm" },
    care: [
      "Condition leather every 6–12 months.",
      "Keep away from direct heat sources and prolonged sun exposure.",
      "Wipe spills immediately with a dry cloth.",
    ],
    images: [img("sidama-sofa", 1), img("sidama-sofa", 2), img("sidama-sofa", 3), img("sidama-sofa", 4)],
    isBestSeller: true,
    isFeatured: true,
    createdAt: "2026-02-20",
  },
  {
    id: "p-simien-sectional",
    slug: "simien-modular-sectional",
    name: "Simien Modular Sectional",
    category: "sofas",
    tagline: "Modular sectional in performance linen",
    description:
      "Inspired by the modular peaks of the Simien range, this sectional is built from independent modules so the configuration can grow and change with your room.",
    price: 512000,
    currency: "ETB",
    availability: "Made to Order",
    leadTime: "8–10 weeks",
    materials: ["Linen Blend", "Solid Hardwood Frame", "High-Resilience Foam"],
    colors: swatch("Ivory", "Taupe", "Charcoal"),
    dimensions: { width: 320, depth: 180, height: 78, unit: "cm" },
    care: [
      "Rotate and fluff cushions weekly for even wear.",
      "Spot clean with a mild, water-based upholstery cleaner.",
    ],
    images: [img("simien-sectional", 1), img("simien-sectional", 2), img("simien-sectional", 3)],
    isNew: true,
    createdAt: "2026-07-18",
  },
  {
    id: "p-harar-loveseat",
    slug: "harar-leather-loveseat",
    name: "Harar Leather Loveseat",
    category: "sofas",
    tagline: "Compact two-seater in saddle leather",
    description:
      "A refined loveseat for smaller rooms and quiet corners, upholstered in saddle-tanned leather over a solid beech frame.",
    price: 245000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Genuine Leather", "Solid Beech"],
    colors: swatch("Camel", "Charcoal"),
    dimensions: { width: 160, depth: 88, height: 80, unit: "cm" },
    care: [
      "Condition leather twice yearly.",
      "Avoid placing near direct sunlight or heating vents.",
    ],
    images: [img("harar-loveseat", 1), img("harar-loveseat", 2), img("harar-loveseat", 3)],
    createdAt: "2026-01-11",
  },

  // Bedroom
  {
    id: "p-lalibela-bed",
    slug: "lalibela-upholstered-bed",
    name: "Lalibela Upholstered Bed",
    category: "bedroom",
    tagline: "Channel-tufted bed frame in boucle",
    description:
      "A sculptural headboard, channel-tufted by hand and upholstered in boucle, sits on a solid timber frame engineered for long-term support.",
    price: 210000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Boucle Fabric", "Solid Pine Frame", "Engineered Slats"],
    colors: swatch("Ivory", "Taupe", "Charcoal"),
    dimensions: { width: 180, depth: 210, height: 120, unit: "cm" },
    care: [
      "Vacuum upholstered headboard monthly.",
      "Spot clean with a damp cloth and mild detergent.",
    ],
    images: [img("lalibela-bed", 1), img("lalibela-bed", 2), img("lalibela-bed", 3)],
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-04-05",
  },
  {
    id: "p-tana-nightstand",
    slug: "tana-nightstand",
    name: "Tana Nightstand",
    category: "bedroom",
    tagline: "Solid oak nightstand with a single drawer",
    description:
      "A quiet, considered nightstand in solid oak with a felt-lined drawer and an open lower shelf for books or a reading lamp.",
    price: 42000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Solid Oak"],
    colors: swatch("Natural Oak", "Walnut"),
    dimensions: { width: 45, depth: 40, height: 55, unit: "cm" },
    care: ["Dust regularly with a dry cloth.", "Avoid placing wet items directly on the surface."],
    images: [img("tana-nightstand", 1), img("tana-nightstand", 2), img("tana-nightstand", 3)],
    createdAt: "2026-05-22",
  },
  {
    id: "p-axum-dresser",
    slug: "axum-dresser",
    name: "Axum Dresser",
    category: "bedroom",
    tagline: "Six-drawer dresser in walnut veneer",
    description:
      "Named after the ancient obelisks of Axum, this dresser stands on tapered brass-capped legs with six soft-close drawers finished in book-matched walnut veneer.",
    price: 168000,
    currency: "ETB",
    availability: "Made to Order",
    leadTime: "6 weeks",
    materials: ["Walnut Veneer", "Solid Oak", "Brass"],
    colors: swatch("Walnut", "Charcoal"),
    dimensions: { width: 160, depth: 48, height: 82, unit: "cm" },
    care: ["Dust with a soft cloth.", "Keep drawer runners free of dust for smooth operation."],
    images: [img("axum-dresser", 1), img("axum-dresser", 2), img("axum-dresser", 3)],
    createdAt: "2026-03-30",
  },

  // Dining
  {
    id: "p-omo-dining-table",
    slug: "omo-dining-table",
    name: "Omo Dining Table",
    category: "dining",
    tagline: "Solid oak table for eight",
    description:
      "A generous dining table with a live-edge-inspired solid oak top and a sculpted trestle base, built to seat eight comfortably.",
    price: 245000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Solid Oak"],
    colors: swatch("Natural Oak", "Walnut"),
    dimensions: { width: 240, depth: 100, height: 76, unit: "cm" },
    care: ["Wipe with a damp cloth and dry immediately.", "Re-oil the surface annually."],
    images: [img("omo-dining-table", 1), img("omo-dining-table", 2), img("omo-dining-table", 3)],
    isFeatured: true,
    createdAt: "2026-02-02",
  },
  {
    id: "p-danakil-sideboard",
    slug: "danakil-sideboard",
    name: "Danakil Sideboard",
    category: "dining",
    tagline: "Low sideboard with fluted oak doors",
    description:
      "A long, low sideboard for the dining room, with fluted solid oak doors and adjustable interior shelving for glassware and linens.",
    price: 189000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Solid Oak", "Powder-Coated Steel"],
    colors: swatch("Natural Oak", "Charcoal"),
    dimensions: { width: 200, depth: 45, height: 78, unit: "cm" },
    care: ["Dust with a soft, dry cloth.", "Avoid dragging across floors; lift to reposition."],
    images: [img("danakil-sideboard", 1), img("danakil-sideboard", 2), img("danakil-sideboard", 3)],
    createdAt: "2026-01-25",
  },
  {
    id: "p-bale-dining-table",
    slug: "bale-extendable-dining-table",
    name: "Bale Extendable Dining Table",
    category: "dining",
    tagline: "Extendable marble-top dining table",
    description:
      "A honed marble top on a solid brass-finished steel base, with a butterfly leaf that extends the table from six to ten seats.",
    price: 298000,
    currency: "ETB",
    availability: "Made to Order",
    leadTime: "8 weeks",
    materials: ["Marble", "Powder-Coated Steel", "Brass"],
    colors: swatch("Ivory", "Black"),
    dimensions: { width: 220, depth: 100, height: 75, unit: "cm" },
    care: ["Seal marble annually.", "Wipe spills immediately to prevent staining.", "Use coasters and placemats."],
    images: [img("bale-dining-table", 1), img("bale-dining-table", 2), img("bale-dining-table", 3)],
    isNew: true,
    createdAt: "2026-08-10",
  },

  // Office
  {
    id: "p-merkato-desk",
    slug: "merkato-executive-desk",
    name: "Merkato Executive Desk",
    category: "office",
    tagline: "Walnut veneer desk with integrated cable management",
    description:
      "A commanding executive desk with a walnut veneer top, discreet cable routing, and two soft-close drawers for stationery and files.",
    price: 156000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Walnut Veneer", "Solid Oak", "Powder-Coated Steel"],
    colors: swatch("Walnut", "Charcoal"),
    dimensions: { width: 160, depth: 75, height: 76, unit: "cm" },
    care: ["Dust with a dry cloth.", "Use a desk pad to protect the veneer from scratches."],
    images: [img("merkato-desk", 1), img("merkato-desk", 2), img("merkato-desk", 3)],
    isFeatured: true,
    createdAt: "2026-04-19",
  },
  {
    id: "p-jimma-task-chair",
    slug: "jimma-task-chair",
    name: "Jimma Task Chair",
    category: "office",
    tagline: "Ergonomic task chair in leather and brass",
    description:
      "An ergonomic task chair with a leather-wrapped seat, adjustable lumbar support, and a brushed-brass five-star base.",
    price: 98000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Genuine Leather", "Aluminium", "Brass"],
    colors: swatch("Charcoal", "Camel"),
    dimensions: { width: 62, depth: 65, height: 98, unit: "cm" },
    care: ["Wipe leather with a dry cloth.", "Condition leather every 6 months."],
    images: [img("jimma-task-chair", 1), img("jimma-task-chair", 2), img("jimma-task-chair", 3)],
    createdAt: "2026-05-08",
  },
  {
    id: "p-dire-bookshelf",
    slug: "dire-bookshelf",
    name: "Dire Bookshelf",
    category: "office",
    tagline: "Open-frame bookshelf in solid ash",
    description:
      "A tall, open-frame bookshelf in solid ash with adjustable shelving, designed to hold books and objects without visual clutter.",
    price: 112000,
    currency: "ETB",
    availability: "Out of Stock",
    materials: ["Solid Ash", "Powder-Coated Steel"],
    colors: swatch("Natural Oak", "Black"),
    dimensions: { width: 90, depth: 35, height: 190, unit: "cm" },
    care: ["Dust shelves regularly.", "Avoid overloading individual shelves beyond 25kg."],
    images: [img("dire-bookshelf", 1), img("dire-bookshelf", 2), img("dire-bookshelf", 3)],
    createdAt: "2025-11-30",
  },

  // Tables
  {
    id: "p-awash-coffee-table",
    slug: "awash-coffee-table",
    name: "Awash Coffee Table",
    category: "tables",
    tagline: "Sculptural coffee table in solid walnut",
    description:
      "A low, sculptural coffee table with a solid walnut top resting on two carved plinth legs — quietly monumental.",
    price: 78000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Solid Walnut"],
    colors: swatch("Walnut", "Natural Oak"),
    dimensions: { width: 120, depth: 60, height: 34, unit: "cm" },
    care: ["Dust with a soft cloth.", "Use coasters to prevent water rings."],
    images: [img("awash-coffee-table", 1), img("awash-coffee-table", 2), img("awash-coffee-table", 3)],
    isBestSeller: true,
    createdAt: "2026-02-14",
  },
  {
    id: "p-wenchi-side-table",
    slug: "wenchi-side-table",
    name: "Wenchi Side Table",
    category: "tables",
    tagline: "Round side table in travertine",
    description:
      "A compact round side table with a honed travertine top and a slender powder-coated steel base.",
    price: 46000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Travertine", "Powder-Coated Steel"],
    colors: swatch("Ivory", "Black"),
    dimensions: { width: 40, depth: 40, height: 52, unit: "cm" },
    care: ["Seal stone surface periodically.", "Wipe with a soft, dry cloth."],
    images: [img("wenchi-side-table", 1), img("wenchi-side-table", 2), img("wenchi-side-table", 3)],
    isNew: true,
    createdAt: "2026-07-29",
  },
  {
    id: "p-chamo-console",
    slug: "chamo-console-table",
    name: "Chamo Console Table",
    category: "tables",
    tagline: "Slim entryway console in ash and brass",
    description:
      "A slim, elegant console for entryways and hallways, with a solid ash top and brushed-brass legs.",
    price: 68000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Solid Ash", "Brass"],
    colors: swatch("Natural Oak", "Black"),
    dimensions: { width: 130, depth: 34, height: 80, unit: "cm" },
    care: ["Dust regularly.", "Wipe brass legs with a dry cloth."],
    images: [img("chamo-console", 1), img("chamo-console", 2), img("chamo-console", 3)],
    createdAt: "2026-06-16",
  },

  // Chairs
  {
    id: "p-entoto-lounge-chair",
    slug: "entoto-lounge-chair",
    name: "Entoto Lounge Chair",
    category: "chairs",
    tagline: "Leather lounge chair with matching ottoman",
    description:
      "A classic lounge silhouette reimagined in saddle leather and solid walnut, paired with a matching ottoman for long, easy afternoons.",
    price: 186000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Genuine Leather", "Solid Walnut"],
    colors: swatch("Camel", "Charcoal"),
    dimensions: { width: 84, depth: 88, height: 78, unit: "cm" },
    care: ["Condition leather twice a year.", "Keep away from direct heat."],
    images: [img("entoto-lounge-chair", 1), img("entoto-lounge-chair", 2), img("entoto-lounge-chair", 3)],
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-03-02",
  },
  {
    id: "p-konso-accent-chair",
    slug: "konso-accent-chair",
    name: "Konso Accent Chair",
    category: "chairs",
    tagline: "Sculptural accent chair in terracotta boucle",
    description:
      "A sculptural, curved-back accent chair upholstered in terracotta boucle on a solid beech swivel base.",
    price: 89000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Boucle Fabric", "Solid Beech"],
    colors: swatch("Terracotta", "Sage", "Ivory"),
    dimensions: { width: 76, depth: 80, height: 74, unit: "cm" },
    care: ["Vacuum with a low-suction attachment.", "Blot spills immediately."],
    images: [img("konso-accent-chair", 1), img("konso-accent-chair", 2), img("konso-accent-chair", 3)],
    isNew: true,
    createdAt: "2026-08-20",
  },
  {
    id: "p-bishoftu-dining-chair",
    slug: "bishoftu-dining-chair",
    name: "Bishoftu Dining Chair",
    category: "chairs",
    tagline: "Woven dining chair in solid oak",
    description:
      "A dining chair with a solid oak frame and a hand-woven rattan seat and back, designed to be light to move and comfortable to linger in.",
    price: 34000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Solid Oak", "Rattan"],
    colors: swatch("Natural Oak"),
    dimensions: { width: 48, depth: 54, height: 82, unit: "cm" },
    care: ["Dust rattan with a soft brush.", "Keep away from prolonged direct sunlight."],
    images: [img("bishoftu-dining-chair", 1), img("bishoftu-dining-chair", 2), img("bishoftu-dining-chair", 3)],
    createdAt: "2026-01-05",
  },

  // Storage
  {
    id: "p-gojjam-wardrobe",
    slug: "gojjam-wardrobe",
    name: "Gojjam Wardrobe",
    category: "storage",
    tagline: "Three-door wardrobe in oak veneer",
    description:
      "A generous three-door wardrobe with an internal hanging rail, shelving, and soft-close hinges, finished in natural oak veneer.",
    price: 225000,
    currency: "ETB",
    availability: "Made to Order",
    leadTime: "6–8 weeks",
    materials: ["Oak Veneer", "Solid Oak", "Powder-Coated Steel"],
    colors: swatch("Natural Oak", "Charcoal"),
    dimensions: { width: 180, depth: 60, height: 210, unit: "cm" },
    care: ["Dust doors with a soft cloth.", "Lubricate hinges annually if needed."],
    images: [img("gojjam-wardrobe", 1), img("gojjam-wardrobe", 2), img("gojjam-wardrobe", 3)],
    createdAt: "2026-02-27",
  },
  {
    id: "p-adama-cabinet",
    slug: "adama-sideboard-cabinet",
    name: "Adama Sideboard Cabinet",
    category: "storage",
    tagline: "Compact storage cabinet with cane doors",
    description:
      "A compact storage cabinet with hand-woven cane door fronts over a solid ash frame, ideal for living or dining rooms.",
    price: 96000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Solid Ash", "Rattan", "Cane"],
    colors: swatch("Natural Oak", "Walnut"),
    dimensions: { width: 120, depth: 40, height: 75, unit: "cm" },
    care: ["Dust cane fronts gently.", "Avoid high-humidity environments."],
    images: [img("adama-cabinet", 1), img("adama-cabinet", 2), img("adama-cabinet", 3)],
    createdAt: "2026-05-30",
  },
  {
    id: "p-debre-shelving",
    slug: "debre-shelving-unit",
    name: "Debre Shelving Unit",
    category: "storage",
    tagline: "Modular shelving in blackened steel and oak",
    description:
      "A modular shelving system combining blackened steel frames with solid oak shelves, built to be reconfigured as your space evolves.",
    price: 134000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Solid Oak", "Blackened Steel"],
    colors: swatch("Natural Oak", "Black"),
    dimensions: { width: 100, depth: 35, height: 200, unit: "cm" },
    care: ["Dust shelves regularly.", "Wipe steel frame with a dry cloth."],
    images: [img("debre-shelving", 1), img("debre-shelving", 2), img("debre-shelving", 3)],
    isFeatured: true,
    createdAt: "2026-04-27",
  },

  // Accessories
  {
    id: "p-tis-abay-mirror",
    slug: "tis-abay-floor-mirror",
    name: "Tis Abay Floor Mirror",
    category: "accessories",
    tagline: "Arched floor mirror in brushed brass",
    description:
      "Named for the Blue Nile Falls, this arched floor mirror is framed in brushed brass and leans effortlessly against any wall.",
    price: 52000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Brass", "Mirrored Glass"],
    colors: swatch("Brass", "Black"),
    dimensions: { width: 80, depth: 4, height: 180, unit: "cm" },
    care: ["Clean glass with a streak-free glass cleaner.", "Dust the frame with a soft cloth."],
    images: [img("tis-abay-mirror", 1), img("tis-abay-mirror", 2), img("tis-abay-mirror", 3)],
    isBestSeller: true,
    createdAt: "2026-03-21",
  },
  {
    id: "p-blue-nile-rug",
    slug: "blue-nile-area-rug",
    name: "Blue Nile Area Rug",
    category: "accessories",
    tagline: "Hand-knotted wool area rug",
    description:
      "A hand-knotted wool area rug in a muted, abstract pattern designed to anchor a living or dining room.",
    price: 64000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Wool", "Cotton Backing"],
    colors: swatch("Ivory", "Terracotta", "Charcoal"),
    dimensions: { width: 240, depth: 300, height: 2, unit: "cm" },
    care: ["Rotate periodically for even wear.", "Professional cleaning recommended.", "Vacuum on a low-pile setting."],
    images: [img("blue-nile-rug", 1), img("blue-nile-rug", 2), img("blue-nile-rug", 3)],
    isNew: true,
    createdAt: "2026-08-25",
  },
  {
    id: "p-sof-omar-lamp",
    slug: "sof-omar-table-lamp",
    name: "Sof Omar Table Lamp",
    category: "accessories",
    tagline: "Sculptural table lamp in travertine and linen",
    description:
      "A sculptural table lamp with a carved travertine base and a hand-sewn linen shade, casting a warm, diffused light.",
    price: 28000,
    currency: "ETB",
    availability: "In Stock",
    materials: ["Travertine", "Linen"],
    colors: swatch("Ivory"),
    dimensions: { width: 30, depth: 30, height: 52, unit: "cm" },
    care: ["Dust shade with a soft brush.", "Wipe base with a dry cloth."],
    images: [img("sof-omar-lamp", 1), img("sof-omar-lamp", 2), img("sof-omar-lamp", 3)],
    createdAt: "2026-06-09",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count)
    .concat(
      products.filter((p) => p.id !== product.id && p.category !== product.category)
    )
    .slice(0, count);
}

export function formatPrice(amount: number) {
  return `ETB ${amount.toLocaleString("en-US")}`;
}

export const allMaterials = Array.from(
  new Set(products.flatMap((p) => p.materials))
).sort();

export const allColors = Array.from(
  new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values()
).sort((a, b) => a.name.localeCompare(b.name));
