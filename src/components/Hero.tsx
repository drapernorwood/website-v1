"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
const stages = [
  {
    name: "Material",
    caption:
      "Rare recordings. An institutional history. A body of knowledge waiting to be found.",
  },
  {
    name: "Perspective",
    caption:
      "The opportunity: give the archive a story, a point of entry, and a reason to keep exploring.",
  },
  {
    name: "Form",
    caption:
      "The Lost Archives. A discovery-driven media property for the University of Science and Philosophy.",
  },
];
export function Hero() {
  const [stage, setStage] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function selectStage(index: number) {
    setStage(index);
    tabs.current[index]?.focus();
  }
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="signal-dot" /> Strategy. Creative. Systems.
          Execution.
        </p>
        <h1 id="hero-title">
          The value
          <br />
          is already
          <br />
          <em>there.</em>
        </h1>
        <div className="hero-intro">
          <p>
            We find what makes a business valuable.
            <br className="desktop-break" /> Then give it a form the world can
            see.
          </p>
          <Link href="#work" className="text-link">
            See it in the work <span aria-hidden="true">↘</span>
          </Link>
        </div>
      </div>
      <div className="worktable" data-stage={stage}>
        <div className="worktable-top">
          <span className="eyebrow">The Lost Archives / Open case</span>
          <span className="folio">DN / 001</span>
        </div>
        <div
          id="study-panel"
          className="study-panel"
          role="tabpanel"
          aria-labelledby={`stage-${stage}`}
        >
          <div className="study-canvas">
            <figure className="material material-tapes">
              <Image
                src="/archive/tapes.webp"
                alt="Labeled U-matic videocassettes from the Lost Archives production archive"
                width={640}
                height={640}
                priority
                sizes="(max-width: 600px) 180px, 260px"
              />
              <figcaption>01 / Recordings</figcaption>
            </figure>
            <figure className="material material-newsletter">
              <Image
                src="/archive/newsletter.webp"
                alt="Page one of the 1954 News Letter, with Walter Russell, Lao Russell, and Swannanoa"
                width={1200}
                height={1552}
                priority
                sizes="(max-width: 600px) 140px, 220px"
              />
              <figcaption>02 / History</figcaption>
            </figure>
            <figure className="material material-frame">
              <Image
                src="/archive/earthship.webp"
                alt="Dennis Weaver and his wife beside a wall constructed from used tires"
                width={1280}
                height={720}
                priority
                sizes="(max-width: 600px) 180px, 270px"
              />
              <figcaption>03 / A human story</figcaption>
            </figure>
            <div className="perspective-note" aria-hidden={stage !== 1}>
              <span className="eyebrow">What we saw</span>
              <p>
                The archive needed
                <br />
                <em>a way in.</em>
              </p>
              <span className="annotation-line" />
            </div>
            <div className="formed-study" aria-hidden={stage !== 2}>
              <span className="eyebrow">
                University of Science and Philosophy
              </span>
              <p className="formed-title">
                The Lost
                <br />
                <em>Archives.</em>
              </p>
              <span className="formed-description">
                Positioning. Editorial structure.
                <br />
                Media packaging. Audience pathways.
              </span>
              <div className="formed-result">
                <strong>1.4M+</strong>
                <span>
                  Facebook views
                  <br />
                  Early launch window
                </span>
              </div>
              <Link
                tabIndex={stage === 2 ? 0 : -1}
                href="/work/the-lost-archives"
                className="formed-link"
              >
                Explore the case <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <span className="registration reg-tl" aria-hidden="true">
              +
            </span>
            <span className="registration reg-br" aria-hidden="true">
              +
            </span>
          </div>
          <p className="study-caption" aria-live="polite">
            {stages[stage].caption}
          </p>
        </div>
        <div
          className="study-tabs"
          role="tablist"
          aria-label="Explore the transformation"
        >
          {stages.map((item, index) => (
            <button
              ref={(el) => {
                tabs.current[index] = el;
              }}
              key={item.name}
              id={`stage-${index}`}
              type="button"
              role="tab"
              aria-selected={stage === index}
              aria-controls="study-panel"
              tabIndex={stage === index ? 0 : -1}
              onClick={() => setStage(index)}
              onKeyDown={(e) => {
                let next = stage;
                if (e.key === "ArrowRight") next = (stage + 1) % 3;
                else if (e.key === "ArrowLeft") next = (stage + 2) % 3;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = 2;
                else return;
                e.preventDefault();
                selectStage(next);
              }}
            >
              <span>0{index + 1}</span>
              {item.name}
              <span className="tab-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="hero-foot">
        <span>Real substance. Stronger form.</span>
        <p>
          For companies with more to offer
          <br />
          than their market currently understands.
        </p>
        <a
          href="#work"
          aria-label="Continue to selected work"
          className="down-link"
        >
          ↓
        </a>
      </div>
    </section>
  );
}
