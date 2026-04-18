export function Differentiator() {
  return (
    <section className="section border-y border-paper-line bg-paper-soft/50">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <span className="caption">The difference</span>
            <h2 className="mt-6 text-h2 font-medium tracking-tighter2 text-ink">
              Why Draper Norwood
            </h2>
          </div>

          <div className="lg:col-span-9 lg:pl-4">
            <figure className="relative">
              <blockquote className="serif-display font-light text-[30px] leading-[1.18] tracking-tightserif text-ink md:text-[44px] lg:text-[54px]">
                A core strength of Draper Norwood is seeing the{" "}
                <em className="italic">hidden constraints</em>,
                overlooked opportunities, and strategic patterns that others
                miss — then translating that insight into{" "}
                <em className="italic">practical action</em>.
              </blockquote>
            </figure>

            <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
              <p className="text-[16.5px] leading-[1.65] text-ink/75 md:text-[17.5px]">
                The work combines strategic thinking, sharp positioning
                instincts, modern digital sensibility, AI fluency, and real
                execution.
              </p>
              <p className="text-[16.5px] leading-[1.65] text-ink md:text-[17.5px]">
                The difference is not only seeing the right direction.
                <br className="hidden md:block" /> The difference is helping
                bring the right direction into form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
