"use client";

import { Fragment, useState } from "react";
import Image from "next/image";

type Block = {
  label: string;
  title: string;
  body: string;
};

type Case = {
  work: { title: string; image: string; alt: string };
  perspective: { body: string };
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
      body: `The obvious move would have been to “promote the event.” That was not the real problem. The real constraint was precision: getting a global data center event in front of the right executives, with the right reason to pay attention, before the market tuned it out. This is where strategy matters. More outreach creates noise. Better targeting creates leverage. The work was about turning event promotion into a sharper acquisition path.`,
    },
    result: { title: "DataCenter Dynamics", image: "/dcd-results.png", alt: "DataCenter Dynamics campaign results — audience and reach metrics" },
  },
  {
    work: { title: "Creator Secrets", image: "/cs-work.png", alt: "Creator Secrets — content system and platform strategy" },
    perspective: {
      body: `Most people treat content like output. I treat it like a system. Creator Secrets came from watching the same pattern repeat across platforms: the right idea, packaged correctly, distributed in the right environment, can move from attention to revenue with surprising force. The point was never just "make content." The point was to understand the mechanics underneath visibility — why people stop, why they act, and how attention becomes commercial movement.`,
    },
    result: { title: "Creator Secrets", image: "/cs-results.png", alt: "Creator Secrets results — TikTok Shop revenue and growth metrics" },
  },
  {
    work: { title: "HealthLinks Podcast", image: "/hl-work.png", alt: "HealthLinks Podcast — brand and media strategy" },
    perspective: {
      body: "HealthLinks had something many businesses have: real value, but too many disconnected surfaces. Publication, audience, providers, sales conversations, media — all useful, but not fully aligned. The opportunity was to make the brand work harder as a system. Not more content for the sake of content. Not media sitting beside the business. A clearer structure where trust, expertise, visibility, and sales support all reinforced each other.",
    },
    result: { title: "HealthLinks Podcast", image: "/hl-results.png", alt: "HealthLinks Podcast results — provider reach and listenership growth" },
  },
  {
    work: { title: "The Lost Archives", image: "/la-work.png", alt: "The Lost Archives — discovery and packaging strategy" },
    perspective: {
      body: "Hidden material does not create impact just because it exists. It needs a frame strong enough to make people care. The Lost Archives is built on that conviction. The work is not simply publishing old recordings; it is turning buried intellectual and spiritual material into a discovery engine. The archive becomes the source, but the system is what gives it motion: mystery, packaging, distribution, and a clear path from curiosity to deeper exploration.",
    },
    result: { title: "The Lost Archives", image: "/la-results.png", alt: "The Lost Archives results — subscriber and catalogue metrics" },
  },
];

function ArtifactCell({ title, image, alt }: { title: string; image: string; alt: string }) {
  return (
    <div className="flex h-full flex-col bg-paper py-6 md:px-8 md:py-10">
      <div className="relative w-full overflow-hidden rounded-2xl aspect-square">
        <Image src={image} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <p className="mt-4 text-[14px] font-medium leading-[1.3] tracking-tight text-ink">{title}</p>
    </div>
  );
}

function PerspectiveCell({ body }: { body: string }) {
  return (
    <div className="flex h-full flex-col justify-center bg-paper py-6 md:px-8 md:py-10">
      <p className="text-[15px] leading-[1.7] text-ink/70">{body}</p>
    </div>
  );
}

export function Proof() {
  const [revealed, setRevealed] = useState(false);

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
              onClick={() => setRevealed(true)}
              className="proof-card flex h-full w-full flex-col border-b border-paper-line bg-paper py-6 text-left md:border-b-0 md:px-8 md:py-10"
            >
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
                  className={`inline-block text-accent transition-transform duration-300 ease-smooth ${revealed ? "translate-y-1" : ""}`}
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
              {CASES.map((c) => (
                <Fragment key={c.work.title}>
                  <ArtifactCell {...c.work} />
                  <PerspectiveCell body={c.perspective.body} />
                  <ArtifactCell {...c.result} />
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
    </section>
  );
}
