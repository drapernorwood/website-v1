"use client";
import Image from "next/image";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { type Focus } from "@/lib/perspectives";
import { LayerInspection, type BusinessLayer } from "./LayerInspection";
const layers: { id: BusinessLayer; title: string; detail: string }[] = [
  {
    id: "presence",
    title: "What customers see",
    detail: "Positioning · Website · Proof",
  },
  {
    id: "value",
    title: "What makes you valuable",
    detail: "Expertise · Ideas · Capabilities",
  },
  {
    id: "operations",
    title: "How the business works",
    detail: "Knowledge · Workflows · AI",
  },
];
export const layerForFocus: Record<Focus, BusinessLayer> = {
  positioning: "value",
  digital: "presence",
  systems: "operations",
  growth: "value",
};
export function BusinessCutaway({
  depth,
  setDepth,
  focus,
  inspectedLayer,
  onInspect,
  onChooseFocus,
}: {
  depth: number;
  setDepth: (value: number) => void;
  focus: Focus | null;
  inspectedLayer: BusinessLayer | null;
  onInspect: (layer: BusinessLayer | null) => void;
  onChooseFocus: (focus: Focus) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const selectors = useRef<(HTMLButtonElement | null)[]>([]);
  const rotation = useRef({ x: 0, y: 0 });
  const drag = useRef<{
    x: number;
    y: number;
    rx: number;
    ry: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const [turned, setTurned] = useState(false);
  const open = depth > 45;
  function bringIntoView() {
    const object = document.getElementById("business-object");
    if (object && object.getBoundingClientRect().top < 100)
      object.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
  }
  function adjustView(x: number, y: number) {
    orient(x, y);
    bringIntoView();
  }
  function orient(x: number, y: number) {
    rotation.current = {
      x: Math.max(-23, Math.min(18, x)),
      y: Math.max(-30, Math.min(30, y)),
    };
    stage.current?.style.setProperty("--orbit-x", `${rotation.current.x}deg`);
    stage.current?.style.setProperty("--orbit-y", `${rotation.current.y}deg`);
    setTurned(rotation.current.x !== 0 || rotation.current.y !== 0);
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start || !open || inspectedLayer) return;
    const dx = event.clientX - start.x,
      dy = event.clientY - start.y;
    if (!start.moved && Math.hypot(dx, dy) < 7) return;
    start.moved = true;
    suppressClick.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
    orient(start.rx - dy * 0.16, start.ry + dx * 0.2);
  }
  function finish(event: PointerEvent<HTMLDivElement>) {
    drag.current = null;
    event.currentTarget.dataset.dragging = "false";
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function inspect(layer: BusinessLayer) {
    setDepth(100);
    onInspect(layer);
    requestAnimationFrame(() =>
      document.getElementById("business-object")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      }),
    );
  }
  function closeInspection() {
    const index = layers.findIndex((item) => item.id === inspectedLayer);
    onInspect(null);
    requestAnimationFrame(() =>
      selectors.current[Math.max(0, index)]?.focus({ preventScroll: true }),
    );
  }
  function selectPlane(layer: BusinessLayer, keyboard: boolean) {
    if (suppressClick.current && !keyboard) {
      suppressClick.current = false;
      return;
    }
    if (!open) setDepth(100);
    else inspect(layer);
  }
  return (
    <div
      id="business-object"
      className="business-object"
      data-open={open}
      data-inspecting={!!inspectedLayer}
      data-highlight={focus ? layerForFocus[focus] : "none"}
      style={{ "--spread": depth / 100 } as CSSProperties}
    >
      <div className="object-workspace">
        <div
          className="object-stage"
          ref={stage}
          aria-hidden={!!inspectedLayer}
          onPointerDown={(event) => {
            if (event.button !== 0 || !open || inspectedLayer) return;
            suppressClick.current = false;
            drag.current = {
              x: event.clientX,
              y: event.clientY,
              rx: rotation.current.x,
              ry: rotation.current.y,
              moved: false,
            };
          }}
          onPointerMove={move}
          onPointerUp={finish}
          onPointerCancel={(event) => {
            suppressClick.current = false;
            finish(event);
          }}
        >
          <div className="object-ground" aria-hidden="true" />
          <div className="object-camera">
            {layers.map((layer, i) => (
              <div
                key={layer.id}
                className={`business-layer business-layer-${layer.id}`}
              >
                <button
                  type="button"
                  className="layer-hit"
                  tabIndex={inspectedLayer ? -1 : 0}
                  aria-label={
                    open
                      ? `Inspect ${layer.title.toLowerCase()}`
                      : `Open the business model: ${layer.title.toLowerCase()}`
                  }
                  onClick={(event) => selectPlane(layer.id, event.detail === 0)}
                />
                <div className="layer-art" aria-hidden="true">
                  <div className="layer-masthead">
                    <span>0{i + 1}</span>
                    <span>{layer.title}</span>
                    <span>↗</span>
                  </div>
                  {layer.id === "presence" ? (
                    <>
                      <Image
                        className="object-lockup"
                        src="/brand/dn-lockup-tight.png"
                        alt=""
                        width={1300}
                        height={237}
                        sizes="210px"
                      />
                      <div className="object-face">
                        A business.
                        <br />
                        Understood.
                      </div>
                      <div className="object-proof-lines">
                        <span />
                        <span />
                        <span />
                      </div>
                    </>
                  ) : layer.id === "value" ? (
                    <>
                      <svg
                        className="object-connections"
                        viewBox="0 0 480 280"
                        fill="none"
                      >
                        <path d="M35 108H148L240 143L335 108H445M35 212H148L240 143L335 212H445" />
                        <circle cx="240" cy="143" r="54" />
                        <circle
                          cx="240"
                          cy="143"
                          r="75"
                          strokeDasharray="2 7"
                        />
                      </svg>
                      <div className="object-monogram">
                        <Image
                          src="/brand/dn-logo.png"
                          alt=""
                          width={2000}
                          height={2000}
                          sizes="160px"
                        />
                      </div>
                      <div className="object-capabilities">
                        <span>EXPERTISE</span>
                        <span>IDEAS</span>
                        <span>PROOF</span>
                        <span>POSSIBILITY</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="object-workflow">
                        <span>Knowledge</span>
                        <b>→</b>
                        <span>Judgment</span>
                        <b>→</b>
                        <span>Action</span>
                      </div>
                      <div className="object-workflow-track">
                        <i />
                        <i />
                        <i />
                      </div>
                      <p className="object-human">
                        Systems that make room for people.
                      </p>
                    </>
                  )}
                  <div className="layer-caption">
                    {layer.detail}
                    <span>{open ? "LOOK INSIDE +" : "DRAPER NORWOOD"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {inspectedLayer ? (
          <div className="object-inspection-host" key={inspectedLayer}>
            <LayerInspection
              layer={inspectedLayer}
              focus={focus}
              onClose={closeInspection}
              onChooseFocus={(next) => {
                onInspect(null);
                onChooseFocus(next);
              }}
            />
          </div>
        ) : null}
      </div>
      {open ? (
        <div className="object-explorer">
          <div className="object-tools">
            <p>
              {inspectedLayer
                ? "Three connected parts of one business."
                : "Drag to turn. Choose a layer to look inside."}
            </p>
            {!inspectedLayer ? (
              <div className="object-orbit-tools" aria-label="Model viewpoint">
                <button
                  type="button"
                  aria-label="Turn model left"
                  onClick={() =>
                    adjustView(rotation.current.x, rotation.current.y - 10)
                  }
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Tilt model"
                  onClick={() =>
                    adjustView(
                      rotation.current.x >= 10 ? -15 : rotation.current.x + 10,
                      rotation.current.y,
                    )
                  }
                >
                  ↕
                </button>
                <button
                  type="button"
                  aria-label="Turn model right"
                  onClick={() =>
                    adjustView(rotation.current.x, rotation.current.y + 10)
                  }
                >
                  →
                </button>
                <button
                  type="button"
                  className="reset-model"
                  disabled={!turned}
                  onClick={() => adjustView(0, 0)}
                >
                  Reset view
                </button>
              </div>
            ) : null}
          </div>
          <div
            className="object-layer-options"
            aria-label="Look inside a business layer"
          >
            {layers.map((layer, i) => (
              <button
                key={layer.id}
                ref={(node) => {
                  selectors.current[i] = node;
                }}
                type="button"
                aria-pressed={inspectedLayer === layer.id}
                data-relevant={
                  focus ? layerForFocus[focus] === layer.id : false
                }
                onClick={() => inspect(layer.id)}
              >
                <span>0{i + 1}</span>
                <strong>{layer.title}</strong>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="object-invitation">
          A business has more than one dimension.
          <span>Open it to explore.</span>
        </p>
      )}
    </div>
  );
}
