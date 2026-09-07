"use client";
import Link from "next/link";
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
            <span className="brand-symbol" aria-hidden="true">
              d/n
            </span>
            <span>
              Draper
              <br />
              Norwood
            </span>
          </Link>
          <span className="header-note">
            Independent thinking.
            <br />
            Practical consequence.
          </span>
          <nav aria-label="Primary" className="desktop-nav">
            <Link href="/#work">
              <span>01</span> Work
            </Link>
            <Link href="/#about">
              <span>02</span> Practice
            </Link>
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
          <Link href="/#work" onClick={() => setOpen(false)}>
            01 / Work <span>↗</span>
          </Link>
          <Link href="/#about" onClick={() => setOpen(false)}>
            02 / Practice <span>↗</span>
          </Link>
          <Link href="/#services" onClick={() => setOpen(false)}>
            03 / Capabilities <span>↗</span>
          </Link>
          <Link href="/#contact" onClick={() => setOpen(false)}>
            Let’s talk <span>↗</span>
          </Link>
        </nav>
      </header>
    </>
  );
}
