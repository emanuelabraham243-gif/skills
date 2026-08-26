import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Car Wash & Detailing",
  description: "Book professional car wash and detailing packages at our lot in Addis Ababa.",
};

const packages = [
  {
    name: "Express Wash",
    price: "ETB 400",
    duration: "20 min",
    features: ["Exterior hand wash", "Tire shine", "Window clean", "Quick vacuum"],
  },
  {
    name: "Full Detail",
    price: "ETB 1,200",
    duration: "90 min",
    features: ["Everything in Express", "Interior deep clean", "Dashboard & console treatment", "Leather/upholstery care", "Wax finish"],
    highlighted: true,
  },
  {
    name: "Premium Detail",
    price: "ETB 2,200",
    duration: "3 hrs",
    features: ["Everything in Full Detail", "Engine bay clean", "Paint decontamination", "Ceramic spray sealant", "Odor treatment"],
  },
];

export default function CarWashPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow="Car Wash & Detailing"
        title="Keep it showroom-ready"
        description="Every car we sell gets a full detail before delivery — the same service is available to book for your current vehicle."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`flex flex-col rounded-2xl border p-6 ${
              pkg.highlighted ? "border-accent bg-white shadow-lg shadow-accent/10" : "border-line bg-white"
            }`}
          >
            {pkg.highlighted && (
              <span className="mb-3 w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-ink">
                Most popular
              </span>
            )}
            <h3 className="font-display text-xl text-ink">{pkg.name}</h3>
            <p className="mt-1 text-sm text-ink-soft">{pkg.duration}</p>
            <p className="mt-4 font-display text-2xl text-ink">{pkg.price}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-line bg-white p-6 sm:p-8">
        <h2 className="font-display text-xl text-ink">Book a wash</h2>
        <p className="mt-1 text-sm text-ink-soft">Walk-ins welcome, but booking ahead guarantees your slot.</p>
        <div className="mt-6">
          <LeadForm
            leadType="car_wash"
            submitLabel="Book Now"
            fields={[
              {
                name: "package",
                label: "Package",
                type: "select",
                required: true,
                options: ["Express Wash", "Full Detail", "Premium Detail"],
              },
              { name: "preferredDate", label: "Preferred date", type: "date", mapsTo: "preferredDate" },
              { name: "message", label: "Vehicle details / notes", type: "textarea", mapsTo: "message" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
