# NUR LA Car Import & Tour Operation — Website

Public marketing site for an Addis Ababa-based business that both imports
and sells vehicles, and operates guided tours across Ethiopia. Built with
Next.js (App Router), Tailwind CSS, and the Supabase JS client.

Business details (address, phone, hours) in `lib/site-config.ts` are sourced
from the business's Google Business listing; email is a placeholder pending
the real one.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in real values once you have them
npm run dev
```

The site is fully browsable **without** Supabase credentials — every data
function in `lib/data.ts` falls back to bundled sample data
(`lib/mock-data.ts`) when `NEXT_PUBLIC_SUPABASE_URL` /
`NEXT_PUBLIC_SUPABASE_ANON_KEY` aren't set, or when a query fails.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** — custom teal/gold theme, light + dark palettes
- **@supabase/supabase-js** — public anon-key client only; no service role key
  is used or should ever be shipped to the browser
- Fonts: Spectral (display/serif) + Manrope (body), via `next/font/google`

## Project structure

```
app/                       route segments (one folder per page)
  cars/                    car listing page (filters via searchParams)
  cars/[slug]/             car detail page
  tours/                   tour package listing page (filters via searchParams)
  tours/[slug]/            tour package detail page (itinerary, inclusions)
  trade-in/, custom-request/, plan-a-tour/, process/, about/, reviews/, faq/
components/                shared UI (CarCard, TourCard, Gallery, forms…)
components/forms/          LeadForm — the one generic form all lead capture
                            flows (cars and tours alike) go through
lib/
  types.ts                 domain types (Car, TourPackage, Review, WebLeadInput…)
  supabase/client.ts        anon-key Supabase client factory
  data.ts                  data access layer (Supabase first, mock fallback)
  mock-data.ts             sample inventory/tours/reviews for local dev
  leads.ts                 submitWebLead() — the single place that calls the
                            submit_web_lead RPC
  site-config.ts           business name, WhatsApp number, contact info
scripts/
  generate-placeholder-images.mjs   regenerates the duotone SVG placeholder
                                     car photography under public/cars/
  generate-tour-images.mjs         regenerates the duotone SVG placeholder
                                     tour photography under public/tours/
  generate-spec-sheets.mjs         regenerates the sample PDF spec sheets
                                     under public/spec-sheets/
```

## Wiring up Supabase (do this next)

1. Copy `.env.local.example` to `.env.local` and fill in
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the
   real project.
2. Create tables matching the shape `lib/data.ts` expects (see **Supabase
   schema** below), or adjust the mapping functions in `lib/data.ts` to match
   whatever schema already exists.
3. Update the single `supabase.rpc("submit_web_lead", { ... })` call in
   `lib/leads.ts` to match the real RPC signature. Every lead-generating form
   on the site (test drive, "I'm interested", waitlist, notify me, trade-in,
   custom vehicle request, tour booking inquiry) already funnels through
   `submitWebLead()`, so that's the only file that needs to change.

### Supabase schema (assumed — adjust to match reality)

```sql
create table cars (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  make text not null,
  model text not null,
  trim text,
  year int not null,
  price numeric not null,
  currency text not null default 'ETB',
  mileage_km int not null,
  fuel_type text not null,        -- petrol | diesel | hybrid | electric
  transmission text not null,     -- automatic | manual
  body_type text not null,        -- sedan | suv | hatchback | pickup | van | coupe | crossover
  status text not null,           -- available | reserved | on_test_drive | sold | coming_soon
  exterior_color text not null,
  interior_color text,
  engine text,
  drivetrain text,
  seats int,
  doors int,
  vin text,
  condition_summary text not null,  -- public, approved summary only — never internal inspection notes
  spec_sheet_url text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table car_images (
  id uuid primary key default gen_random_uuid(),
  car_id uuid references cars(id) on delete cascade,
  url text not null,
  alt text,
  position int not null default 0   -- 0 = primary image, shown first
);

create table tours (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  destination text not null,
  category text not null,          -- historical | nature | wildlife | religious | adventure | cultural | city
  duration_days int not null,
  group_size_max int not null,
  difficulty text not null,        -- easy | moderate | challenging
  price numeric not null,
  currency text not null default 'ETB',
  summary text not null,
  itinerary jsonb not null,        -- [{ day, title, description }, ...]
  inclusions text[] not null default '{}',
  exclusions text[] not null default '{}',
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table tour_images (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid references tours(id) on delete cascade,
  url text not null,
  alt text,
  position int not null default 0   -- 0 = primary image, shown first
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  rating int not null,
  body text not null,
  item_label text,          -- e.g. "2022 Toyota RAV4" or "Simien Mountains Trek"
  is_approved boolean not null default false,  -- only approved rows are queried
  created_at timestamptz not null default now()
);

-- Called via RPC only — no direct client inserts into leads/customers.
-- Replace this signature with the real one once provided; then update the
-- single call site in lib/leads.ts.
create or replace function submit_web_lead(
  p_lead_type text,
  p_full_name text,
  p_phone text,
  p_email text default null,
  p_message text default null,
  p_car_id uuid default null,
  p_tour_id uuid default null,
  p_preferred_date date default null,
  p_metadata jsonb default null,
  p_source text default 'website'
) returns void
language plpgsql
security definer
as $$
begin
  -- insert into leads / customers here, server-side, with whatever
  -- dedup / validation logic is needed
end;
$$;
```

Row-level security should allow anonymous `select` on `cars`, `car_images`,
`tours`, `tour_images`, and `reviews` (filtered to `is_approved = true`), and
should **not** grant anonymous insert on `leads` or `customers` — all writes
go through the `submit_web_lead` RPC (ideally `security definer`).

## Sample content

- `lib/mock-data.ts` ships 8 sample cars covering every status (available,
  reserved, on test drive, sold, coming soon) and 6 sample Ethiopia tour
  packages, so all CTA variants and status badges can be reviewed without
  real inventory.
- Car and tour photography is placeholder duotone SVG art (`public/cars/`,
  `public/tours/`), generated by `node scripts/generate-placeholder-images.mjs`
  and `node scripts/generate-tour-images.mjs` — deliberately abstract rather
  than stock photography. Swap for real photos via Supabase storage once
  available; `car_images.url` / `tour_images.url` can point anywhere.
- Spec sheet PDFs (`public/spec-sheets/`) are placeholder documents generated
  by `node scripts/generate-spec-sheets.mjs`, so the download CTA is
  functional in preview.

## Scripts

```bash
npm run dev      # local dev server (regenerates placeholder assets first)
npm run build    # production build (regenerates placeholder assets first)
npm run start    # run the production build
npm run lint     # eslint
```
