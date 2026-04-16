import Link from "next/link";

export function CTASection() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-50"
      />
      <div className="container-dn relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">07 — Start</p>
          <h2 className="mt-5 text-h2 font-medium tracking-tighter2 text-ink">
            Need sharper positioning, stronger digital assets, or a clearer
            path forward?
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-ink-muted md:text-lg">
            Draper Norwood works with companies that need strategic clarity and
            real execution — not more noise.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="mailto:hello@drapernorwood.com" className="btn-primary">
              Start the Conversation
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
            </Link>
            <Link href="#services" className="link-quiet">
              Or explore services first
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
