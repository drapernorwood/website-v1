const SERVICES = [
  {
    n: "01",
    title: "Positioning and Strategic Clarity",
    body:
      "Clarify what the business is, who it serves, what it solves, and how to express that with more force and precision.",
  },
  {
    n: "02",
    title: "Web and Digital Presence",
    body:
      "Improve the digital front door through better website structure, messaging, UX thinking, and digital presentation.",
  },
  {
    n: "03",
    title: "AI and Modern Execution Systems",
    body:
      "Use AI and modern workflows to create practical leverage, stronger systems, and better execution without hype.",
  },
  {
    n: "04",
    title: "Creative and Growth Assets",
    body:
      "Develop supporting materials that strengthen trust, attention, communication, and market presence.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 lg:py-40">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
              Services
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-3">
            <p className="max-w-[42ch] text-[16px] leading-[1.6] text-ink/65">
              Four disciplines, one operating posture: clarify, build, and
              improve how the business performs.
            </p>
          </div>
        </div>

        <ul className="mt-16 border-t border-paper-line md:mt-20">
          {SERVICES.map((s) => (
            <li key={s.n} className="border-b border-paper-line">
              <article className="group -mx-4 grid grid-cols-12 gap-6 rounded-lg px-4 py-10 transition-colors duration-300 ease-smooth hover:bg-paper-soft/60 md:py-14">
                <div className="col-span-12 md:col-span-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-ink/40">
                    {s.n}
                  </span>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <h3 className="text-[24px] font-medium leading-[1.15] tracking-tight text-ink md:text-[30px] lg:text-[34px]">
                    {s.title}
                  </h3>
                </div>

                <div className="col-span-11 md:col-span-4 md:pt-2">
                  <p className="max-w-[46ch] text-[15.5px] leading-[1.6] text-ink/70 md:text-[16px]">
                    {s.body}
                  </p>
                </div>

                <div className="col-span-1 hidden items-start justify-end pt-2 md:flex md:pt-3">
                  <span
                    aria-hidden="true"
                    className="translate-x-0 text-[18px] text-ink/20 transition-all duration-300 ease-smooth group-hover:translate-x-1 group-hover:text-ink/60"
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
