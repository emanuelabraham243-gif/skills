# Meskel Motors — Dealership Website

Public marketing site for an Ethiopia-based car dealership/importer. Built
with Next.js (App Router), Tailwind CSS, and the Supabase JS client.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in real values once you have them
npm run dev
```

The site is fully browsable **without** Supabase credentials — every data
function in `lib/data.ts` falls back to bundled sample data
(`lib/mock-data.ts`) when `NEXT_PUBLIC_SUPABASE_URL` /
`NEXT_PUBLIC_SUPABASE_ANON_KEY` aren't set, or when a query fails. This is
what's currently deployed in preview.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** — custom warm/earth-tone theme, no default template palette
- **@supabase/supabase-js** — public anon-key client only; no service role key
  is used or should ever be shipped to the browser
- Fonts: Fraunces (display/serif) + Inter (body), via `next/font/google`

## Project structure

```
app/                       route segments (one folder per page)
  cars/                    listing page (filters via searchParams)
  cars/[slug]/             car detail page
  trade-in/, custom-request/, car-wash/, process/, about/, partners/,
  reviews/, faq/
components/                shared UI (CarCard, Gallery, StatusBadge, forms…)
components/forms/          LeadForm — the one generic form all lead capture
                            flows go through
lib/
  types.ts                 domain types (Car, Review, Partner, WebLeadInput…)
  supabase/client.ts        anon-key Supabase client factory
  data.ts                  data access layer (Supabase first, mock fallback)
  mock-data.ts             sample inventory/reviews/partners for local dev
  leads.ts                 submitWebLead() — the single place that calls the
                            submit_web_lead RPC
  site-config.ts           business name, WhatsApp number, contact info
scripts/
  generate-placeholder-images.mjs   regenerates the duotone SVG placeholder
                                     photography under public/cars/
  generate-spec-sheets.mjs          regenerates the sample PDF spec sheets
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
   custom vehicle request, car wash booking) already funnels through
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

create table reviews (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  rating int not null,
  body text not null,
  car_label text,
  is_approved boolean not null default false,  -- only approved rows are queried
  created_at timestamptz not null default now()
);

create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,   -- bank | insurer | shipper | other
  logo_url text,
  website_url text
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
`reviews` (filtered to `is_approved = true`), and `partners`, and should
**not** grant anonymous insert on `leads` or `customers` — all writes go
through the `submit_web_lead` RPC (ideally `security definer`).

## Sample content

- `lib/mock-data.ts` ships 14 sample cars covering every status (available,
  reserved, on test drive, sold, coming soon) so all CTA variants and status
  badges can be reviewed without real inventory.
- Car photography is placeholder duotone SVG art (`public/cars/`), generated
  by `node scripts/generate-placeholder-images.mjs` — deliberately abstract
  rather than stock photography. Swap for real photos via Supabase storage
  once available; `car_images.url` can point anywhere.
- Spec sheet PDFs (`public/spec-sheets/`) are placeholder documents generated
  by `node scripts/generate-spec-sheets.mjs`, so the download CTA is
  functional in preview.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # eslint
```
