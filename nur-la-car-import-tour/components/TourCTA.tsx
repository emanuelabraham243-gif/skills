"use client";

import { useState } from "react";
import LeadForm from "./forms/LeadForm";
import type { TourPackage } from "@/lib/types";

export default function TourCTA({ tour }: { tour: TourPackage }) {
  const [open, setOpen] = useState(false);
  const meta = { tourTitle: tour.title };

  const buttonClass = "rounded-full px-6 py-3.5 text-sm font-medium transition-colors sm:text-base";
  const primaryClass = `${buttonClass} bg-ink text-paper hover:bg-accent`;

  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)} className={primaryClass}>
        Request This Tour
      </button>

      {open && (
        <div className="mt-5 rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <h3 className="mb-1 font-display text-lg text-ink">Request a booking</h3>
          <p className="mb-4 text-sm text-ink-soft">
            Tell us your preferred dates and group size — we&rsquo;ll confirm availability and pricing by phone or WhatsApp.
          </p>
          <LeadForm
            leadType="tour_booking"
            tourId={tour.id}
            staticMetadata={meta}
            submitLabel="Request Booking"
            fields={[
              { name: "email", label: "Email (optional)", type: "email", mapsTo: "email" },
              { name: "preferredDate", label: "Preferred start date", type: "date", mapsTo: "preferredDate" },
              { name: "partySize", label: "Group size", type: "number", placeholder: "e.g. 2" },
              { name: "message", label: "Anything else we should know?", type: "textarea", mapsTo: "message" },
            ]}
          />
        </div>
      )}
    </div>
  );
}
