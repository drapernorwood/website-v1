export function WhatSection() {
  return (
    <section id="about" className="py-10 md:py-16 lg:py-20">
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

            <div className="md:col-span-7 md:pt-2 md:border-l md:border-paper-line md:pl-4">
              <div className="max-w-[58ch] space-y-5 text-[17px] leading-[1.65] text-ink/65 md:text-[19px]">
                <p className="text-ink font-medium">
                  Your business is stronger than the market sees.
                </p>
                <p>
                  We close the gap between what a company actually delivers and
                  how it is perceived — through sharper positioning, a stronger
                  digital presence, and practical assets built to earn trust and
                  create leverage.
                </p>
                <p>
                  Not advice. Not decks. Work that moves the business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
