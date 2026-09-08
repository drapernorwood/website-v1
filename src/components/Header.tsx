"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <Link
            href="/"
            className="wordmark"
            aria-label="Draper Norwood home"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/brand/dn-lockup-tight.png"
              alt="Draper Norwood"
              width={1300}
              height={237}
              sizes="(max-width: 760px) 190px, 280px"
              priority
            />
          </Link>
          <span className="header-note">Strategy. Web. AI. Execution.</span>
          <nav aria-label="Primary" className="desktop-nav">
            <Link href="/#explore">Explore</Link>
            <Link href="/#work">Work</Link>
            <Link href="/#contact" className="nav-contact">
              Let’s talk <span aria-hidden="true">↗</span>
            </Link>
          </nav>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close −" : "Menu +"}
          </button>
        </div>
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="mobile-nav"
          hidden={!open}
        >
          <Link href="/#explore" onClick={() => setOpen(false)}>
            Explore <span>↗</span>
          </Link>
          <Link href="/#work" onClick={() => setOpen(false)}>
            Work <span>↗</span>
          </Link>
          <Link href="/#about" onClick={() => setOpen(false)}>
            Practice <span>↗</span>
          </Link>
          <Link href="/#services" onClick={() => setOpen(false)}>
            Capabilities <span>↗</span>
          </Link>
          <Link href="/#contact" onClick={() => setOpen(false)}>
            Let’s talk <span>↗</span>
          </Link>
        </nav>
      </header>
    </>
  );
}
