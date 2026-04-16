import Link from "next/link";

type Card = {
  n: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  disabled?: boolean;
};

const CARDS: Card[] = [
  {
    n: "01",
    title: "Selected Work",
    body:
      "Strategic, digital, and creative work shaped to improve clarity, trust, and business performance.",
    cta: "View Examples",
    href: "#contact",
  },
  {
    n: "02",
    title: "Founder Perspective",
    body:
      "Built with a point of view grounded in strategy, execution, and commercially useful outcomes.",
    cta: "About the Founder",
    href: "#about",
  },
  {
    n: "03",
    title: "Client Results",
    body:
      "Testimonials, case studies, and project outcomes can be integrated here as Draper Norwood V1 expands.",
    cta: "Coming Soon",
    href: "#",
    disabled: true,
  },
];

export function Proof() {
  return (
    <section className="section bg-paper-soft/50 border-y border-paper-line">
      <div className="container-dn">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">06 — Credibility</p>
            <h2 className="mt-3 text-h2 font-medium text-ink">
              Proof and Credibility
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-ink-muted">
            A framework for credibility — evidence, perspective, and results —
            built to accept real assets as the studio expands.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {CARDS.map((c) => (
            <article
              key={c.n}
              className="card flex h-full flex-col justify-between p-7 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                    {c.n}
                  </span>
                  {c.disabled && (
                    <span className="rounded-full border border-paper-line bg-paper px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                      Placeholder
                    </span>
                  )}
                </div>
                <h3 className="mt-8 text-[20px] font-medium tracking-tight text-ink md:text-[22px]">
                  {c.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
                  {c.body}
                </p>
              </div>

              <div className="mt-8">
                {c.disabled ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted">
                    {c.cta}
                  </span>
                ) : (
                  <Link href={c.href} className="link-quiet">
                    {c.cta}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
