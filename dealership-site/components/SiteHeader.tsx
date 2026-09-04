"use client";

import { Heart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useAuthUser } from "@/lib/auth";
import { useWishlist } from "@/lib/wishlist";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/cars", label: "Cars" },
  { href: "/compare", label: "Compare" },
  { href: "/process", label: "Process" },
  { href: "/car-wash", label: "Car Wash" },
  { href: "/partners", label: "Partners" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const user = useAuthUser();
  const wishlist = useWishlist();

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
        <Link href="/" className="flex items-center gap-2.5">
          {siteConfig.logo && (
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={40}
              height={40}
              unoptimized
              className="h-9 w-9 shrink-0 rounded-lg object-cover sm:h-10 sm:w-10"
            />
          )}
          <span className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.9rem] transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/wishlist" className="relative flex items-center text-ink-soft hover:text-accent" aria-label="Wishlist">
            <Heart className="h-5 w-5" strokeWidth={1.8} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-ink">
                {wishlist.length}
              </span>
            )}
          </Link>
          {user ? (
            <Link href="/account" className="text-sm font-medium text-ink hover:text-accent">
              {user.fullName || user.email}
            </Link>
          ) : (
            <Link href="/account" className="text-sm font-medium text-ink hover:text-accent">
              Login / Register
            </Link>
          )}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/wishlist" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft" aria-label="Wishlist">
            <Heart className="h-5 w-5" strokeWidth={1.8} />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-ink">
                {wishlist.length}
              </span>
            )}
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
          >
            {open ? <X className="h-4.5 w-4.5" strokeWidth={1.8} /> : <Menu className="h-4.5 w-4.5" strokeWidth={1.8} />}
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
                  pathname === link.href ? "text-accent" : "text-ink"
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
                href="/account"
                className="rounded-full bg-purple px-5 py-3 text-center text-sm font-medium text-purple-ink"
              >
                {user ? user.fullName || user.email : "Login / Register"}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
