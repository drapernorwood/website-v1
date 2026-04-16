export function Differentiator() {
  return (
    <section className="section border-y border-paper-line bg-paper-soft/40">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
              Why Draper Norwood
            </h2>
            <div className="mt-8 hidden h-px w-12 bg-ink/25 lg:block" />
          </div>

          <div className="lg:col-span-8">
            <figure className="relative">
              <blockquote className="font-serif text-[28px] leading-[1.25] tracking-tight text-ink md:text-[36px] lg:text-[42px]">
                A core strength of Draper Norwood is seeing the hidden
                constraints, overlooked opportunities, and strategic patterns
                that others miss — then translating that insight into
                practical action.
              </blockquote>
            </figure>

            <div className="mt-12 max-w-[58ch] space-y-5 text-[16.5px] leading-[1.65] text-ink/75 md:text-[17.5px]">
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
