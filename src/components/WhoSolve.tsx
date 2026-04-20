const WHO = [
  "businesses that are stronger than the market currently perceives",
  "companies whose website, messaging, or digital presence is not carrying the weight it should",
  "founders and teams with serious capability but too much external blur",
  "businesses that need strategic thinking and real execution, not more detached advice",
  "companies looking to use AI and modern systems with judgment to improve efficiency, customer experience, or profitability",
];

const SOLVE = [
  "positioning that is too vague, too generic, or too soft to compete well",
  "websites and digital assets that look acceptable but fail to earn action",
  "valuable offers that are not being framed with enough clarity or force",
  "fragmented digital experiences that weaken credibility",
  "execution gaps between what the business knows it should do and what actually gets built",
  "unclear direction around AI, systems, and modern digital leverage",
];

export function WhoSolve() {
  return (
    <section className="section border-y border-paper-line bg-paper-soft/50">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20 lg:gap-28">
          <Column
            heading="Who it’s for"
            lead="We work with companies that have substance, but not yet the structure, positioning, or digital presence to express it with full force."
            items={WHO}
          />
          <Column
            heading="What it helps solve"
            lead="We help fix the gaps between capability and perception, strategy and execution, attention and trust."
            items={SOLVE}
          />
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
  heading: string;
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
