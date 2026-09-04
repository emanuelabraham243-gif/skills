import type { Metadata } from "next";
import LeadForm from "@/components/forms/LeadForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Trade In Your Car",
  description: "Get a valuation for your current vehicle and trade it in toward your next car.",
};

export default function TradeInPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Trade-In"
            title="Trade in your current car"
            description="Tell us about your vehicle and we'll come back with a fair valuation, usually within 1–2 business days. You can put the value toward any car in our stock."
          />

          <div className="mt-8 space-y-5 text-sm text-ink-soft">
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/30 text-xs font-medium text-accent">1</span>
              <p>Submit your vehicle details below — the more accurate, the better the initial estimate.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/30 text-xs font-medium text-accent">2</span>
              <p>We&rsquo;ll follow up to schedule a quick in-person inspection at our lot.</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/30 text-xs font-medium text-accent">3</span>
              <p>We confirm a final offer, which you can apply directly toward your next purchase.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <LeadForm
            leadType="trade_in"
            submitLabel="Request Valuation"
            fields={[
              { name: "email", label: "Email (optional)", type: "email", mapsTo: "email" },
              { name: "make", label: "Make", type: "text", required: true, placeholder: "e.g. Toyota" },
              { name: "model", label: "Model", type: "text", required: true, placeholder: "e.g. Corolla" },
              { name: "year", label: "Year", type: "text", required: true, placeholder: "e.g. 2018" },
              { name: "mileage", label: "Mileage (km)", type: "text", required: true, placeholder: "e.g. 65000" },
              { name: "condition", label: "Overall condition", type: "select", required: true, options: ["Excellent", "Good", "Fair", "Needs work"] },
              { name: "message", label: "Anything else about the car?", type: "textarea", mapsTo: "message" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
