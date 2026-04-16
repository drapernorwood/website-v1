import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full
                   bg-[radial-gradient(closest-side,_rgba(46,93,75,0.08),_transparent_70%)]"
      />

      <div className="container-dn relative pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-36 lg:pb-40">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <p className="eyebrow">Strategy, Web, and AI Execution</p>

            <h1 className="mt-6 text-display font-medium text-ink">
              Sharper positioning.
              <br className="hidden sm:block" />{" "}
              Stronger digital assets.
              <br className="hidden sm:block" />{" "}
              <span className="text-ink/55">Better business performance.</span>
            </h1>

            <p className="mt-8 max-w-prose2 text-[17px] leading-relaxed text-ink/75 md:text-lg">
              Draper Norwood helps companies clarify what they do, strengthen
              how they show up online, and build modern digital assets that
              improve trust, traction, and profitability.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="#contact" className="btn-primary">
                Work With Us
                <ArrowRight />
              </Link>
              <Link href="#services" className="btn-secondary">
                View Services
              </Link>
            </div>
          </div>

          <div className="hidden lg:col-span-4 lg:block">
            <HeroSystemMark />
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

function HeroSystemMark() {
  return (
    <div
      className="relative ml-auto aspect-square w-full max-w-[380px] rounded-2xl border border-paper-line
                 bg-paper-soft/60 p-6"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        <span>System</span>
        <span>v1</span>
      </div>

      <svg viewBox="0 0 200 200" className="mt-4 w-full">
        <defs>
          <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(11,12,14,0.22)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="200" height="200" fill="url(#dots)" />
        <g stroke="rgba(11,12,14,0.85)" strokeWidth="1" fill="none">
          <rect x="20" y="20" width="160" height="160" />
          <line x1="20" y1="80" x2="180" y2="80" />
          <line x1="20" y1="140" x2="180" y2="140" />
          <line x1="80" y1="20" x2="80" y2="180" />
          <line x1="140" y1="20" x2="140" y2="180" />
        </g>
        <g>
          <rect x="80" y="80" width="60" height="60" fill="#0B0C0E" />
          <rect x="140" y="20" width="40" height="60" fill="rgba(46,93,75,0.85)" />
        </g>
      </svg>

      <div className="mt-5 grid grid-cols-3 gap-3 text-[11px] text-ink-muted">
        <Metric label="Clarity" value="01" />
        <Metric label="Execution" value="02" />
        <Metric label="Leverage" value="03" />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-paper-line bg-paper px-3 py-2">
      <div className="text-ink">{value}</div>
      <div className="mt-0.5 uppercase tracking-[0.14em]">{label}</div>
    </div>
  );
}
