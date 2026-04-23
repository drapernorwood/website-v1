import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-30"
      />

      {/* Faint DN monogram — subliminal brand presence, not decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-[45%] -translate-y-1/2 select-none opacity-[0.03] md:right-0 md:opacity-[0.04] lg:right-16"
      >
        <Image
          src="/brand/dn-logo.png"
          alt=""
          width={2000}
          height={2000}
          className="h-[560px] w-auto md:h-[760px] lg:h-[880px]"
          priority
        />
      </div>

      <div className="container-dn relative pt-14 pb-14 md:pt-28 md:pb-20 lg:pt-36 lg:pb-24">
        <h1
          style={{ lineHeight: "1.04" }}
          className="mt-8 text-display font-medium tracking-tightest text-ink md:mt-12"
        >
          Make your business clearer
          <br className="hidden sm:block" />{" "}
          <span className="serif-display italic font-light text-ink/80">
            {"— and harder to ignore."}
          </span>
        </h1>

        <div className="mt-14 max-w-[56ch] md:mt-20">
          <p className="text-[17px] leading-[1.65] text-ink/70 md:text-[19px]">
            We help companies clarify their value, elevate their digital
            presence, and present themselves with greater precision,
            credibility, and force.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-10">
            <Link href="#contact" className="btn-primary">
              Work With Us
              <ArrowRight />
            </Link>
            <Link href="#services" className="link-quiet opacity-75">
              View Services
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
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
