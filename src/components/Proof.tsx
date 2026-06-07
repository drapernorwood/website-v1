"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

type Block = {
  label: string;
  title: string;
  body: string;
};

type Case = {
  work: { title: ReactNode; image: string; alt: string };
  perspective: { teaser: ReactNode; rest: ReactNode };
  result: { title: ReactNode; image: string; alt: string };
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
    work: { title: "The Lost Archives", image: "/la-work.png", alt: "The Lost Archives — discovery and packaging strategy" },
    perspective: {
      teaser: (
        <>
          The Lost Archives began with rare material that already had gravity. <strong className="font-semibold text-ink">The work was not to make it louder.</strong>
        </>
      ),
      rest: (
        <>
          <p>
            It was to give it the right form: context, pacing, tone, visual
            language, and packaging that helped people feel the weight of what
            had been hidden.
          </p>
          <p>
            For the University of Science and Philosophy — the Walter and Lao
            Russell institution at philosophy.org — that meant turning rare
            recordings and buried material into{" "}
            <em>a discovery-driven media property</em> with a clear path from
            curiosity to deeper exploration.
          </p>
        </>
      ),
    },
    result: { title: "The Lost Archives", image: "/la-results-1.png", alt: "The Lost Archives results — subscriber and catalogue metrics" },
  },
  {
    work: { title: "DataCenter Dynamics", image: "/dcd-work.png", alt: "DataCenter Dynamics Madrid event — digital marketing work" },
    perspective: {
      teaser: (
        <>
          The obvious move would have been to “promote the event.” <strong className="font-semibold text-ink">That was not the real problem.</strong>
        </>
      ),
      rest: (
        <>
          <p>
            The real constraint was <em>precision</em>: getting a global data center event in front of the right executives, with the right reason to pay attention, before the market tuned it out.
          </p>
          <p>
            <strong className="font-semibold text-ink">This is where strategy matters.</strong> <em>More outreach creates noise. Better targeting creates leverage.</em>
          </p>
        </>
      ),
    },
    result: { title: "DataCenter Dynamics", image: "/dcd-results.png", alt: "DataCenter Dynamics campaign results — audience and reach metrics" },
  },
  {
    work: { title: <em>Creator Secrets</em>, image: "/cs-work.png", alt: "Creator Secrets — content system and platform strategy" },
    perspective: {
      teaser: (
        <>
          Most people treat content like output. <strong className="font-semibold text-ink">We treat it like a system.</strong>
        </>
      ),
      rest: (
        <>
          <p>
            Creator Secrets came from watching the same pattern repeat across platforms: the right idea, packaged correctly and distributed in the right environment, can move from attention to revenue with surprising force.
          </p>
          <p>
            One video did <em>exactly that</em> on Snapchat — not over months of posting, but through <strong className="font-semibold text-ink">a single 3-day Spotlight distribution cycle.</strong>
          </p>
          <p>
            The point was to understand the mechanics underneath visibility: <em>why people stop, why they act, and how attention becomes commercial movement.</em>
          </p>
        </>
      ),
    },
    result: { title: <em>Creator Secrets</em>, image: "/cs-results.png", alt: "Creator Secrets results — TikTok Shop revenue and growth metrics" },
  },
  {
    work: { title: "HealthLinks Podcast", image: "/hl-work.png", alt: "HealthLinks Podcast — brand and media strategy" },
    perspective: {
      teaser: (
        <>
          HealthLinks Magazine had something many businesses have: <strong className="font-semibold text-ink">real value, but too many disconnected elements:</strong>
        </>
      ),
      rest: (
        <>
          <p>
            Publication, audience, advertisers, media — all useful, but not fully aligned.
          </p>
          <p>
            <strong className="font-semibold text-ink">The opportunity was to make the brand work harder as a system.</strong> <em>Not more content for the sake of content. Not media sitting beside the business.</em> A clearer structure where trust, expertise, visibility, and sales support all reinforced each other.
          </p>
        </>
      ),
    },
    result: { title: "HealthLinks Podcast", image: "/hl-results.png", alt: "HealthLinks Podcast results — provider reach and listenership growth" },
  },
];

function ArtifactCell({
  image,
  alt,
  label,
  marker = "work",
  onExpand,
}: {
  image: string;
  alt: string;
  label: string;
  marker?: "work" | "result";
  onExpand: (img: { src: string; alt: string }) => void;
}) {
  const isResult = marker === "result";
  return (
    <div className="relative isolate flex h-full flex-col bg-paper py-4 md:py-10 md:px-8">
      {/* Ground motif: Source Material = raw structure lines; Result = filled with
          texture. Same paper brightness throughout — only the motif progresses. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${
          isResult ? "grain-paper" : "grid-fine"
        }`}
      />
      {/* Result reads as filled-in substance: full grain over a whisper of added density */}
      {isResult && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-ink/[0.02]"
        />
      )}
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
      {/* Dossier caption — Result carries the single accent: hidden value made legible */}
      <div className="relative mt-3 flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${isResult ? "bg-accent" : "bg-ink/25"}`}
        />
        <span className={`caption ${isResult ? "text-accent" : "text-ink/40"}`}>
          {label}
        </span>
      </div>
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
    <div className="relative isolate flex h-full flex-col justify-center bg-paper py-4 md:py-10 md:px-8">
      {/* Filling-in stage: structure lines with grain beginning to come through */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid-fine" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grain-paper opacity-40" />
      <span className="caption mb-3 md:hidden">Perspective</span>
      <p className="text-[15px] leading-[1.7] text-ink/70">{teaser}</p>
      <div
        id={restId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-smooth ${open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 text-[15px] leading-[1.7] text-ink/70">{rest}</div>
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
    <section className="section relative overflow-hidden">
      {/* Faint structural field — proof grounded in measured structure */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-70"
      />
      {/* Paper grain — eased back here so the structural grid reads through */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grain-paper opacity-60"
      />

      <div className="container-dn relative">
        <div className="max-w-[54ch]">
          <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
            Proof, built through real work.
          </h2>
        </div>

        <div className="hidden md:mt-20 md:grid md:grid-cols-3 md:gap-px md:bg-paper-line md:border-t md:border-l md:border-r md:border-paper-line">
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
          className={`mt-10 md:mt-0 grid transition-[grid-template-rows,opacity] duration-500 ease-smooth ${revealed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="md:grid md:grid-cols-3 md:gap-px md:bg-paper-line md:border-b md:border-l md:border-r md:border-paper-line">
              {CASES.map((c, i) => (
                <div
                  key={i}
                  className="mt-10 first:mt-6 border-t border-paper-line pt-6 md:contents"
                >
                  {/* Clean full-width band between cases — separates entries and keeps
                      the column grounds from running into one continuous stripe */}
                  {i > 0 && (
                    <div aria-hidden="true" className="hidden md:block md:col-span-3 h-12 bg-paper" />
                  )}
                  {/* Mobile-only case heading — md:contents collapses the wrapper on desktop */}
                  <div className="md:hidden flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="serif-display italic font-light text-[22px] leading-none text-ink/[0.22]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="caption">{c.work.title}</span>
                  </div>
                  <ArtifactCell {...c.work} label="Source Material" marker="work" onExpand={setExpanded} />
                  <PerspectiveCell
                    index={i}
                    teaser={c.perspective.teaser}
                    rest={c.perspective.rest}
                    open={openCase === i}
                    onToggle={toggleCase}
                  />
                  <ArtifactCell {...c.result} label="Result" marker="result" onExpand={setExpanded} />
                </div>
              ))}
            </div>
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
