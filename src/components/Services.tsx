import Link from "next/link";

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
    <section id="services" className="section">
      <div className="container-dn">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">04 — Services</p>
            <h2 className="mt-3 text-h2 font-medium text-ink">Services</h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-ink-muted">
            Four disciplines, one operating posture: clarify, build, and improve
            how the business performs.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line md:mt-16 md:grid-cols-2">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              className="group relative bg-paper p-8 transition-colors duration-300 ease-smooth hover:bg-paper-soft md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                  {s.n}
                </span>
                <span
                  aria-hidden="true"
                  className="translate-x-0 text-ink-muted transition-transform duration-300 ease-smooth group-hover:translate-x-1 group-hover:text-ink"
                >
                  →
                </span>
              </div>
              <h3 className="mt-10 text-[22px] font-medium leading-snug tracking-tight text-ink md:text-[26px]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-ink/75">
                {s.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <Link href="#services" className="link-quiet">
            Explore Services
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
