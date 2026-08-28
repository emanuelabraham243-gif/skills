"use client";

import { useState } from "react";
import LeadForm from "./forms/LeadForm";
import { whatsappLink } from "@/lib/site-config";
import type { Car } from "@/lib/types";

type PanelKind = "test_drive" | "interest" | "waitlist" | "notify" | null;

export default function CarCTA({ car }: { car: Car }) {
  const [panel, setPanel] = useState<PanelKind>(null);
  const carLabel = `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ""}`;
  const meta = { carLabel };

  const buttonClass =
    "rounded-full px-6 py-3.5 text-sm font-medium transition-colors sm:text-base";
  const primaryClass = `${buttonClass} bg-ink text-paper hover:bg-accent`;
  const secondaryClass = `${buttonClass} border border-line text-ink hover:border-accent hover:text-accent`;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        {car.status === "available" && (
          <>
            <button type="button" onClick={() => setPanel(panel === "test_drive" ? null : "test_drive")} className={primaryClass}>
              Book Test Drive
            </button>
            <button type="button" onClick={() => setPanel(panel === "interest" ? null : "interest")} className={secondaryClass}>
              I&rsquo;m Interested
            </button>
          </>
        )}

        {car.status === "reserved" && (
          <button type="button" onClick={() => setPanel(panel === "waitlist" ? null : "waitlist")} className={primaryClass}>
            Reserved — Join Waitlist
          </button>
        )}

        {car.status === "on_test_drive" && (
          <a
            href={whatsappLink(`Hi! Is the ${carLabel} still available? I saw it's currently on a test drive.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryClass}
          >
            Ask on WhatsApp
          </a>
        )}

        {car.status === "coming_soon" && (
          <button type="button" onClick={() => setPanel(panel === "notify" ? null : "notify")} className={primaryClass}>
            Notify Me
          </button>
        )}

        {car.status === "sold" && (
          <span className={`${buttonClass} bg-paper-dim text-ink-soft`}>This car has been sold</span>
        )}
      </div>

      {panel && (
        <div className="mt-5 rounded-2xl border border-line bg-surface p-5 sm:p-6">
          {panel === "test_drive" && (
            <>
              <h3 className="mb-1 font-display text-lg text-ink">Book a test drive</h3>
              <p className="mb-4 text-sm text-ink-soft">Tell us when works for you — we&rsquo;ll confirm by phone or WhatsApp.</p>
              <LeadForm
                leadType="test_drive"
                carId={car.id}
                staticMetadata={meta}
                submitLabel="Request Test Drive"
                fields={[
                  { name: "preferredDate", label: "Preferred date", type: "date", mapsTo: "preferredDate" },
                  { name: "message", label: "Anything else we should know?", type: "textarea", mapsTo: "message" },
                ]}
              />
            </>
          )}

          {panel === "interest" && (
            <>
              <h3 className="mb-1 font-display text-lg text-ink">I&rsquo;m interested</h3>
              <p className="mb-4 text-sm text-ink-soft">Leave your details and questions — our team will follow up with everything you need.</p>
              <LeadForm
                leadType="interest"
                carId={car.id}
                staticMetadata={meta}
                submitLabel="Send Inquiry"
                fields={[
                  { name: "email", label: "Email (optional)", type: "email", mapsTo: "email" },
                  { name: "message", label: "Your question", type: "textarea", mapsTo: "message" },
                ]}
              />
            </>
          )}

          {panel === "waitlist" && (
            <>
              <h3 className="mb-1 font-display text-lg text-ink">Join the waitlist</h3>
              <p className="mb-4 text-sm text-ink-soft">This car is currently reserved. We&rsquo;ll contact you first if it becomes available again.</p>
              <LeadForm
                leadType="waitlist"
                carId={car.id}
                staticMetadata={meta}
                submitLabel="Join Waitlist"
                fields={[{ name: "email", label: "Email (optional)", type: "email", mapsTo: "email" }]}
              />
            </>
          )}

          {panel === "notify" && (
            <>
              <h3 className="mb-1 font-display text-lg text-ink">Get notified</h3>
              <p className="mb-4 text-sm text-ink-soft">We&rsquo;ll message you as soon as this car is listed and ready to view.</p>
              <LeadForm
                leadType="notify_me"
                carId={car.id}
                staticMetadata={meta}
                submitLabel="Notify Me"
                fields={[{ name: "email", label: "Email (optional)", type: "email", mapsTo: "email" }]}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
