import type { Metadata } from "next";
import LeadForm from "@/components/forms/LeadForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Request a Vehicle",
  description: "Don't see the right car in stock? Tell us what you're looking for and we'll source it for you.",
};

export default function CustomRequestPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Custom Request"
            title="Can't find it in stock? We'll source it."
            description="Give us your ideal make, model, budget and timeline, and our sourcing team will find a match through our import network — often before it's publicly listed."
          />

          <div className="mt-8 space-y-5 text-sm text-ink-soft">
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/30 text-xs font-medium text-accent">1</span>
              <p>Share your criteria — the more specific, the faster we can match.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/30 text-xs font-medium text-accent">2</span>
              <p>We&rsquo;ll respond with sourcing options and an estimated landed price and timeline.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/30 text-xs font-medium text-accent">3</span>
              <p>Once you approve, we handle purchase, shipping, and customs clearance — see our Process page.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <LeadForm
            leadType="custom_request"
            submitLabel="Submit Request"
            fields={[
              { name: "email", label: "Email (optional)", type: "email", mapsTo: "email" },
              { name: "make", label: "Preferred make", type: "text", placeholder: "e.g. Toyota" },
              { name: "model", label: "Preferred model", type: "text", placeholder: "e.g. RAV4" },
              { name: "yearRange", label: "Year range", type: "text", placeholder: "e.g. 2019–2022" },
              { name: "budget", label: "Budget (ETB)", type: "text", required: true, placeholder: "e.g. up to 6,500,000" },
              { name: "bodyType", label: "Body type", type: "select", options: ["Sedan", "SUV", "Hatchback", "Pickup", "Van", "Coupe", "Crossover", "No preference"] },
              { name: "message", label: "Anything else we should know?", type: "textarea", mapsTo: "message", placeholder: "Color, transmission, fuel type, timeline…" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
