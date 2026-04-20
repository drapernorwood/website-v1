import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-40"
      />

      <div className="container-dn relative pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-36 lg:pb-32">
        <div className="flex items-center gap-3">
          <div aria-hidden className="h-px w-8 bg-ink/30" />
          <p className="eyebrow">Strategy · Web · AI Execution</p>
        </div>

        <h1 className="mt-10 text-display font-medium tracking-tightest text-ink md:mt-14">
          Make your business clearer —
          <br className="hidden sm:block" />{" "}
          <span className="serif-display italic font-light text-ink/80">
            and harder to ignore.
          </span>
        </h1>

        <div className="mt-12 grid grid-cols-1 items-end gap-12 md:mt-16 md:grid-cols-12 md:gap-10">
          <p className="md:col-span-7 max-w-[56ch] text-[17px] leading-[1.6] text-ink/70 md:text-[19px]">
            Draper Norwood helps companies clarify their value, elevate their
            digital presence, and present themselves with greater precision,
            credibility, and force.
          </p>

          <div className="md:col-span-5 md:justify-self-end flex flex-wrap items-center gap-x-6 gap-y-3">
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

        <div className="mt-20 md:mt-28 lg:mt-32 rail">
          <RailItem label="Studio" value="Draper Norwood" />
          <RailItem label="Practice" value="Strategy · Web · AI" />
          <RailItem label="Posture" value="Clarity & Execution" />
          <RailItem label="Since" value="2025" />
        </div>
      </div>

      <div className="container-dn">
        <div className="rule" />
      </div>
    </section>
  );
}

function RailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rail-item">
      <span className="rail-label">{label}</span>
      <span className="rail-value">{value}</span>
    </div>
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
