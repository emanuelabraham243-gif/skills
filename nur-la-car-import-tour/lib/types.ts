// Domain types for the NUR LA site — a dual car-import and tour-operation
// business. These mirror the Supabase schema we're assuming until the real
// project credentials + schema are provided. See README.md "Supabase
// schema" section for the SQL this maps to, and lib/leads.ts for the one
// place the exact `submit_web_lead` RPC signature needs to be reconciled
// once it's shared.

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

// ---- cars -------------------------------------------------------------

export type CarStatus =
  | "available"
  | "reserved"
  | "on_test_drive"
  | "sold"
  | "coming_soon";

export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";

export type Transmission = "automatic" | "manual";

export type BodyType =
  | "sedan"
  | "suv"
  | "hatchback"
  | "pickup"
  | "van"
  | "coupe"
  | "crossover";

export interface Car {
  id: string;
  slug: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  price: number;
  currency: string; // e.g. "ETB", "USD"
  mileageKm: number;
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  status: CarStatus;
  exteriorColor: string;
  interiorColor?: string;
  engine?: string;
  drivetrain?: string;
  seats?: number;
  doors?: number;
  vin?: string;
  /** Public, approved condition summary — never internal inspection notes. */
  conditionSummary: string;
  specSheetUrl?: string;
  isFeatured: boolean;
  createdAt: string;
  images: GalleryImage[];
}

export interface CarFilters {
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMax?: number;
  fuelType?: FuelType;
  transmission?: Transmission;
  bodyType?: BodyType;
  status?: CarStatus;
  query?: string;
}

// ---- tours --------------------------------------------------------------

export type TourCategory =
  | "historical"
  | "nature"
  | "wildlife"
  | "religious"
  | "adventure"
  | "cultural"
  | "city";

export type TourDifficulty = "easy" | "moderate" | "challenging";

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  destination: string;
  category: TourCategory;
  durationDays: number;
  groupSizeMax: number;
  difficulty: TourDifficulty;
  price: number;
  currency: string;
  summary: string;
  itinerary: TourItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  isFeatured: boolean;
  createdAt: string;
  images: GalleryImage[];
}

export interface TourFilters {
  category?: TourCategory;
  difficulty?: TourDifficulty;
  durationMax?: number;
  priceMax?: number;
  query?: string;
}

// ---- reviews / partners ---------------------------------------------------

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  body: string;
  /** e.g. "2022 Toyota RAV4" or "Simien Mountains Trek" */
  itemLabel?: string;
  createdAt: string;
}

// ---- leads ----------------------------------------------------------------

export type LeadType =
  | "test_drive"
  | "interest"
  | "waitlist"
  | "notify_me"
  | "trade_in"
  | "custom_request"
  | "tour_booking";

export interface WebLeadInput {
  leadType: LeadType;
  fullName: string;
  phone: string;
  email?: string;
  message?: string;
  carId?: string;
  tourId?: string;
  preferredDate?: string;
  /** Free-form extra fields (trade-in vehicle info, custom request criteria, tour party size, etc). */
  metadata?: Record<string, unknown>;
}
