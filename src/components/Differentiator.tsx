export function Differentiator() {
  return (
    <section className="section-tight md:section relative">
      <div className="container-dn">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">05 — Difference</p>
            <h2 className="mt-4 text-h2 font-medium tracking-tighter2 text-ink">
              Why Draper Norwood
            </h2>
            <div className="mt-8 hidden h-px w-12 bg-ink/30 lg:block" />
          </div>

          <div className="lg:col-span-8">
            <figure className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-4 -top-6 select-none font-serif text-[90px] leading-none text-ink/10 md:-left-6 md:-top-8 md:text-[120px]"
              >
                “
              </span>
              <blockquote className="font-serif text-[26px] leading-[1.28] tracking-tight text-ink md:text-[34px] lg:text-[40px]">
                A core strength of Draper Norwood is seeing the hidden
                constraints, overlooked opportunities, and strategic patterns
                that others miss — then translating that insight into practical
                action.
              </blockquote>
            </figure>

            <div className="mt-10 max-w-[60ch] space-y-5 text-[16.5px] leading-relaxed text-ink/80 md:text-[17px]">
              <p>
                The work combines strategic thinking, sharp positioning
                instincts, modern digital sensibility, AI fluency, and real
                execution.
              </p>
              <p className="text-ink">
                The difference is not only seeing the right direction. The
                difference is helping bring the right direction into form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
