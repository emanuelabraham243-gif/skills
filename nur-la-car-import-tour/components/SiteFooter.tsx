import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/site-config";

const explore = [
  { href: "/cars", label: "Browse Cars" },
  { href: "/tours", label: "Browse Tours" },
  { href: "/process", label: "How It Works" },
  { href: "/trade-in", label: "Trade In Your Car" },
  { href: "/custom-request", label: "Request a Vehicle" },
  { href: "/plan-a-tour", label: "Plan a Custom Tour" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/credits", label: "Photo Credits" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-dim">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <span className="font-display text-xl text-ink">{siteConfig.shortName}</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            {siteConfig.tagline}
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink"
          >
            Chat on WhatsApp
          </a>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wide text-ink-soft">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wide text-ink-soft">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wide text-ink-soft">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ink">
            <li>{siteConfig.address}</li>
            <li className="text-ink-soft">{siteConfig.hours}</li>
            <li>
              <a href={`tel:+${siteConfig.whatsappNumber}`} className="hover:text-accent">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Addis Ababa, Ethiopia</p>
        </div>
      </div>
    </footer>
  );
}
