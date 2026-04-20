export function WhatSection() {
  return (
    <section id="about" className="section-tight md:section">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <span className="caption">About</span>
            <h2 className="mt-6 text-h2 font-medium tracking-tighter2 text-ink">
              The{" "}
              <span className="serif-display italic font-light text-ink/80">
                gap
              </span>
            </h2>
          </div>

          <div className="md:col-span-7 md:pt-2">
            <div className="max-w-[58ch] space-y-7 text-[17px] leading-[1.65] text-ink/75 md:text-[19px]">
              <p className="text-ink font-medium">
                Your business is stronger than your website says.
              </p>
              <p>
                Draper Norwood exists to close the gap between what a company
                actually delivers and how the market perceives it — through
                sharper positioning, a digital presence that earns trust, and
                practical assets built for real leverage.
              </p>
              <p>
                Not advice. Not decks. Work that moves the business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
