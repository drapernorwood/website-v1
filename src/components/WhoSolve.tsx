const WHO = [
  "companies with strong underlying value but weak positioning",
  "businesses whose website or messaging undersells what they actually do",
  "founders with too many moving parts and no clear external structure",
  "teams that need strategic thinking plus real execution",
  "companies that want to use AI and modern digital systems in practical, commercially useful ways",
];

const SOLVE = [
  "unclear positioning",
  "weak or outdated digital presence",
  "offers that are valuable but poorly communicated",
  "websites that do not convert trust into action",
  "fragmented digital experiences",
  "lack of strategic direction around AI, systems, and execution",
];

export function WhoSolve() {
  return (
    <section className="section border-y border-paper-line bg-paper-soft/50">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20 lg:gap-28">
          <Column label="Who" heading="Who we work with" items={WHO} />
          <Column
            label="What"
            heading="What we help solve"
            items={SOLVE}
          />
        </div>
      </div>
    </section>
  );
}

function Column({
  label,
  heading,
  items,
}: {
  label: string;
  heading: string;
  items: string[];
}) {
  return (
    <div>
      <span className="caption">{label}</span>
      <h3 className="mt-6 text-h2 font-medium tracking-tighter2 text-ink">
        {heading}
      </h3>

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
