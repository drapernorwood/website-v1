"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        "transition-[background-color,border-color,backdrop-filter] duration-300 ease-smooth",
        scrolled
          ? "border-b border-paper-line/80 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="container-dn flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="group flex items-baseline gap-2"
          aria-label="Draper Norwood — Home"
        >
          <span className="wordmark">Draper Norwood</span>
          <span
            aria-hidden="true"
            className="font-serif text-[13px] italic font-light text-ink/40 transition-colors duration-200 ease-smooth group-hover:text-ink/70"
          >
            studio
          </span>
        </Link>

        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] text-ink/65 transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="#contact" className="btn-primary !px-5 !py-2.5 !text-[13px]">
            Work With Us
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            {open ? (
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5h12M2 11h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-paper-line bg-paper">
          <div className="container-dn flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[15px] text-ink/80 hover:bg-paper-soft hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Work With Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
