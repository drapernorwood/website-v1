const SERVICES = [
  {
    n: "01",
    kicker: "Clarity",
    title: "Positioning and strategy",
    body:
      "Clarify what the business is, what it solves, and how it should be expressed with more force and precision.",
  },
  {
    n: "02",
    kicker: "Trust",
    title: "Web and digital presence",
    body:
      "Strengthen the digital front door with clearer structure, sharper messaging, and a stronger path to trust and action.",
  },
  {
    n: "03",
    kicker: "Leverage",
    title: "AI and modern systems",
    body:
      "Design and build practical systems, workflows, and customer-facing tools using AI, guided by judgment, design, and craftsmanship.",
  },
  {
    n: "04",
    kicker: "Craft",
    title: "Creative and growth assets",
    body:
      "Create the supporting assets that bring clarity, consistency, and taste to how the business is seen — built with the right tools, creative judgment, and human craft.",
  },
];

export function Services() {
  return (
    <section id="services" className="pt-36 pb-24 md:pt-52 md:pb-36 lg:pt-60 lg:pb-44">
      <div className="container-dn">
        <div>
          <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
            <span className="serif-display italic font-light text-ink/80">
              How
            </span>
            {" "}we help
          </h2>
          <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.65] text-ink/70">
            We close the gaps between capability and perception, strategy and execution, attention and trust.
          </p>
        </div>

        <ul className="mt-12 border-t border-ink/10 md:mt-20">
          {SERVICES.map((s) => (
            <li key={s.n} className="border-b border-ink/10">
              <article className="grid grid-cols-12 gap-x-6 gap-y-2 py-6 md:gap-y-0 md:py-11">
                <div className="col-span-2 md:col-span-1">
                  <span
                    aria-hidden="true"
                    className="serif-display italic font-light text-[28px] leading-none text-ink/50 md:text-[52px] lg:text-[64px]"
                  >
                    {s.n}
                  </span>
                </div>

                <div className="col-span-10 md:col-span-5">
                  <span className="caption block text-ink/65 tracking-[0.24em]">
                    {s.kicker}
                  </span>
                  <h3 className="mt-3 text-[24px] font-medium leading-[1.22] tracking-tight text-ink md:mt-4 md:text-[32px] md:leading-[1.12] lg:text-[36px]">
                    {s.title}
                  </h3>
                </div>

                <div className="col-span-12 md:col-span-6 md:pt-2">
                  <p className="max-w-[46ch] text-[15.5px] leading-[1.72] text-ink/65 md:text-[17px] md:text-ink/70">
                    {s.body}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
