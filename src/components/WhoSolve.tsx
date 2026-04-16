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
    <section className="section bg-paper-soft/50 border-y border-paper-line">
      <div className="container-dn">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <Column
            index="02"
            eyebrow="Who we serve"
            heading="Who we work with"
            items={WHO}
          />
          <Column
            index="03"
            eyebrow="What we solve"
            heading="What we help solve"
            items={SOLVE}
          />
        </div>
      </div>
    </section>
  );
}

function Column({
  index,
  eyebrow,
  heading,
  items,
}: {
  index: string;
  eyebrow: string;
  heading: string;
  items: string[];
}) {
  return (
    <div>
      <p className="eyebrow">
        {index} — {eyebrow}
      </p>
      <h3 className="mt-3 text-h2 font-medium text-ink">{heading}</h3>

      <ul className="mt-10 divide-y divide-paper-line border-t border-paper-line">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-4 py-5 text-[16px] leading-relaxed text-ink/85 md:text-[17px]"
          >
            <span
              aria-hidden="true"
              className="mt-[0.7em] inline-block h-px w-4 shrink-0 bg-ink/30"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
