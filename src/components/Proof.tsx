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
          <div className="md:col-span-6">
            <span className="caption">Credibility</span>
            <h2 className="mt-6 text-h2 font-medium tracking-tighter2 text-ink">
              Proof built in three forms:{" "}
              <span className="serif-display italic font-light text-ink/80">
                work, perspective, outcomes.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:pt-4">
            <p className="max-w-[46ch] text-[16px] leading-[1.6] text-ink/65 md:text-[17px]">
              Credibility is established deliberately — work shown,
              perspective articulated, outcomes documented. This framework is
              designed to hold real assets as the studio expands.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 border-t border-paper-line md:mt-28 md:grid-cols-3 md:gap-px md:bg-paper-line">
          {BLOCKS.map((b, i) => (
            <article
              key={b.title}
              className="flex h-full flex-col border-b border-paper-line bg-paper py-10 md:border-b-0 md:px-8 md:py-14 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex items-baseline gap-6">
                <span
                  aria-hidden
                  className="serif-display italic font-light text-[28px] leading-none text-ink/30 md:text-[36px]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="caption">{b.label}</span>
              </div>

              <h3 className="mt-10 text-[22px] font-medium leading-[1.18] tracking-tight text-ink md:mt-14 md:text-[26px]">
                {b.title}
              </h3>
              <p className="mt-4 max-w-[38ch] text-[15.5px] leading-[1.6] text-ink/70 md:text-[16px]">
                {b.body}
              </p>

              <div className="mt-auto pt-10 md:pt-14">
                {b.cta ? (
                  <Link href={b.cta.href} className="link-quiet">
                    {b.cta.text}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <span className="text-[12px] uppercase tracking-[0.22em] text-ink/40">
                    Published as engagements complete
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
