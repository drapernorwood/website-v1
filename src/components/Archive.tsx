"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";

type ReleaseState = "AVAILABLE" | "PREVIEW" | "COMING_SOON";

type EpisodeData = {
  id: number;
  state: ReleaseState;
  eyebrow: string;
  title: ReactNode;
  cardTitle: string;
  description: string;
  runtime: string;
  source: string;
  statusLabel: string;
  image: string;
  imageAlt: string;
  watchUrl?: string;
  audioUrl?: string;
  communityUrl?: string;
};

const EPISODES: EpisodeData[] = [
  {
    id: 1,
    state: "AVAILABLE",
    eyebrow: "VOL. 01 — NO. 001",
    // Update with actual Episode 1 copy
    title: (
      <>
        What God and Man Are
        <br />A Walter Russell Lecture
      </>
    ),
    cardTitle: "What God and Man Are — A Walter Russell Lecture",
    description:
      "A rare foundational recording from Swannanoa, where Walter Russell presents the central ideas of The Divine Iliad — the nature of God, the nature of man, and the cosmogonic principles that shaped the teachings of the University of Science and Philosophy.",
    runtime: "1H 04M",
    source: "SWANNANOA — DATE UNKNOWN",
    statusLabel: "AVAILABLE NOW",
    image: "/la-work.png",
    imageAlt: "Walter Russell — Swannanoa archive",
    watchUrl: "#",
    audioUrl: "#",
  },
  {
    id: 2,
    state: "PREVIEW",
    eyebrow: "VOL. 01 — NO. 002 — PREVIEW RELEASE",
    title: (
      <>
        The Message Lao Russell Said
        <br />
        the World Was Ready For
      </>
    ),
    cardTitle: "The Message Lao Russell Said the World Was Ready For",
    description:
      "A hidden 1988 interview from Swannanoa, where Lao Russell speaks on man's true purpose, the God-light within the body, love, character, Walter Russell, and the teachings she believed the world was finally ready to receive.",
    runtime: "1H 32M",
    source: "SWANNANOA — OCT. 1988",
    statusLabel: "AVAILABLE SOON",
    image: "/la-results.png",
    imageAlt: "Lao Russell — Swannanoa, 1988",
    communityUrl: "#",
  },
  {
    id: 3,
    state: "PREVIEW",
    eyebrow: "VOL. 01 — NO. 003 — PREVIEW RELEASE",
    title: (
      <>
        This Mistake Reopened
        <br />
        the Cold Fusion Question
      </>
    ),
    cardTitle: "This Mistake Reopened the Cold Fusion Question",
    description:
      "Ron Kovac traces an unexpected experiment involving magnetic fields, lithium-5, and Walter Russell's theory of transmutation, asking whether a control run gone wrong revealed something conventional science had missed.",
    runtime: "1H 11M",
    source: "USP HOMECOMING — 1994",
    statusLabel: "PREVIEW RELEASE",
    // ep3-card.png must be placed in the public/ directory
    image: "/ep3-card.png",
    imageAlt: "USP Homecoming — 1994",
    communityUrl: "#",
  },
  {
    id: 4,
    state: "COMING_SOON",
    eyebrow: "VOL. 01 — NO. 004",
    title: "From the Archive",
    cardTitle: "From the Archive",
    description: "",
    runtime: "TBA",
    source: "FROM THE ARCHIVE",
    statusLabel: "COMING SOON",
    image: "",
    imageAlt: "",
  },
];

function StatusDot({ state }: { state: ReleaseState }) {
  const colorClass =
    state === "AVAILABLE"
      ? "bg-accent"
      : state === "PREVIEW"
        ? "bg-amber-500/80"
        : "bg-ink/20";
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full ${colorClass}`}
    />
  );
}

function EpisodeCard({
  episode,
  isSelected,
  onSelect,
}: {
  episode: EpisodeData;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const isComingSoon = episode.state === "COMING_SOON";

  const inner = (
    <>
      {isSelected && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] bg-accent"
        />
      )}

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-soft">
        {episode.image ? (
          <Image
            src={episode.image}
            alt={episode.imageAlt}
            fill
            className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 grid-analytical opacity-30"
          />
        )}
      </div>

      {/* Text */}
      <div className="p-3 md:p-4">
        <span className="caption text-[9px] tracking-[0.22em] text-ink/35">
          NO. {String(episode.id).padStart(3, "0")}
        </span>
        <p
          className={[
            "mt-1.5 line-clamp-2 text-[12.5px] font-medium leading-[1.35]",
            isComingSoon ? "text-ink/30" : "text-ink",
          ].join(" ")}
        >
          {episode.cardTitle}
        </p>
        <div className="mt-2.5 flex items-center gap-1.5">
          <StatusDot state={episode.state} />
          <span
            className={[
              "text-[10px] font-medium uppercase tracking-[0.18em]",
              isComingSoon ? "text-ink/25" : "text-ink/40",
            ].join(" ")}
          >
            {episode.statusLabel}
          </span>
        </div>
      </div>
    </>
  );

  if (isComingSoon) {
    return (
      <div
        className="relative overflow-hidden rounded-xl border border-paper-line opacity-50 select-none"
        aria-label={`${episode.cardTitle} — coming soon`}
      >
        {inner}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      aria-label={`Select episode: ${episode.cardTitle}`}
      className={[
        "group relative overflow-hidden rounded-xl border text-left transition-all duration-200 ease-smooth",
        isSelected
          ? "border-ink/20 bg-paper-soft"
          : "border-paper-line hover:border-ink/20 hover:bg-paper-soft/60",
      ].join(" ")}
    >
      {inner}
    </button>
  );
}

export function Archive() {
  const [selectedId, setSelectedId] = useState<number>(1);

  const featured = EPISODES.find((ep) => ep.id === selectedId) ?? EPISODES[0];

  return (
    <section className="section">
      <div className="container-dn">

        {/* Section header */}
        <div className="max-w-[52ch]">
          <span className="eyebrow mb-4 block">From the Archive</span>
          <h2 className="text-h2 font-medium tracking-tighter2 text-ink">
            The Lost Archives
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-ink/60">
            Rare recordings and recovered material from the University of
            Science and Philosophy — selected, sequenced, and released over
            time.
          </p>
        </div>

        {/* Featured episode panel */}
        <div
          className="mt-14 border-t border-paper-line pt-10 md:mt-20 md:pt-14"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_320px] md:gap-14 lg:grid-cols-[1fr_380px] lg:gap-20">

            {/* Left: text content */}
            <div>
              <span className="eyebrow block">{featured.eyebrow}</span>

              <h3 className="mt-5 text-h1 font-medium tracking-tightest text-ink">
                <span className="serif-display italic font-light">
                  {featured.title}
                </span>
              </h3>

              {featured.description && (
                <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.72] text-ink/65">
                  {featured.description}
                </p>
              )}

              {/* Meta rail */}
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-paper-line pt-6">
                <div className="rail-item">
                  <span className="rail-label">Runtime</span>
                  <span className="rail-value">{featured.runtime}</span>
                </div>
                <div className="rail-item">
                  <span className="rail-label">Source</span>
                  <span className="rail-value">{featured.source}</span>
                </div>
              </div>

              {/* Status indicator */}
              <div className="mt-5 flex items-center gap-2">
                <StatusDot state={featured.state} />
                <span className="caption">{featured.statusLabel}</span>
              </div>

              {/* CTAs — state-gated */}
              <div className="mt-6">
                {featured.state === "AVAILABLE" && (
                  <div className="flex flex-wrap gap-3">
                    <a href={featured.watchUrl} className="btn-primary">
                      Watch Now
                    </a>
                    <a href={featured.audioUrl} className="btn-secondary">
                      Listen to Audio
                    </a>
                  </div>
                )}

                {featured.state === "PREVIEW" && (
                  <div>
                    <div className="flex flex-wrap gap-3">
                      <a href={featured.communityUrl} className="btn-secondary">
                        Join the Community
                      </a>
                    </div>
                    <p className="mt-3 text-[13px] leading-[1.6] text-ink/45">
                      Selected for release. Public access opens soon.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: episode image */}
            <div className="order-first md:order-last">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-paper-soft">
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Episode card row */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 md:grid-cols-4">
          {EPISODES.map((ep) => (
            <EpisodeCard
              key={ep.id}
              episode={ep}
              isSelected={ep.id === selectedId}
              onSelect={() => setSelectedId(ep.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
