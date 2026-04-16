export function WhatSection() {
  return (
    <section id="about" className="section">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow">01 — Overview</p>
            <h2 className="mt-4 text-h2 font-medium text-ink">
              What Draper Norwood is
            </h2>
          </div>

          <div className="md:col-span-8 md:pt-1">
            <div className="space-y-6 text-[17px] leading-relaxed text-ink/80 md:text-lg">
              <p>
                Draper Norwood is a strategy, web, and AI execution studio that
                helps companies sharpen their positioning, strengthen their
                digital presence, and build practical assets that support
                measurable business improvement.
              </p>
              <p>
                It works at the intersection of strategic clarity, digital
                execution, creative packaging, and modern AI-enabled leverage.
              </p>
              <p className="text-ink">
                This is not abstract consulting for its own sake. The goal is to
                identify what matters, build what is needed, and improve how the
                business performs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
