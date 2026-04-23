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
    <section className="relative overflow-hidden section border-y border-paper-line bg-paper-soft/50">
      {/* Whiteboard — full section height, right side flush to screen edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 left-[45%] hidden select-none overflow-hidden md:block"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 30%, black 62%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 30%, black 62%)",
        }}
      >
        <Image
          src="/whiteboard.png"
          alt=""
          fill
          className="object-cover object-right-top opacity-95"
          sizes="55vw"
        />
      </div>

      <div className="container-dn">
        <div className="md:grid md:grid-cols-2">
          <div className="md:pr-10 lg:pr-16">
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

      <ul className="mt-10 divide-y divide-paper-line/75 border-t border-paper-line/75">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-4 py-4 text-[16.5px] leading-[1.55] text-ink/80 md:text-[17.5px]"
          >
            <span
              aria-hidden="true"
              className="mt-[0.78em] inline-block h-px w-5 shrink-0 bg-ink/20"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
