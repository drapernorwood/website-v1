import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-40"
      />

      <div className="container-dn relative pt-28 pb-28 md:pt-36 md:pb-36 lg:pt-44 lg:pb-44">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 hidden flex-col items-end gap-3 pt-10 lg:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink/35">
            Strategy · Web · AI
          </span>
          <div className="h-px w-8 bg-ink/20" />
          <span className="font-serif text-[11px] italic text-ink/30">
            Est. 2025
          </span>
        </div>

        <div className="max-w-5xl">
          <p className="eyebrow">Strategy, Web, and AI Execution</p>

          <h1 className="mt-8 text-display font-medium tracking-tightest text-ink md:mt-10">
            Sharper positioning.
            <br className="hidden sm:block" />{" "}
            Stronger digital assets.
            <br className="hidden sm:block" />{" "}
            <span className="text-ink/45">Better business performance.</span>
          </h1>

          <p className="mt-10 max-w-[54ch] text-[17px] leading-[1.6] text-ink/70 md:mt-12 md:text-[19px]">
            Draper Norwood helps companies clarify what they do, strengthen
            how they show up online, and build modern digital assets that
            improve trust, traction, and profitability.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-14">
            <Link href="#contact" className="btn-primary">
              Work With Us
              <ArrowRight />
            </Link>
            <Link href="#services" className="link-quiet">
              View Services
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-dn">
        <div className="rule" />
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
