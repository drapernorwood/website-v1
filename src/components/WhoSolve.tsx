import type { ReactNode } from "react";

const WHO = [
  "businesses that are stronger than the market currently perceives",
  "companies whose website, messaging, or digital presence is not carrying the weight it should",
  "founders and teams with serious capability but too much external blur",
  "businesses that need strategic thinking and real execution, not more detached advice",
  "companies ready to apply AI and modern systems with judgment, not hype",
];

const SOLVE = [
  "positioning that is too vague, too generic, or too soft to compete well",
  "websites and digital assets that look acceptable but fail to earn action",
  "valuable offers that are not being framed with enough clarity or force",
  "fragmented digital experiences that weaken credibility",
  "execution gaps between intent and what actually ships",
  "unclear direction around AI, systems, and modern digital leverage",
];

export function WhoSolve() {
  return (
    <section className="section border-y border-paper-line bg-paper-soft/50">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-12 lg:gap-x-20">
          <div className="md:col-span-5">
            <Column
              heading={
                <>
                  Who it’s{" "}
                  <span className="serif-display italic font-light text-ink/80">
                    for
                  </span>
                </>
              }
              lead="We work with companies that have substance, but not yet the structure, positioning, or digital presence to express it with full force."
              items={WHO}
            />
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-24 lg:pt-32">
            <Column
              heading={
                <>
                  What it helps{" "}
                  <span className="serif-display italic font-light text-ink/80">
                    solve
                  </span>
                </>
              }
              lead="We help fix the gaps between capability and perception, strategy and execution, attention and trust."
              items={SOLVE}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Column({
  heading,
  lead,
  items,
}: {
  heading: ReactNode;
  lead: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="text-h2 font-medium tracking-tighter2 text-ink">
        {heading}
      </h3>

      <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.6] text-ink/70 md:text-[17px]">
        {lead}
      </p>

      <ul className="mt-10 divide-y divide-paper-line border-t border-paper-line">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-5 py-5 text-[16.5px] leading-[1.55] text-ink/80 md:text-[17.5px]"
          >
            <span
              aria-hidden="true"
              className="mt-[0.78em] inline-block h-px w-5 shrink-0 bg-ink/30"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
