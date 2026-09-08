"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { type Focus } from "@/lib/perspectives";
import { WorkingModel } from "./WorkingModel";

export type BusinessLayer = "presence" | "value" | "operations";

const content: Record<
  BusinessLayer,
  { meaning: string; description: string; cta: string }
> = {
  presence: {
    meaning: "What customers see",
    description:
      "A clear digital presence helps customers understand, trust, and take the next step.",
    cta: "Explore website work",
  },
  value: {
    meaning: "What makes you valuable",
    description:
      "Positioning connects your offer, evidence, and customer need around a clear idea.",
    cta: "Explore positioning",
  },
  operations: {
    meaning: "How the business works",
    description:
      "Practical systems make knowledge accessible and recurring work easier to deliver.",
    cta: "Explore AI & systems",
  },
};

function modelFocus(layer: BusinessLayer, focus: Focus | null): Focus {
  if (layer === "presence") return "digital";
  if (layer === "operations") return "systems";
  return focus === "growth" ? "growth" : "positioning";
}

export function LayerInspection({
  layer,
  focus,
  onClose,
  onChooseFocus,
}: {
  layer: BusinessLayer;
  focus: Focus | null;
  onClose: () => void;
  onChooseFocus: (focus: Focus) => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const activeFocus = modelFocus(layer, focus);
  const copy = content[layer];
  const isGrowthValue = layer === "value" && activeFocus === "growth";
  const description = isGrowthValue
    ? "Connect attention to a credible offer and a useful next step."
    : copy.description;
  const cta = isGrowthValue ? "Explore creative & growth" : copy.cta;

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [layer]);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  }

  return (
    <section
      className="layer-inspector"
      data-layer={layer}
      aria-labelledby="layer-inspector-title"
      onKeyDown={handleKeyDown}
    >
      <div className="layer-inspector__heading">
        <div>
          <h2 id="layer-inspector-title" ref={heading} tabIndex={-1}>
            {copy.meaning}
          </h2>
        </div>
        <button
          className="layer-inspector__close"
          type="button"
          onClick={onClose}
        >
          <span aria-hidden="true">←</span> Back to the model
        </button>
      </div>

      <p className="layer-inspector__intro">{description}</p>

      <div className="layer-inspector__model">
        <WorkingModel focus={activeFocus} />
      </div>

      <button
        className="layer-inspector__cta"
        type="button"
        onClick={() => onChooseFocus(activeFocus)}
      >
        {cta} <span aria-hidden="true">↗</span>
      </button>
    </section>
  );
}
