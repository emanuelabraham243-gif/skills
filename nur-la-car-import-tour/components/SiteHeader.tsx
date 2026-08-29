"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/cars", label: "Cars" },
  { href: "/tours", label: "Tours" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl tracking-tight text-ink sm:text-2xl">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.95rem] transition-colors hover:text-accent ${
                pathname.startsWith(link.href) ? "text-accent" : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={`tel:+${siteConfig.whatsappNumber}`} className="text-sm text-ink-soft hover:text-accent">
            {siteConfig.phoneDisplay}
          </a>
          <Link
            href="/cars"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Browse Cars
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-ink transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav className="container-page flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b border-line/70 py-3.5 text-base ${
                  pathname.startsWith(link.href) ? "text-accent" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-5">
              <a href={`tel:+${siteConfig.whatsappNumber}`} className="text-sm text-ink-soft">
                Call {siteConfig.phoneDisplay}
              </a>
              <Link
                href="/cars"
                className="rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-paper"
              >
                Browse Cars
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
