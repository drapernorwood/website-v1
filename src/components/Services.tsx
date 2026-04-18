const SERVICES = [
  {
    n: "01",
    kicker: "Positioning",
    title: "Positioning and Strategic Clarity",
    body:
      "Clarify what the business is, who it serves, what it solves, and how to express that with more force and precision.",
  },
  {
    n: "02",
    kicker: "Presence",
    title: "Web and Digital Presence",
    body:
      "Improve the digital front door through better website structure, messaging, UX thinking, and digital presentation.",
  },
  {
    n: "03",
    kicker: "Execution",
    title: "AI and Modern Execution Systems",
    body:
      "Use AI and modern workflows to create practical leverage, stronger systems, and better execution without hype.",
  },
  {
    n: "04",
    kicker: "Growth",
    title: "Creative and Growth Assets",
    body:
      "Develop supporting materials that strengthen trust, attention, communication, and market presence.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-36 lg:py-44">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <span className="caption">The practice</span>
            <h2 className="mt-6 text-h2 font-medium tracking-tighter2 text-ink">
              Four disciplines,
              <br className="hidden sm:block" />{" "}
              <span className="serif-display italic font-light text-ink/80">
                one operating posture.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:pt-4">
            <p className="max-w-[46ch] text-[16px] leading-[1.6] text-ink/65 md:text-[17px]">
              Each engagement blends sharp strategic thinking with real
              execution — clarify the business, build what is needed, and
              improve how it performs.
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
                  <h3 className="mt-3 text-[24px] font-medium leading-[1.12] tracking-tight text-ink md:mt-4 md:text-[30px] lg:text-[34px]">
                    {s.title}
                  </h3>
                </div>

                <div className="col-span-11 md:col-span-4 md:pt-2">
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
