import Link from "next/link";

export function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36 lg:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-30"
      />
      <div className="container-dn relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h1 font-medium tracking-tightest text-ink">
            Need sharper positioning, stronger digital assets, or a clearer
            path forward?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.6] text-ink/70 md:mt-10 md:text-[19px]">
            Draper Norwood works with companies that need strategic clarity
            and real execution — not more noise.
          </p>

          <div className="mt-12 flex flex-col items-center gap-x-6 gap-y-3 sm:flex-row sm:justify-center md:mt-14">
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
