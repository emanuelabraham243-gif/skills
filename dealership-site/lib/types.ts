// Domain types for the dealership site.
//
// These mirror the Supabase schema we're assuming until the real project
// credentials + schema are provided. See README.md "Supabase schema" section
// for the SQL this maps to, and lib/leads.ts for the one place the exact
// `submit_web_lead` RPC signature needs to be reconciled once it's shared.

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

export interface CarImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

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
  images: CarImage[];
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

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  body: string;
  carLabel?: string; // e.g. "2022 Toyota RAV4"
  createdAt: string;
}

export type PartnerCategory = "bank" | "insurer" | "shipper" | "other";

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  logoUrl?: string;
  websiteUrl?: string;
}

export type LeadType =
  | "test_drive"
  | "interest"
  | "waitlist"
  | "notify_me"
  | "trade_in"
  | "custom_request"
  | "car_wash";

export interface WebLeadInput {
  leadType: LeadType;
  fullName: string;
  phone: string;
  email?: string;
  message?: string;
  carId?: string;
  preferredDate?: string;
  /** Free-form extra fields (trade-in vehicle info, custom request criteria, etc). */
  metadata?: Record<string, unknown>;
}
