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
    <section id="services" className="py-24 md:py-36 lg:py-44">
      <div className="container-dn">
        <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
          What we{" "}
          <span className="serif-display italic font-light text-ink/80">
            do
          </span>
        </h2>

        <ul className="mt-16 border-t border-ink/10 md:mt-20">
          {SERVICES.map((s) => (
            <li key={s.n} className="border-b border-ink/10">
              <article className="grid grid-cols-12 gap-x-6 gap-y-4 py-9 md:py-14">
                <div className="col-span-2 md:col-span-1">
                  <span
                    aria-hidden="true"
                    className="serif-display italic font-light text-[38px] leading-none text-ink/35 md:text-[52px] lg:text-[64px]"
                  >
                    {s.n}
                  </span>
                </div>

                <div className="col-span-10 md:col-span-5">
                  <span className="caption block text-ink/65 tracking-[0.24em]">
                    {s.kicker}
                  </span>
                  <h3 className="mt-3 text-[24px] font-medium leading-[1.2] tracking-tight text-ink md:mt-4 md:text-[30px] md:leading-[1.12] lg:text-[34px]">
                    {s.title}
                  </h3>
                </div>

                <div className="col-span-10 col-start-3 md:col-span-6 md:col-start-auto md:pt-2">
                  <p className="max-w-[52ch] text-[16px] leading-[1.65] text-ink/80 md:text-[17px]">
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
