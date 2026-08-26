import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Our Process",
  description: "How buying an imported car works, from sourcing and customs clearance to handover and after-sale support.",
};

const steps = [
  {
    step: "01",
    title: "Tell us what you need",
    body: "Browse our current stock, or if nothing fits, submit a custom vehicle request with your make, model, budget and must-haves. We'll confirm sourcing timelines and an estimated landed cost.",
  },
  {
    step: "02",
    title: "We source and buy",
    body: "Our team sources the vehicle from vetted overseas auctions and dealers, checking auction-grade reports and history before purchase.",
  },
  {
    step: "03",
    title: "Shipping and customs clearance",
    body: "The car is shipped to port, then cleared through Ethiopian customs — duties, taxes and documentation handled on our end. This is typically the longest stage of the process.",
  },
  {
    step: "04",
    title: "Inspection and detailing",
    body: "Every arrival goes through a full mechanical and cosmetic inspection, any needed servicing, and a professional detail before it's photographed.",
  },
  {
    step: "05",
    title: "Listed with full photos and an honest summary",
    body: "The car goes live on our site with a complete photo gallery and a plain-language public condition summary — no internal jargon, no surprises.",
  },
  {
    step: "06",
    title: "Test drive or reserve",
    body: "Book a test drive at our lot, or place a reservation to hold the car while you finalize financing or travel to view it.",
  },
  {
    step: "07",
    title: "Financing and insurance",
    body: "If needed, we introduce you directly to our banking and insurance partners for financing and cover — see our Partners page.",
  },
  {
    step: "08",
    title: "Paperwork and handover",
    body: "We handle title transfer and registration paperwork with you, then hand over the keys — plus a complimentary wash and detail on delivery.",
  },
];

export default function ProcessPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow="How it works"
        title="From sourcing to handover"
        description="Buying a car sight-unseen only works if the process is transparent at every stage. Here's exactly what happens, start to finish."
      />

      <ol className="mt-12 space-y-0">
        {steps.map((s, i) => (
          <li key={s.step} className="relative flex gap-6 pb-10 last:pb-0 sm:gap-10">
            {i < steps.length - 1 && (
              <span className="absolute left-[27px] top-14 h-full w-px bg-line sm:left-[35px]" aria-hidden />
            )}
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg text-paper sm:h-[70px] sm:w-[70px] sm:text-xl">
              {s.step}
            </span>
            <div className="pt-1.5">
              <h2 className="font-display text-xl text-ink sm:text-2xl">{s.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-2xl border border-line bg-white p-8 text-center sm:p-10">
        <h2 className="font-display text-xl text-ink sm:text-2xl">Ready to get started?</h2>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/cars" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-accent">
            Browse Available Cars
          </Link>
          <Link href="/custom-request" className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink hover:border-accent hover:text-accent">
            Request a Specific Car
          </Link>
        </div>
      </div>
    </div>
  );
}
