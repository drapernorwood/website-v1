import Link from "next/link";

const NAV = [
  { href: "/", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper-line bg-paper">
      <div className="container-dn py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <p className="text-[15px] font-semibold tracking-tight text-ink">
              Draper Norwood
            </p>
            <p className="mt-4 max-w-md text-[15.5px] leading-[1.6] text-ink/70">
              Strategy, web, and AI execution for sharper positioning and
              stronger digital presence.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink/40">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-[15px] text-ink/80 transition-colors hover:text-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink/40">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="mailto:hello@drapernorwood.com"
                  className="text-[15px] text-ink/80 transition-colors hover:text-ink"
                >
                  hello@drapernorwood.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-paper-line pt-8">
          <p className="text-[13px] text-ink/55">
            © {year} Draper Norwood
          </p>
        </div>
      </div>
    </footer>
  );
}
