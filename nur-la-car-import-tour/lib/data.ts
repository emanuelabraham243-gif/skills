import { getSupabaseClient } from "./supabase/client";
import { mockCars, mockReviews, mockTours } from "./mock-data";
import type {
  Car,
  CarFilters,
  GalleryImage,
  Review,
  TourFilters,
  TourPackage,
} from "./types";

// Data access layer. Every function first tries Supabase (public, read-only,
// anon-key queries against tables that should have permissive RLS select
// policies for published/approved rows) and falls back to bundled mock data
// when Supabase isn't configured yet or a query fails. This keeps the site
// fully functional in preview/dev before real project credentials and
// inventory are supplied — see README.md "Supabase schema" for the assumed
// table shapes these mapping functions expect.

// ---- row -> domain mappers -------------------------------------------------

type GalleryImageRow = {
  id: string;
  url: string;
  alt: string | null;
  position: number;
};

function mapImage(row: GalleryImageRow): GalleryImage {
  return { id: row.id, url: row.url, alt: row.alt ?? "", position: row.position };
}

type CarRow = {
  id: string;
  slug: string;
  make: string;
  model: string;
  trim: string | null;
  year: number;
  price: number;
  currency: string;
  mileage_km: number;
  fuel_type: Car["fuelType"];
  transmission: Car["transmission"];
  body_type: Car["bodyType"];
  status: Car["status"];
  exterior_color: string;
  interior_color: string | null;
  engine: string | null;
  drivetrain: string | null;
  seats: number | null;
  doors: number | null;
  vin: string | null;
  condition_summary: string;
  spec_sheet_url: string | null;
  is_featured: boolean;
  created_at: string;
  car_images?: GalleryImageRow[];
};

function mapCar(row: CarRow): Car {
  return {
    id: row.id,
    slug: row.slug,
    make: row.make,
    model: row.model,
    trim: row.trim ?? undefined,
    year: row.year,
    price: row.price,
    currency: row.currency,
    mileageKm: row.mileage_km,
    fuelType: row.fuel_type,
    transmission: row.transmission,
    bodyType: row.body_type,
    status: row.status,
    exteriorColor: row.exterior_color,
    interiorColor: row.interior_color ?? undefined,
    engine: row.engine ?? undefined,
    drivetrain: row.drivetrain ?? undefined,
    seats: row.seats ?? undefined,
    doors: row.doors ?? undefined,
    vin: row.vin ?? undefined,
    conditionSummary: row.condition_summary,
    specSheetUrl: row.spec_sheet_url ?? undefined,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    images: (row.car_images ?? [])
      .slice()
      .sort((a, b) => a.position - b.position)
      .map(mapImage),
  };
}

const CAR_SELECT = "*, car_images(id, url, alt, position)";

// ---- cars -------------------------------------------------------------

export async function getAllCars(filters: CarFilters = {}): Promise<Car[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      let query = supabase.from("cars").select(CAR_SELECT);
      if (filters.make) query = query.eq("make", filters.make);
      if (filters.model) query = query.eq("model", filters.model);
      if (filters.yearMin) query = query.gte("year", filters.yearMin);
      if (filters.yearMax) query = query.lte("year", filters.yearMax);
      if (filters.priceMin) query = query.gte("price", filters.priceMin);
      if (filters.priceMax) query = query.lte("price", filters.priceMax);
      if (filters.mileageMax) query = query.lte("mileage_km", filters.mileageMax);
      if (filters.fuelType) query = query.eq("fuel_type", filters.fuelType);
      if (filters.transmission) query = query.eq("transmission", filters.transmission);
      if (filters.bodyType) query = query.eq("body_type", filters.bodyType);
      if (filters.status) query = query.eq("status", filters.status);
      if (filters.query) {
        query = query.or(
          `make.ilike.%${filters.query}%,model.ilike.%${filters.query}%`,
        );
      }
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return (data as CarRow[]).map(mapCar);
    } catch {
      // fall through to mock data below
    }
  }
  return filterMockCars(filters);
}

function filterMockCars(filters: CarFilters): Car[] {
  return mockCars.filter((car) => {
    if (filters.make && car.make !== filters.make) return false;
    if (filters.model && car.model !== filters.model) return false;
    if (filters.yearMin && car.year < filters.yearMin) return false;
    if (filters.yearMax && car.year > filters.yearMax) return false;
    if (filters.priceMin && car.price < filters.priceMin) return false;
    if (filters.priceMax && car.price > filters.priceMax) return false;
    if (filters.mileageMax && car.mileageKm > filters.mileageMax) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
    if (filters.status && car.status !== filters.status) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const haystack = `${car.make} ${car.model} ${car.trim ?? ""}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export async function getFeaturedCars(limit = 6): Promise<Car[]> {
  const all = await getAllCars();
  const featured = all.filter((c) => c.isFeatured && c.status !== "sold");
  const rest = all.filter((c) => !c.isFeatured && c.status !== "sold");
  return [...featured, ...rest].slice(0, limit);
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select(CAR_SELECT)
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return mapCar(data as CarRow);
    } catch {
      // fall through to mock data below
    }
  }
  return mockCars.find((c) => c.slug === slug) ?? null;
}

export async function getSimilarCars(car: Car, limit = 3): Promise<Car[]> {
  const all = await getAllCars();
  return all
    .filter((c) => c.id !== car.id && c.status !== "sold")
    .map((c) => ({
      car: c,
      score:
        (c.bodyType === car.bodyType ? 2 : 0) +
        (c.make === car.make ? 2 : 0) +
        (Math.abs(c.price - car.price) < car.price * 0.25 ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.car);
}

export function getMakes(cars: Car[]): string[] {
  return Array.from(new Set(cars.map((c) => c.make))).sort();
}

// ---- tours ------------------------------------------------------------

type TourRow = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  category: TourPackage["category"];
  duration_days: number;
  group_size_max: number;
  difficulty: TourPackage["difficulty"];
  price: number;
  currency: string;
  summary: string;
  itinerary: TourPackage["itinerary"];
  inclusions: string[];
  exclusions: string[];
  is_featured: boolean;
  created_at: string;
  tour_images?: GalleryImageRow[];
};

function mapTour(row: TourRow): TourPackage {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    destination: row.destination,
    category: row.category,
    durationDays: row.duration_days,
    groupSizeMax: row.group_size_max,
    difficulty: row.difficulty,
    price: row.price,
    currency: row.currency,
    summary: row.summary,
    itinerary: row.itinerary,
    inclusions: row.inclusions,
    exclusions: row.exclusions,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    images: (row.tour_images ?? [])
      .slice()
      .sort((a, b) => a.position - b.position)
      .map(mapImage),
  };
}

const TOUR_SELECT = "*, tour_images(id, url, alt, position)";

export async function getAllTours(filters: TourFilters = {}): Promise<TourPackage[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      let query = supabase.from("tours").select(TOUR_SELECT);
      if (filters.category) query = query.eq("category", filters.category);
      if (filters.difficulty) query = query.eq("difficulty", filters.difficulty);
      if (filters.durationMax) query = query.lte("duration_days", filters.durationMax);
      if (filters.priceMax) query = query.lte("price", filters.priceMax);
      if (filters.query) {
        query = query.or(
          `title.ilike.%${filters.query}%,destination.ilike.%${filters.query}%`,
        );
      }
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return (data as TourRow[]).map(mapTour);
    } catch {
      // fall through to mock data below
    }
  }
  return filterMockTours(filters);
}

function filterMockTours(filters: TourFilters): TourPackage[] {
  return mockTours.filter((tour) => {
    if (filters.category && tour.category !== filters.category) return false;
    if (filters.difficulty && tour.difficulty !== filters.difficulty) return false;
    if (filters.durationMax && tour.durationDays > filters.durationMax) return false;
    if (filters.priceMax && tour.price > filters.priceMax) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const haystack = `${tour.title} ${tour.destination}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export async function getFeaturedTours(limit = 6): Promise<TourPackage[]> {
  const all = await getAllTours();
  const featured = all.filter((t) => t.isFeatured);
  const rest = all.filter((t) => !t.isFeatured);
  return [...featured, ...rest].slice(0, limit);
}

export async function getTourBySlug(slug: string): Promise<TourPackage | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("tours")
        .select(TOUR_SELECT)
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return mapTour(data as TourRow);
    } catch {
      // fall through to mock data below
    }
  }
  return mockTours.find((t) => t.slug === slug) ?? null;
}

export async function getSimilarTours(tour: TourPackage, limit = 3): Promise<TourPackage[]> {
  const all = await getAllTours();
  return all
    .filter((t) => t.id !== tour.id)
    .map((t) => ({
      tour: t,
      score:
        (t.category === tour.category ? 2 : 0) +
        (Math.abs(t.durationDays - tour.durationDays) <= 1 ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.tour);
}

// ---- reviews ------------------------------------------------------------

type ReviewRow = {
  id: string;
  customer_name: string;
  rating: number;
  body: string;
  item_label: string | null;
  created_at: string;
};

export async function getApprovedReviews(): Promise<Review[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as ReviewRow[]).map((r) => ({
        id: r.id,
        customerName: r.customer_name,
        rating: r.rating,
        body: r.body,
        itemLabel: r.item_label ?? undefined,
        createdAt: r.created_at,
      }));
    } catch {
      // fall through to mock data below
    }
  }
  return mockReviews;
}
