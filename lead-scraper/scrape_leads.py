#!/usr/bin/env python3
"""
Lead scraper: finds car importers and furniture businesses with a good
star rating but a missing or broken website, using the Google Places API.

Usage:
    export GOOGLE_PLACES_API_KEY="your-key-here"
    python scrape_leads.py --location "Addis Ababa, Ethiopia" --output leads.csv

Requires: requests  (pip install requests)
"""

import argparse
import csv
import os
import sys
import time
import requests

TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json"

DEFAULT_QUERIES = [
    ("car importer", "car_importer"),
    ("used car dealer", "car_importer"),
    ("car dealer", "car_importer"),
    ("furniture store", "furniture"),
    ("furniture shop", "furniture"),
    ("furniture manufacturer", "furniture"),
]

DETAILS_FIELDS = ",".join([
    "name",
    "formatted_address",
    "formatted_phone_number",
    "international_phone_number",
    "rating",
    "user_ratings_total",
    "website",
    "url",
    "business_status",
])


def text_search(query, location, api_key, session, max_pages=3):
    """Yield place_ids for a text search query, following pagination."""
    params = {"query": f"{query} in {location}", "key": api_key}
    seen = []
    for page in range(max_pages):
        resp = session.get(TEXT_SEARCH_URL, params=params, timeout=15)
        data = resp.json()
        status = data.get("status")
        if status not in ("OK", "ZERO_RESULTS"):
            print(f"  [warn] text search '{query}' page {page}: {status} "
                  f"{data.get('error_message', '')}", file=sys.stderr)
            break
        for result in data.get("results", []):
            seen.append(result["place_id"])
        next_token = data.get("next_page_token")
        if not next_token:
            break
        # Google requires a short delay before a page token becomes valid.
        time.sleep(2)
        params = {"pagetoken": next_token, "key": api_key}
    return seen


def get_details(place_id, api_key, session):
    params = {"place_id": place_id, "fields": DETAILS_FIELDS, "key": api_key}
    resp = session.get(DETAILS_URL, params=params, timeout=15)
    data = resp.json()
    if data.get("status") != "OK":
        return None
    return data.get("result", {})


def check_website(url, session, timeout=10):
    """Return (is_broken: bool, status_note: str)."""
    try:
        resp = session.get(url, timeout=timeout, allow_redirects=True,
                            headers={"User-Agent": "Mozilla/5.0 (lead-scraper)"})
        if resp.status_code >= 400:
            return True, f"HTTP {resp.status_code}"
        return False, f"HTTP {resp.status_code}"
    except requests.exceptions.SSLError as e:
        return True, "SSL error"
    except requests.exceptions.Timeout:
        return True, "timeout"
    except requests.exceptions.ConnectionError:
        return True, "connection error"
    except requests.exceptions.RequestException as e:
        return True, f"request error: {type(e).__name__}"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--location", default="Addis Ababa, Ethiopia",
                         help="City/region to search (default: Addis Ababa, Ethiopia)")
    parser.add_argument("--min-rating", type=float, default=3.0,
                         help="Minimum star rating, exclusive (default: 3.0, i.e. >3 stars)")
    parser.add_argument("--output", default="leads.csv", help="Output CSV path")
    parser.add_argument("--api-key", default=os.environ.get("GOOGLE_PLACES_API_KEY"),
                         help="Google Places API key (or set GOOGLE_PLACES_API_KEY env var)")
    parser.add_argument("--max-pages", type=int, default=3,
                         help="Max result pages (20 results each) per query")
    parser.add_argument("--timeout", type=int, default=10,
                         help="Website request timeout in seconds")
    args = parser.parse_args()

    if not args.api_key:
        print("Error: no API key. Pass --api-key or set GOOGLE_PLACES_API_KEY.",
              file=sys.stderr)
        sys.exit(1)

    session = requests.Session()
    seen_place_ids = set()
    leads = []

    for query, category in DEFAULT_QUERIES:
        print(f"Searching: {query} in {args.location} ...")
        place_ids = text_search(query, args.location, args.api_key, session,
                                 max_pages=args.max_pages)
        print(f"  found {len(place_ids)} results")

        for place_id in place_ids:
            if place_id in seen_place_ids:
                continue
            seen_place_ids.add(place_id)

            details = get_details(place_id, args.api_key, session)
            if not details:
                continue

            rating = details.get("rating")
            review_count = details.get("user_ratings_total", 0)
            website = details.get("website")

            if rating is None or rating <= args.min_rating:
                continue

            if website:
                is_broken, status_note = check_website(website, session, timeout=args.timeout)
                if not is_broken:
                    continue
                website_status = f"broken ({status_note})"
            else:
                website_status = "no website"

            leads.append({
                "name": details.get("name", ""),
                "category": category,
                "address": details.get("formatted_address", ""),
                "phone": details.get("international_phone_number")
                         or details.get("formatted_phone_number", ""),
                "rating": rating,
                "review_count": review_count,
                "website": website or "",
                "website_status": website_status,
                "google_maps_url": details.get("url", ""),
            })
            print(f"  LEAD: {details.get('name')} - rating {rating} "
                  f"({review_count} reviews) - {website_status}")

            # Stay well under Google's QPS limits.
            time.sleep(0.1)

    fieldnames = ["name", "category", "address", "phone", "rating",
                  "review_count", "website", "website_status", "google_maps_url"]
    with open(args.output, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(leads)

    print(f"\nDone. {len(leads)} qualifying leads written to {args.output}")


if __name__ == "__main__":
    main()
