import type { Metadata } from "next";
import Button from "@/components/Button";
import ContactForm from "@/components/contact/ContactForm";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { mapsLink, site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with COLOR Furniture — call, WhatsApp, or send us a message about your space.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-32 md:px-10 md:pt-40">
      <div className="max-w-2xl">
        <p className="eyebrow mb-5 text-[11px] font-medium uppercase text-wood-dark">
          Get in Touch
        </p>
        <h1 className="font-display text-4xl text-charcoal md:text-5xl">Contact COLOR</h1>
        <p className="mt-6 text-[15px] leading-relaxed text-charcoal-soft/75">
          Questions about a piece, a delivery, or planning a whole room? Send
          us a message, call, or come by the showroom — we reply quickly.
        </p>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="space-y-10">
          <div>
            <h2 className="text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">
              Call or WhatsApp
            </h2>
            <p className="mt-3 text-[15px] text-charcoal-soft/80">{site.phone}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button href={site.phoneHref} variant="secondary">
                Call Now
              </Button>
              <Button
                href={whatsappLink(`Hello ${site.name}, I have a question.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="!bg-[#25D366] !text-white hover:!bg-[#1ebc59]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">
              Email
            </h2>
            <a href={`mailto:${site.email}`} className="link-underline mt-3 inline-block text-[15px] text-charcoal-soft/80">
              {site.email}
            </a>
          </div>

          <div>
            <h2 className="text-[12px] font-medium uppercase tracking-[0.1em] text-charcoal">
              Showroom Location
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-charcoal-soft/80">
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <div className="mt-4 space-y-1 text-[14px] text-charcoal-soft/70">
              {site.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
            <Button href={mapsLink()} target="_blank" rel="noopener noreferrer" variant="ghost" className="mt-4 border border-line">
              Get Directions →
            </Button>
          </div>
        </div>

        <div className="border border-line bg-cream p-8 md:p-10">
          <h2 className="font-display text-2xl text-charcoal">Send a Message</h2>
          <p className="mt-2 text-[14px] text-charcoal-soft/70">
            We&rsquo;ll get back to you over WhatsApp within one business day.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
