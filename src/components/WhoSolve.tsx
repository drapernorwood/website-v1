import Image from "next/image";
import type { ReactNode } from "react";

const WHO = [
  "businesses that are stronger than the market currently perceives",
  "companies whose website, messaging, or digital presence is not carrying the weight it should",
  "founders and teams with serious capability but too much external blur",
  "businesses that need strategic thinking and real execution, not more detached advice",
  "companies ready to apply AI and modern systems with judgment, not hype",
];

export function WhoSolve() {
  return (
    <section className="section relative overflow-hidden border-y border-paper-line bg-paper-soft/50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none structural-carryover md:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[78%] w-[46%] -translate-y-1/2 select-none lg:block xl:w-[44%]"
      >
        <div className="image-fade-right relative h-full w-full">
          <Image
            src="/whiteboard.png"
            alt=""
            fill
            sizes="(min-width: 1280px) 44vw, 46vw"
            className="object-cover object-center opacity-95"
            style={{ filter: "contrast(0.92) brightness(1.02)" }}
          />
        </div>
      </div>

      <div className="container-dn relative">
        <div className="max-w-[65ch]">
          <Column
            heading={
              <>
                <span className="serif-display italic font-light text-ink/80">
                  Who
                </span>
                {" "}we help
              </>
            }
            lead="We work with companies that have substance, but not yet the structure, positioning, or digital presence to express it with full force."
            items={WHO}
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
  heading: ReactNode;
  lead: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="text-h2 font-medium tracking-tighter2 text-ink">
        {heading}
      </h3>

      <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-ink/70 md:text-[17px]">
        {lead}
      </p>

      <ul className="mt-10 divide-y divide-paper-line/75 border-t border-paper-line/75">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-4 py-4 text-[16.5px] leading-[1.55] text-ink/80 md:text-[17.5px]"
          >
            <span
              aria-hidden="true"
              className="mt-[0.78em] inline-block h-px w-5 shrink-0 bg-ink/40"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
