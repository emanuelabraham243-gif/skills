# Lead Scraper: Car Importers & Furniture Businesses

Finds local businesses (car importers/dealers and furniture stores) that are
good sales leads: they have a decent star rating but **no website, or a
website that's broken**.

Uses the [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
(Text Search + Place Details), which is the legitimate, ToS-compliant way to
pull structured business data — no HTML scraping of Google Maps or Yelp
pages involved.

## Setup

1. Get a Google Cloud API key with the **Places API** enabled:
   https://console.cloud.google.com/google/maps-apis/credentials
   (Google gives a recurring monthly free credit; check current pricing at
   https://mapsplatform.google.com/pricing/ before running large searches.)

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set your API key:
   ```bash
   export GOOGLE_PLACES_API_KEY="your-key-here"
   ```

## Usage

```bash
python scrape_leads.py --location "Addis Ababa, Ethiopia" --output leads.csv
```

Options:

| Flag | Default | Description |
|---|---|---|
| `--location` | `Addis Ababa, Ethiopia` | City/region to search |
| `--min-rating` | `3.0` | Minimum star rating, exclusive (keeps businesses rated **more than** this) |
| `--output` | `leads.csv` | Output CSV file path |
| `--max-pages` | `3` | Max pages of results per search query (20 results/page, Google's cap) |
| `--timeout` | `10` | Seconds to wait when checking if a website is reachable |
| `--api-key` | `$GOOGLE_PLACES_API_KEY` | Override the API key |

## What counts as a "lead"

A business is included in the output only if **both** are true:
- Star rating is **greater than** `--min-rating` (default: more than 3.0 stars)
- Either it has **no website** listed on Google, or its listed website
  **fails an HTTP check** (times out, refuses to connect, has an SSL error,
  or returns a 4xx/5xx status)

Businesses with a working website (any 2xx/3xx response) are skipped even
if they'd otherwise qualify — they're not a "no/broken website" lead.

## Output

A CSV with: `name, category, address, phone, rating, review_count, website,
website_status, google_maps_url`.

## Notes & limits

- Search categories are hardcoded in `DEFAULT_QUERIES` in `scrape_leads.py`
  (car importer, used car dealer, car dealer, furniture store, furniture
  shop, furniture manufacturer). Edit that list to broaden/narrow scope.
- Google Text Search caps each query at 60 results (3 pages of 20); very
  broad areas may need splitting into sub-locations (e.g. specific
  sub-cities/neighborhoods of Addis Ababa) to get full coverage.
- The website check only confirms the URL is broken/unreachable — it does
  not attempt to judge "looks unprofessional" or "outdated design", which
  isn't reliably automatable. Review flagged sites manually if you want to
  distinguish "down" from "just dated".
- Respect Google's Terms of Service and rate limits; this script paces
  requests conservatively but you're responsible for your own API usage/costs.
