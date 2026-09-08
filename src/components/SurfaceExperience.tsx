"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { BusinessCutaway, layerForFocus } from "./BusinessCutaway";
import { type BusinessLayer } from "./LayerInspection";
import { CTASection } from "./CTASection";
import {
  perspectives,
  focusKeys,
  suggestFocus,
  type Focus,
} from "@/lib/perspectives";
import { cases } from "@/lib/work";

type FirstRead = {
  url: string;
  title: string;
  description: string;
  heading: string;
  observations: { label: string; detail: string }[];
  hypothesis: string;
  nextStep: string;
  sourceNote: string;
};
export function SurfaceExperience() {
  const [depth, setDepth] = useState(0);
  const [inspectedLayer, setInspectedLayer] = useState<BusinessLayer | null>(
    null,
  );
  const [focus, setFocus] = useState<Focus | null>(null);
  const [challenge, setChallenge] = useState("");
  const [routingNote, setRoutingNote] = useState("");
  const [website, setWebsite] = useState("");
  const [read, setRead] = useState<FirstRead | null>(null);
  const [readFocus, setReadFocus] = useState<Focus | null>(null);
  const [reading, setReading] = useState(false);
  const [readError, setReadError] = useState("");
  const [prefill, setPrefill] = useState("");
  const [copyState, setCopyState] = useState(false);
  const [savedChallenge, setSavedChallenge] = useState("");
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const readHeading = useRef<HTMLHeadingElement>(null);
  const controller = useRef<AbortController | null>(null);
  const p = focus ? perspectives[focus] : null;
  const caseOrder = p?.caseOrder || [
    "datacenter-dynamics",
    "creator-secrets",
    "healthlinks",
    "the-lost-archives",
  ];
  function lookWithin(layer: BusinessLayer) {
    setDepth(100);
    setInspectedLayer(layer);
    requestAnimationFrame(() =>
      document.getElementById("business-object")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      }),
    );
  }
  function choose(next: Focus, showPerspective = false) {
    setFocus(next);
    setDepth(100);
    setRoutingNote("");
    setRead(null);
    setReadError("");
    setCopyState(false);
    controller.current?.abort();
    setReading(false);
    if (!showPerspective) {
      lookWithin(layerForFocus[next]);
      return;
    }
    setInspectedLayer(null);
    requestAnimationFrame(() => {
      document.getElementById("services")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      resultHeading.current?.focus({ preventScroll: true });
    });
  }
  function routeChallenge(event: FormEvent) {
    event.preventDefault();
    const value = challenge.trim();
    if (!value) return;
    const suggested = suggestFocus(value);
    setSavedChallenge(value);
    if (suggested) {
      choose(suggested);
      setRoutingNote(
        `A starting lens: ${perspectives[suggested].discipline.toLowerCase()}. You can change it above.`,
      );
    } else
      setRoutingNote(
        "There may be more than one way into this. Choose the closest starting point above, or bring your question to a conversation.",
      );
  }
  async function inspect(event: FormEvent) {
    event.preventDefault();
    if (!focus || reading) return;
    setReading(true);
    setReadError("");
    setRead(null);
    setCopyState(false);
    controller.current?.abort();
    const active = new AbortController();
    controller.current = active;
    try {
      const response = await fetch("/api/first-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: website, focus }),
        signal: active.signal,
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            "We couldn’t read that page. Try its public homepage.",
        );
      setRead(result);
      setReadFocus(focus);
      requestAnimationFrame(() =>
        readHeading.current?.focus({ preventScroll: true }),
      );
    } catch (error) {
      if (!active.signal.aborted)
        setReadError(
          error instanceof Error
            ? error.message
            : "We couldn’t read that page. Please try again.",
        );
    } finally {
      if (!active.signal.aborted) setReading(false);
    }
  }
  function brief() {
    return [
      "DRAPER NORWOOD / A STARTING PERSPECTIVE",
      p?.discipline || "Strategy, web, and AI execution",
      savedChallenge ? `Your challenge: ${savedChallenge}` : "",
      read ? `Public page: ${read.url}` : "",
      read ? `Page title: ${read.title}` : "",
      ...(read?.observations.map((x) => `${x.label}: ${x.detail}`) || []),
      "WORKING HYPOTHESIS",
      read?.hypothesis || p?.hypothesis || "",
      "A USEFUL NEXT STEP",
      read?.nextStep || p?.nextStep || "",
      read?.sourceNote ||
        "Based on the challenge you selected. A starting point for discussion, not an assessment of your company.",
      "hello@drapernorwood.com",
    ]
      .filter(Boolean)
      .join("\n\n");
  }
  function downloadBrief() {
    const blob = new Blob([brief()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "draper-norwood-starting-perspective.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setCopyState(true);
  }
  function takeToContact() {
    setPrefill(brief());
    document.getElementById("contact")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <div
      className="surface-experience"
      style={{ "--signal": p?.color || "#e7b28b" } as CSSProperties}
      data-focus={focus || "all"}
    >
      <section
        className="arrival arrival-refined"
        aria-labelledby="arrival-title"
      >
        <div className="arrival-copy">
          <h1 id="arrival-title">
            <span>There’s more</span>
            <span>to your</span>
            <span>business.</span>
          </h1>
          <p className="arrival-intro">
            Strategy, websites, and AI systems—built around what makes your
            business valuable.
          </p>
          <button
            className="reveal-button"
            onClick={() => {
              setInspectedLayer(null);
              setDepth(depth > 45 ? 0 : 100);
            }}
            aria-pressed={depth > 45}
          >
            <span className="round-icon" aria-hidden="true">
              {depth > 45 ? "−" : "+"}
            </span>
            {depth > 45 ? "Close the model" : "Look inside"}
          </button>
          <a className="arrival-shortcut" href="#explore">
            Make it about your business <span aria-hidden="true">↘</span>
          </a>
        </div>
        <BusinessCutaway
          depth={depth}
          setDepth={setDepth}
          focus={focus}
          inspectedLayer={inspectedLayer}
          onInspect={setInspectedLayer}
          onChooseFocus={(next) => choose(next, true)}
        />
      </section>

      <section
        className="invitation"
        id="explore"
        aria-labelledby="explore-title"
      >
        <div className="section-kicker">
          <span>01 / CHANGE THE PERSPECTIVE</span>
          <span>YOUR BUSINESS, IN VIEW</span>
        </div>
        <div className="invitation-heading">
          <h2 id="explore-title">
            Where should
            <br />
            your business be <em>stronger?</em>
          </h2>
          <p>
            Start with what’s on your mind. <br />
            The experience will follow.
          </p>
        </div>
        <div className="focus-options" aria-label="Choose a business challenge">
          {focusKeys.map((key) => (
            <button
              key={key}
              aria-pressed={focus === key}
              onClick={() => choose(key)}
              className={focus === key ? "selected" : ""}
            >
              <span className="option-number">{perspectives[key].number}</span>
              <strong>{perspectives[key].label}</strong>
              <span className="option-discipline">
                {perspectives[key].discipline}
              </span>
              <span className="option-arrow" aria-hidden="true">
                {focus === key ? "↙" : "↗"}
              </span>
            </button>
          ))}
        </div>
        <form className="own-words" onSubmit={routeChallenge}>
          <label htmlFor="challenge">Or, in your own words</label>
          <div>
            <input
              id="challenge"
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              maxLength={600}
              placeholder="We have good people, but too much still lives in their heads…"
            />
            <button
              type="submit"
              aria-label="Find a starting perspective"
              disabled={!challenge.trim()}
            >
              ↗
            </button>
          </div>
        </form>
        <p className="routing-note" role="status">
          {routingNote ||
            (!focus
              ? "Choose a starting point to bring the next layer into view."
              : "This is a starting point. The real constraint may connect several kinds of work.")}
        </p>
      </section>

      {p && focus ? (
        <section
          className="personal-lens"
          id="services"
          aria-labelledby="lens-title"
        >
          <div className="lens-heading">
            <span className="eyebrow">YOUR LENS / {p.discipline}</span>
            <a href="#explore" className="change-lens">
              Change the perspective <span aria-hidden="true">↖</span>
            </a>
            <span className="lens-number" aria-hidden="true">
              {p.number}
            </span>
            <h2 id="lens-title" ref={resultHeading} tabIndex={-1}>
              {p.title[0]}
              <br />
              <em>{p.title[1]}</em>
            </h2>
            <p>{p.intro}</p>
          </div>
          <div className="lens-body">
            <div className="lens-connection">
              <span className="eyebrow">THE PARTS WORK TOGETHER</span>
              <div>
                {{
                  positioning: [
                    "Expertise",
                    "A clear offer",
                    "A reason to choose",
                  ],
                  digital: ["Positioning", "Proof", "A better website"],
                  systems: ["Knowledge", "Human judgment", "Useful systems"],
                  growth: [
                    "A strong idea",
                    "The right audience",
                    "A next step",
                  ],
                }[focus].map((part, index) => (
                  <p key={part}>
                    <span>0{index + 1}</span>
                    {part}
                    {index < 2 ? <i aria-hidden="true">↓</i> : null}
                  </p>
                ))}
              </div>
              <button
                className="underlined-link"
                onClick={() => lookWithin(layerForFocus[focus])}
              >
                Look inside this connection <span aria-hidden="true">↗</span>
              </button>
            </div>
            <div className="lens-copy">
              <span className="eyebrow">WHAT WE’RE LOOKING AT</span>
              <h3>{p.underneath}</h3>
              <p>{p.hypothesis}</p>
              <div className="build-list">
                <span className="eyebrow">WHAT WE CAN BUILD</span>
                {p.outputs.map((item, i) => (
                  <div key={item}>
                    <span>0{i + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
              <button className="underlined-link" onClick={takeToContact}>
                Explore this together <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
          <div className="first-read" id="first-read">
            <div className="read-intro">
              <span className="eyebrow">A LITTLE MORE SPECIFIC</span>
              <h3>
                Bring your business
                <br />
                <em>into view.</em>
              </h3>
              <p>
                Give us a public website. We’ll read the page and assemble a
                starting perspective through your chosen lens.
              </p>
            </div>
            <form onSubmit={inspect} className="read-form" aria-busy={reading}>
              <label htmlFor="website-read">Your website</label>
              <div className="read-input-row">
                <input
                  id="website-read"
                  type="text"
                  inputMode="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                  maxLength={2048}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="yourcompany.com"
                />
                <button disabled={reading} type="submit">
                  {reading ? "Reading the page…" : "Take a first look"}
                  <span aria-hidden="true">{reading ? "◌" : "↗"}</span>
                </button>
              </div>
              <p className="read-explanation">
                A public-page check. No sign-up. No internal access.
              </p>
              {readError ? (
                <p className="read-error" role="alert">
                  {readError}
                </p>
              ) : null}
              <p className="sr-only" role="status">
                {reading
                  ? "Reading public page content and preparing observations."
                  : ""}
              </p>
            </form>
            {read && readFocus === focus ? (
              <div className="read-result">
                <div className="read-result-heading">
                  <span className="eyebrow">
                    FIRST READ / {new URL(read.url).hostname}
                  </span>
                  <h4 ref={readHeading} tabIndex={-1}>
                    {read.title || read.heading || "Your public presence"}
                  </h4>
                  <a href={read.url} target="_blank" rel="noreferrer">
                    Source page <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
                <div className="read-observations">
                  {read.observations.map((item, i) => (
                    <article key={item.label}>
                      <span className="eyebrow">0{i + 1} / OBSERVED</span>
                      <h5>{item.label}</h5>
                      <p>{item.detail}</p>
                    </article>
                  ))}
                </div>
                <div className="read-hypothesis">
                  <div>
                    <span className="eyebrow">A WORKING HYPOTHESIS</span>
                    <p>{read.hypothesis}</p>
                  </div>
                  <div>
                    <span className="eyebrow">A USEFUL NEXT STEP</span>
                    <p>{read.nextStep}</p>
                  </div>
                </div>
                <p className="read-source-note">{read.sourceNote}</p>
                <div className="read-actions">
                  <button className="underlined-link" onClick={downloadBrief}>
                    {copyState ? "Download again" : "Keep this perspective"}
                    <span aria-hidden="true">↓</span>
                  </button>
                  <button className="underlined-link" onClick={takeToContact}>
                    Talk about this <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="unselected-note" id="services">
          <p>
            A sharper offer. A better website. A useful AI system.
            <br />
            <span>
              Different ways into the same question: what would make the
              business stronger?
            </span>
          </p>
          <a href="#explore">Choose your starting point ↑</a>
        </section>
      )}

      <section className="evidence-section" id="work">
        <div className="section-kicker">
          <span>02 / THINKING, MADE REAL</span>
          <span>
            {p
              ? `SELECTED THROUGH YOUR ${focus?.toUpperCase()} LENS`
              : "SELECTED WORK"}
          </span>
        </div>
        <div className="evidence-heading">
          <h2>
            The work
            <br />
            has <em>consequences.</em>
          </h2>
          <p>
            Different businesses. Different constraints.
            <br />A shared discipline: see clearly, then build.
          </p>
        </div>
        <div className="case-index">
          {caseOrder.map((slug, i) => {
            const c = cases.find((item) => item.slug === slug)!;
            return (
              <Link
                key={c.slug}
                className="evidence-row"
                href={`/work/${c.slug}`}
              >
                <span className="evidence-num">0{i + 1}</span>
                <div className="evidence-name">
                  <span className="eyebrow">{c.discipline}</span>
                  <h3>
                    {c.slug === "datacenter-dynamics" ? (
                      <>
                        Datacenter
                        <wbr />
                        Dynamics
                      </>
                    ) : (
                      c.name
                    )}
                  </h3>
                </div>
                <p>{c.short}</p>
                <span className="evidence-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            );
          })}
        </div>
        <p className="evidence-note">
          Every case separates the situation, our contribution, and the
          available evidence.
        </p>
      </section>

      <section className="practice-statement" id="about">
        <div className="practice-mark" aria-hidden="true">
          <Image
            src="/brand/dn-logo.png"
            alt=""
            width={2000}
            height={2000}
            sizes="450px"
          />
        </div>
        <div className="practice-statement-copy">
          <p className="eyebrow">THE DRAPER NORWOOD PRACTICE</p>
          <h2>
            See the whole.
            <br />
            <em>Make the difference.</em>
          </h2>
          <p>
            Businesses don’t arrive neatly divided into strategy, design,
            technology, and execution. Neither should the thinking.
          </p>
          <p>
            We find the constraint, connect the right disciplines, and stay with
            the work until it becomes something useful.
          </p>
          <div className="founder-signoff">
            <span>James Crawford</span>
            <small>FOUNDER / DRAPER NORWOOD</small>
          </div>
        </div>
      </section>
      <CTASection initialMessage={prefill} />
    </div>
  );
}
