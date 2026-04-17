import Link from "next/link";

type Block = {
  label: string;
  title: string;
  body: string;
  cta?: { text: string; href: string };
};

const BLOCKS: Block[] = [
  {
    label: "Work",
    title: "Selected Work",
    body:
      "Strategic, digital, and creative work shaped to improve clarity, trust, and business performance.",
    cta: { text: "View Examples", href: "#contact" },
  },
  {
    label: "Perspective",
    title: "Founder Perspective",
    body:
      "Built with a point of view grounded in strategy, execution, and commercially useful outcomes.",
    cta: { text: "About the Founder", href: "#about" },
  },
  {
    label: "Results",
    title: "Client Results",
    body:
      "Case studies, testimonials, and measurable outcomes are added as engagements complete.",
  },
];

export function Proof() {
  return (
    <section className="section">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
              Proof and Credibility
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-3">
            <p className="max-w-[44ch] text-[16px] leading-[1.6] text-ink/65">
              Evidence is built in three forms: work shown, perspective
              established, and outcomes documented over time.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border-y border-paper-line bg-paper-line md:mt-20 md:grid-cols-3">
          {BLOCKS.map((b) => (
            <article
              key={b.title}
              className="flex h-full flex-col bg-paper py-10 md:px-8 md:py-12"
            >
              <span className="text-[11px] uppercase tracking-[0.18em] text-ink/40">
                {b.label}
              </span>
              <h3 className="mt-8 text-[22px] font-medium leading-[1.2] tracking-tight text-ink md:text-[24px]">
                {b.title}
              </h3>
              <p className="mt-4 max-w-[36ch] text-[15.5px] leading-[1.6] text-ink/70">
                {b.body}
              </p>

              <div className="mt-auto pt-10">
                {b.cta ? (
                  <Link href={b.cta.href} className="link-quiet">
                    {b.cta.text}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <span className="text-[13px] uppercase tracking-[0.14em] text-ink/40">
                    In progress
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
