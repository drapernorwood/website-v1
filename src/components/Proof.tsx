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
    body: "Selected examples of positioning, digital, and execution work designed to sharpen clarity, strengthen trust, and improve business performance.",
    cta: { text: "View Examples", href: "#contact" },
  },
  {
    label: "Perspective",
    title: "Founder Perspective",
    body: "Strategic thinking shaped by real client work — where positioning, execution, and commercial reality have to align.",
    cta: { text: "About the Founder", href: "#about" },
  },
  {
    label: "Results",
    title: "Client Results",
    body: "Documented outcomes and selected examples of how clearer positioning, stronger digital assets, and better execution lead to measurable business improvement.",
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
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-paper-line md:mt-20 md:grid-cols-3 md:gap-px md:bg-paper-line md:border-l md:border-r">
          {BLOCKS.map((b, i) => (
            <article
              key={b.title}
              className="proof-card flex h-full flex-col border-b border-paper-line bg-paper py-6 md:border-b-0 md:px-8 md:py-10"
            >
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="serif-display italic font-light text-[24px] leading-none text-ink/[0.22] md:text-[30px]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="caption">{b.label}</span>
              </div>

              <h3 className="mt-6 text-[22px] font-medium leading-[1.18] tracking-tight text-ink md:mt-8 md:text-[26px]">
                {b.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-[15.5px] leading-[1.6] text-ink/70 md:text-[16px]">
                {b.body}
              </p>

              <div className="mt-auto pt-6 md:pt-8">
                <Link href={b.cta.href} className="link-quiet">
                  {b.cta.text}
                  <span aria-hidden="true">→</span>
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
