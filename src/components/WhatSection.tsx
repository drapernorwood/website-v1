export function WhatSection() {
  return (
    <section id="about" className="section-tight md:section">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <span className="caption">Overview</span>
            <h2 className="mt-6 text-h2 font-medium tracking-tighter2 text-ink">
              What Draper Norwood{" "}
              <span className="serif-display italic font-light text-ink/80">
                is
              </span>
            </h2>
          </div>

          <div className="md:col-span-7 md:pt-2">
            <div className="max-w-[58ch] space-y-7 text-[17px] leading-[1.65] text-ink/75 md:text-[19px]">
              <p>
                Draper Norwood is a strategy, web, and AI execution studio
                that helps companies sharpen their positioning, strengthen
                their digital presence, and build practical assets that
                support measurable business improvement.
              </p>
              <p>
                It works at the intersection of strategic clarity, digital
                execution, creative packaging, and modern AI-enabled
                leverage.
              </p>
              <p className="text-ink">
                This is not abstract consulting for its own sake. The goal is
                to identify what matters, build what is needed, and improve
                how the business performs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
