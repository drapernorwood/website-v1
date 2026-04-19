import Image from "next/image";
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
      <div className="container-dn py-20 md:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <Image
              src="/brand/dn-lockup-tight.png"
              alt="Draper Norwood"
              width={1293}
              height={237}
              className="h-10 w-auto md:h-12"
            />
            <p className="mt-8 max-w-md text-[15.5px] leading-[1.6] text-ink/70">
              Strategy, web, and AI execution for sharper positioning and
              stronger digital presence.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="caption">Navigate</p>
            <ul className="mt-6 space-y-3">
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
            <p className="caption">Contact</p>
            <ul className="mt-6 space-y-3">
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

        <div className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-paper-line pt-8 md:flex-row md:items-center">
          <p className="text-[13px] text-ink/55">
            © {year} Draper Norwood
          </p>
          <p className="font-serif text-[13px] italic text-ink/50">
            Clarity · Execution · Leverage
          </p>
        </div>
      </div>
    </footer>
  );
}
