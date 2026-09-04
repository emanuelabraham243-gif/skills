import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about buying an imported car, financing, and our process.",
};

const faqs = [
  {
    question: "Can I really buy a car without seeing it in person first?",
    answer:
      "Yes — most of our customers reserve or pay a deposit based on our photo galleries and condition summaries, then visit for a test drive and final inspection before completing the purchase. Nothing is final until you've seen the car.",
  },
  {
    question: "How accurate are the condition summaries?",
    answer:
      "Every car is inspected by our team before listing, and the public summary is written from that inspection in plain language. We flag anything cosmetically notable — we'd rather you know upfront than be surprised at pickup.",
  },
  {
    question: "What's included in the price?",
    answer:
      "Listed prices include import duties and clearance already paid — the price you see is what you pay for the car. Financing, insurance and registration are separate and handled through our partners if you need them.",
  },
  {
    question: "How long does customs clearance take for a new import?",
    answer:
      "It varies by vehicle and season, but typically 4–8 weeks from purchase abroad to being listed on our lot. If you've submitted a custom request, we'll give you a timeline estimate upfront.",
  },
  {
    question: "Can I trade in my current car?",
    answer:
      "Yes. Submit a trade-in request with your vehicle's details and we'll get back to you with a valuation, usually within 1–2 business days.",
  },
  {
    question: "What happens if a car I'm interested in gets reserved?",
    answer:
      "You can join the waitlist for that specific car — we'll contact you first if the reservation falls through, and can also help you find a similar match in the meantime.",
  },
  {
    question: "Do you offer a warranty?",
    answer:
      "Every car comes with a 30-day mechanical guarantee covering major components. Extended warranty options are available through our partners at checkout.",
  },
  {
    question: "How do I book a test drive?",
    answer:
      "From any available car's page, tap \"Book Test Drive\" and pick a preferred date — we'll confirm by phone or WhatsApp. You can also message us directly.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />

      <div className="mt-10 max-w-3xl">
        <Accordion items={faqs} />
      </div>

      <div className="mt-10 max-w-3xl rounded-2xl border border-line bg-paper-dim p-6 text-sm text-ink-soft">
        Still have questions?{" "}
        <a href={whatsappLink("Hi! I have a question that's not in your FAQ.")} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
          Message us on WhatsApp
        </a>{" "}
        or email{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-medium text-accent hover:underline">
          {siteConfig.email}
        </a>
        .
      </div>
    </div>
  );
}
