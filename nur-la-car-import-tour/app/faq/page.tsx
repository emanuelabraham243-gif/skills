import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about buying an imported car and booking a tour with us.",
};

const faqs = [
  {
    question: "Can I really buy a car without seeing it in person first?",
    answer:
      "Yes — most customers reserve or pay a deposit based on our photo galleries and condition summaries, then visit for a test drive and final inspection before completing the purchase. Nothing is final until you've seen the car.",
  },
  {
    question: "How accurate are the condition summaries?",
    answer:
      "Every car is inspected by our team before listing, and the public summary is written from that inspection in plain language. We flag anything cosmetically notable — we'd rather you know upfront than be surprised at pickup.",
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
    question: "How far in advance should I book a tour?",
    answer:
      "For popular routes like Simien Mountains or Lalibela, 2–3 weeks' notice is usually enough. For smaller-group or seasonal trips like Danakil, book 4–6 weeks ahead where possible.",
  },
  {
    question: "Are your tour guides licensed?",
    answer:
      "Yes — every tour is led by a licensed, English-speaking guide, with regional scout or armed-escort arrangements added where a route requires it (such as Danakil).",
  },
  {
    question: "What's included in the tour price?",
    answer:
      "Each tour package page lists exactly what's included and excluded — typically guiding, entry fees, and transport within the itinerary, with international/domestic flights and personal expenses listed separately.",
  },
  {
    question: "Can you customize a tour itinerary?",
    answer:
      "Yes — use the custom request form to describe your ideal trip (destinations, dates, group size, budget) and we'll put together a tailored itinerary.",
  },
  {
    question: "How do I book a test drive or a tour?",
    answer:
      "From any car or tour page, tap the request button and fill in your details — we'll confirm by phone or WhatsApp. You can also message us directly.",
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
