import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Our Process",
  description: "How buying an imported car works, and how a tour booking comes together, from first message to handover or departure.",
};

const carSteps = [
  {
    step: "01",
    title: "Tell us what you need",
    body: "Browse our current stock, or if nothing fits, submit a custom vehicle request with your make, model, budget and must-haves.",
  },
  {
    step: "02",
    title: "We source and inspect",
    body: "The vehicle is sourced, imported, and cleared through customs, then goes through a full mechanical and cosmetic inspection before listing.",
  },
  {
    step: "03",
    title: "Listed with full photos and an honest summary",
    body: "The car goes live with a complete photo gallery and a plain-language condition summary — no jargon, no surprises.",
  },
  {
    step: "04",
    title: "Test drive or reserve",
    body: "Book a test drive, or place a reservation to hold the car while you finalize financing or travel to view it.",
  },
  {
    step: "05",
    title: "Paperwork and handover",
    body: "We handle title transfer and registration paperwork with you, then hand over the keys.",
  },
];

const tourSteps = [
  {
    step: "01",
    title: "Pick a package or tell us your dates",
    body: "Browse our tour packages, or send us your travel dates, group size, and interests through a booking request.",
  },
  {
    step: "02",
    title: "We confirm availability and pricing",
    body: "Our team checks guide and vehicle availability for your dates and confirms final pricing, usually within a day.",
  },
  {
    step: "03",
    title: "Deposit and itinerary confirmation",
    body: "A deposit secures your dates. We send a confirmed day-by-day itinerary with what's included and what to bring.",
  },
  {
    step: "04",
    title: "Departure",
    body: "Your guide and driver meet you on day one — the rest of the itinerary is handled for you from there.",
  },
];

function StepList({ steps }: { steps: typeof carSteps }) {
  return (
    <ol className="mt-8 space-y-0">
      {steps.map((s, i) => (
        <li key={s.step} className="relative flex gap-5 pb-8 last:pb-0 sm:gap-8">
          {i < steps.length - 1 && (
            <span className="absolute left-[23px] top-12 h-full w-px bg-line sm:left-[27px]" aria-hidden />
          )}
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-base text-paper sm:h-[54px] sm:w-[54px] sm:text-lg">
            {s.step}
          </span>
          <div className="pt-1">
            <h3 className="font-display text-lg text-ink sm:text-xl">{s.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ProcessPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow="How it works"
        title="Two services, one transparent process"
        description="Whether you're buying a car or booking a tour, here's exactly what happens, start to finish."
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-10">
        <div>
          <h2 className="font-display text-xl text-ink sm:text-2xl">Buying a car</h2>
          <StepList steps={carSteps} />
        </div>
        <div>
          <h2 className="font-display text-xl text-ink sm:text-2xl">Booking a tour</h2>
          <StepList steps={tourSteps} />
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-line bg-surface p-8 text-center sm:p-10">
        <h2 className="font-display text-xl text-ink sm:text-2xl">Ready to get started?</h2>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/cars" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-accent">
            Browse Available Cars
          </Link>
          <Link href="/tours" className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink hover:border-accent hover:text-accent">
            Browse Tour Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
