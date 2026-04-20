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
      "Strengthen the digital front door with sharper structure, clearer messaging, and a stronger path to trust and action.",
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
      "Create the supporting assets that bring clarity, consistency, and taste to how the business is seen, built with the right tools, creative judgment, and human craft.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-36 lg:py-44">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
              What we{" "}
              <span className="serif-display italic font-light text-ink/80">
                do
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:pt-4">
            <p className="max-w-[46ch] text-[16px] leading-[1.6] text-ink/65 md:text-[17px]">
              Practical work that sharpens how a business is positioned,
              presented, and built.
            </p>
          </div>
        </div>

        <ul className="mt-20 border-t border-paper-line md:mt-28">
          {SERVICES.map((s) => (
            <li key={s.n} className="border-b border-paper-line">
              <article className="group -mx-4 grid grid-cols-12 gap-x-6 gap-y-4 rounded-xl px-4 py-10 transition-colors duration-300 ease-smooth hover:bg-paper-soft/50 md:py-16">
                <div className="col-span-2 md:col-span-1">
                  <span
                    aria-hidden="true"
                    className="serif-display italic font-light text-[38px] leading-none text-ink/35 md:text-[52px] lg:text-[64px]"
                  >
                    {s.n}
                  </span>
                </div>

                <div className="col-span-10 md:col-span-6 md:pl-4">
                  <span className="caption block">{s.kicker}</span>
                  <h3 className="mt-3 text-[24px] font-medium leading-[1.2] tracking-tight text-ink md:mt-4 md:text-[30px] md:leading-[1.12] lg:text-[34px]">
                    {s.title}
                  </h3>
                </div>

                <div className="col-span-12 md:col-span-4 md:pt-2">
                  <p className="max-w-[46ch] text-[15.5px] leading-[1.6] text-ink/70 md:text-[16px]">
                    {s.body}
                  </p>
                </div>

                <div className="col-span-1 hidden items-start justify-end pt-3 md:flex">
                  <span
                    aria-hidden="true"
                    className="translate-x-0 text-[18px] text-ink/20 transition-all duration-300 ease-smooth group-hover:translate-x-1.5 group-hover:text-ink/70"
                  >
                    →
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
