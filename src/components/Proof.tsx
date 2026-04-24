"use client";

import { Fragment, ReactNode, useEffect, useState } from "react";
import Image from "next/image";

type Block = {
  label: string;
  title: string;
  body: string;
};

type Case = {
  work: { title: string; image: string; alt: string };
  perspective: { teaser: ReactNode; rest: ReactNode };
  result: { title: string; image: string; alt: string };
};

const BLOCKS: Block[] = [
  {
    label: "Work",
    title: "Selected Work",
    body: "Selected examples of positioning, digital, and execution work designed to sharpen clarity, strengthen trust, and improve business performance.",
  },
  {
    label: "Perspective",
    title: "Founder Perspective",
    body: "Strategic thinking shaped by real client work — where positioning, execution, and commercial reality have to align.",
  },
  {
    label: "Results",
    title: "Client Results",
    body: "Documented outcomes and selected examples of how clearer positioning, stronger digital assets, and better execution lead to measurable business improvement.",
  },
];

const CASES: Case[] = [
  {
    work: { title: "DataCenter Dynamics", image: "/dcd-work.png", alt: "DataCenter Dynamics Madrid event — digital marketing work" },
    perspective: {
      teaser: (
        <>
          The obvious move would have been to “promote the event.” That was not the real problem.
        </>
      ),
      rest: (
        <>
          The real constraint was precision: getting a global data center event in front of the right executives, with the right reason to pay attention, before the market tuned it out. <strong className="font-semibold text-ink">This is where strategy matters.</strong> <em>More outreach creates noise. Better targeting creates leverage.</em> The work was about turning event promotion into a sharper acquisition path.
        </>
      ),
    },
    result: { title: "DataCenter Dynamics", image: "/dcd-results.png", alt: "DataCenter Dynamics campaign results — audience and reach metrics" },
  },
  {
    work: { title: "Creator Secrets", image: "/cs-work.png", alt: "Creator Secrets — content system and platform strategy" },
    perspective: {
      teaser: (
        <>
          Most people treat content like output. <strong className="font-semibold text-ink">We treat it like a system.</strong>
        </>
      ),
      rest: (
        <>
          Creator Secrets came from watching the same pattern repeat across platforms: the right idea, packaged correctly and distributed in the right environment, can move from attention to revenue with surprising force. <em>One video did exactly that on Snapchat — not over months of posting, but through a single 3-day Spotlight distribution cycle.</em> The point was never just “make content.” The point was to understand the mechanics underneath visibility: <em>why people stop, why they act, and how attention becomes commercial movement.</em>
        </>
      ),
    },
    result: { title: "Creator Secrets", image: "/cs-results.png", alt: "Creator Secrets results — TikTok Shop revenue and growth metrics" },
  },
  {
    work: { title: "HealthLinks Podcast", image: "/hl-work.png", alt: "HealthLinks Podcast — brand and media strategy" },
    perspective: {
      teaser: (
        <>
          HealthLinks Magazine had something many businesses have: real value, but too many disconnected surfaces. Publication, audience, advertisers, media — all useful, but not fully aligned.
        </>
      ),
      rest: (
        <>
          <strong className="font-semibold text-ink">The opportunity was to make the brand work harder as a system.</strong> <em>Not more content for the sake of content. Not media sitting beside the business.</em> A clearer structure where trust, expertise, visibility, and sales support all reinforced each other.
        </>
      ),
    },
    result: { title: "HealthLinks Podcast", image: "/hl-results.png", alt: "HealthLinks Podcast results — provider reach and listenership growth" },
  },
  {
    work: { title: "The Lost Archives", image: "/la-work.png", alt: "The Lost Archives — discovery and packaging strategy" },
    perspective: {
      teaser: (
        <>
          Hidden material does not create impact just because it exists. <strong className="font-semibold text-ink">It needs a frame strong enough to make people care.</strong>
        </>
      ),
      rest: (
        <>
          For the University of Science and Philosophy — the Walter and Lao Russell institution at philosophy.org — <em>The Lost Archives turns rare recordings and buried intellectual-spiritual material into a discovery engine.</em> The archive becomes the source, but the system gives it motion: mystery, packaging, distribution, and a clear path from curiosity to deeper exploration.
        </>
      ),
    },
    result: { title: "The Lost Archives", image: "/la-results.png", alt: "The Lost Archives results — subscriber and catalogue metrics" },
  },
];

function ArtifactCell({
  image,
  alt,
  onExpand,
}: {
  image: string;
  alt: string;
  onExpand: (img: { src: string; alt: string }) => void;
}) {
  return (
    <div className="flex h-full flex-col bg-paper py-6 md:px-8 md:py-10">
      <button
        type="button"
        onClick={() => onExpand({ src: image, alt })}
        aria-label={`Expand ${alt}`}
        className="group relative block w-full overflow-hidden rounded-2xl aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </button>
    </div>
  );
}

function PerspectiveCell({
  index,
  teaser,
  rest,
  open,
  onToggle,
}: {
  index: number;
  teaser: ReactNode;
  rest: ReactNode;
  open: boolean;
  onToggle: (i: number) => void;
}) {
  const restId = `proof-rest-${index}`;
  return (
    <div className="flex h-full flex-col justify-center bg-paper py-6 md:px-8 md:py-10">
      <p className="text-[15px] leading-[1.7] text-ink/70">{teaser}</p>
      <div
        id={restId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-smooth ${open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="text-[15px] leading-[1.7] text-ink/70">{rest}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={open}
        aria-controls={restId}
        className="mt-4 self-start caption text-accent transition-colors duration-200 ease-smooth hover:text-ink"
      >
        {open ? "Read less" : "Read more"}
      </button>
    </div>
  );
}

export function Proof() {
  const [revealed, setRevealed] = useState(true);
  const [expanded, setExpanded] = useState<{ src: string; alt: string } | null>(null);
  const [openCase, setOpenCase] = useState<number | null>(null);

  const toggleCase = (i: number) => setOpenCase((prev) => (prev === i ? null : i));

  useEffect(() => {
    if (!expanded) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [expanded]);

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
            <button
              key={b.title}
              type="button"
              aria-expanded={revealed}
              aria-controls="proof-cases"
              onClick={() => setRevealed((r) => !r)}
              className="proof-card group relative flex h-full w-full flex-col border-b border-paper-line bg-paper py-6 text-left transition-colors duration-200 ease-smooth hover:bg-ink/[0.04] md:border-b-0 md:px-8 md:py-10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-smooth group-hover:scale-x-100"
              />
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
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
                <span
                  aria-hidden="true"
                  className={`inline-block text-accent transition-transform duration-300 ease-smooth ${revealed ? "rotate-180" : ""}`}
                >
                  ↓
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Expandable case grid */}
        <div
          id="proof-cases"
          aria-hidden={!revealed}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-smooth ${revealed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 border-b border-l border-r border-paper-line md:grid-cols-3 md:gap-px md:bg-paper-line">
              {CASES.map((c, i) => (
                <Fragment key={c.work.title}>
                  <ArtifactCell {...c.work} onExpand={setExpanded} />
                  <PerspectiveCell
                    index={i}
                    teaser={c.perspective.teaser}
                    rest={c.perspective.rest}
                    open={openCase === i}
                    onToggle={toggleCase}
                  />
                  <ArtifactCell {...c.result} onExpand={setExpanded} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-paper-line pt-12 md:mt-20">
          <span className="caption text-ink/40">Experience includes</span>
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
            {/* Logo images will be placed here */}
          </div>
        </div>
      </div>

      {/* Artifact lightbox */}
      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={expanded.alt}
          onClick={() => setExpanded(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-6 md:p-12"
        >
          <button
            type="button"
            onClick={() => setExpanded(null)}
            aria-label="Close"
            className="absolute right-6 top-6 text-paper text-3xl leading-none transition-opacity hover:opacity-70 md:right-10 md:top-10"
          >
            ×
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-[90vw]"
          >
            <Image
              src={expanded.src}
              alt={expanded.alt}
              width={1600}
              height={1600}
              className="block h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
