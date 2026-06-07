import Image from "next/image";

export function WhatSection() {
  return (
    <section id="about" className="relative overflow-hidden py-10 md:py-16 lg:py-20">
      {/* Mill structure — atmospheric right-anchored background layer, desktop only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] select-none md:block"
      >
        <Image
          src="/mill-structure.png"
          alt=""
          fill
          className="object-cover object-right-top opacity-60"
          sizes="(min-width: 768px) 62vw"
        />
      </div>

      <div className="container-dn">
        <div className="border-t border-b border-paper-line py-10 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
                The{" "}
                <span className="serif-display italic font-light text-ink/80">
                  gap
                </span>
              </h2>
            </div>

            <div className="relative md:col-span-7 md:pt-2 md:border-l md:border-paper-line md:pl-4">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden select-none grid-analytical md:block"
              />
              <div className="relative max-w-[58ch] space-y-5 text-[17px] leading-[1.65] text-ink/65 md:text-[19px]">
                <p className="text-ink font-medium">
                  A company can have real value, strong proof, and serious
                  capability — and still be underperceived.
                </p>
                <p>
                  The market does not meet the private truth of the business.
                  It meets the language, proof, website, offers, visuals,
                  systems, and context the business gives it.
                </p>
                <p>
                  Clarity is not only explanation.
                </p>
                <p>
                  Sometimes it is recognition: the moment the right people
                  understand what the thing is, why it matters, and why it
                  belongs in their world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
