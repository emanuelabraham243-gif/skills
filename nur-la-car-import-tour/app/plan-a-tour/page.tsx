import type { Metadata } from "next";
import LeadForm from "@/components/forms/LeadForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Plan a Custom Tour",
  description: "Don't see the right itinerary? Tell us your destinations, dates and group size and we'll build a custom tour.",
};

export default function PlanTourPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Custom Tour"
            title="Want a different itinerary? We'll build it."
            description="Combine destinations, adjust the pace, or set a specific budget — tell us what you have in mind and we'll put together a tailored route."
          />

          <div className="mt-8 space-y-5 text-sm text-ink-soft">
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/30 text-xs font-medium text-accent">1</span>
              <p>Share your destinations, dates, group size and budget — the more detail, the better the first draft.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/30 text-xs font-medium text-accent">2</span>
              <p>We&rsquo;ll respond with a proposed day-by-day itinerary and pricing, usually within a day or two.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/30 text-xs font-medium text-accent">3</span>
              <p>Once you approve, a deposit secures your dates and guide.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <LeadForm
            leadType="custom_request"
            submitLabel="Submit Request"
            fields={[
              { name: "email", label: "Email (optional)", type: "email", mapsTo: "email" },
              { name: "destinations", label: "Destinations of interest", type: "text", required: true, placeholder: "e.g. Lalibela, Simien Mountains" },
              { name: "preferredDate", label: "Preferred start date", type: "date", mapsTo: "preferredDate" },
              { name: "durationDays", label: "Trip length (days)", type: "number", placeholder: "e.g. 7" },
              { name: "groupSize", label: "Group size", type: "number", placeholder: "e.g. 4" },
              { name: "budget", label: "Budget per person (ETB)", type: "text", placeholder: "e.g. up to 60,000" },
              { name: "message", label: "Anything else we should know?", type: "textarea", mapsTo: "message", placeholder: "Interests, pace, accessibility needs…" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
