import Link from "next/link";

type Block = {
  label: string;
  title: string;
  body: string;
  cta: { text: string; href: string };
};

const BLOCKS: Block[] = [
  {
    label: "Work",
    title: "Selected Work",
    body: "Real work across strategy, digital, and execution — built to improve clarity, trust, and business performance.",
    cta: { text: "View Examples", href: "#contact" },
  },
  {
    label: "Perspective",
    title: "Founder Perspective",
    body: "A point of view shaped by strategy, execution, and real-world commercial outcomes.",
    cta: { text: "About the Founder", href: "#about" },
  },
  {
    label: "Results",
    title: "Client Results",
    body: "Case studies, documented outcomes, and measurable improvements across selected engagements.",
    cta: { text: "View Results", href: "#contact" },
  },
];

export function Proof() {
  return (
    <section className="section">
      <div className="container-dn">
        <div className="max-w-[54ch]">
          <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
            Proof, built through real work.
            <span className="serif-display italic font-light text-ink/80 block">
              work, perspective, outcomes.
            </span>
          </h2>
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
                <Link href={b.cta.href} className="link-quiet">
                  {b.cta.text}
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-paper-line pt-12 md:mt-20">
          <span className="caption text-ink/40">Experience includes</span>
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
            {/* Logo images will be placed here */}
          </div>
        </div>
      </div>
    </section>
  );
}
