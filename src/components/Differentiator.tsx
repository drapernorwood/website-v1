export function Differentiator() {
  return (
    <section className="border-y border-paper-line bg-paper-soft/50 py-28 md:py-40 lg:py-48">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
              <span className="serif-display italic font-light text-ink/80">
                Why
              </span>{" "}
              Draper Norwood
            </h2>
          </div>

          <div className="lg:col-span-9 lg:pl-4">
            <figure className="relative">
              <blockquote className="serif-display font-light text-[30px] leading-[1.18] tracking-tightserif text-ink md:text-[44px] lg:text-[54px]">
                Draper Norwood sees the{" "}
                <em className="italic">hidden constraints</em>, overlooked
                opportunities, and strategic patterns others miss — then
                turns that insight into{" "}
                <em className="italic">practical action</em>.
              </blockquote>
            </figure>

            <p className="mt-12 text-[16.5px] leading-[1.65] text-ink/70 md:text-[17.5px]">
              The difference is not just seeing what others miss — it is bringing it into form.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
