"use client";
import Image from "next/image";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import { type Focus } from "@/lib/perspectives";

export function BusinessCutaway({
  depth,
  setDepth,
  focus,
}: {
  depth: number;
  setDepth: (value: number) => void;
  focus: Focus | null;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const face = focus
    ? {
        positioning: ["A clearer", "position."],
        digital: ["A better", "experience."],
        systems: ["A smarter", "business."],
        growth: ["Attention.", "With purpose."],
      }[focus]
    : ["A business.", "Understood."];
  const drag = useRef<{ x: number; depth: number } | null>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (drag.current) {
      setDepth(
        Math.max(
          0,
          Math.min(
            100,
            drag.current.depth + (event.clientX - drag.current.x) / 2.2,
          ),
        ),
      );
    } else if (event.pointerType === "mouse" && scene.current) {
      const box = scene.current.getBoundingClientRect();
      scene.current.style.setProperty(
        "--look-x",
        `${((event.clientX - box.left) / box.width - 0.5) * 5}deg`,
      );
      scene.current.style.setProperty(
        "--look-y",
        `${((event.clientY - box.top) / box.height - 0.5) * 3}deg`,
      );
    }
  }
  return (
    <div
      className="cutaway"
      data-open={depth > 45}
      data-focus={focus || "all"}
      style={{ "--depth": depth / 100 } as CSSProperties}
    >
      <div className="cutaway-topline">
        <span>ANATOMY OF A BUSINESS</span>
        <span>INTERACTIVE STUDY / 01</span>
      </div>
      <div
        className="scene"
        ref={scene}
        onPointerMove={move}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          drag.current = { x: event.clientX, depth };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onPointerLeave={() => {
          if (scene.current && !drag.current) {
            scene.current.style.setProperty("--look-x", "0deg");
            scene.current.style.setProperty("--look-y", "0deg");
          }
        }}
      >
        <div className="scene-orbit" aria-hidden="true" />
        <div className="structure" aria-hidden="true">
          <div className="plane plane-foundation">
            <div className="plate-head">
              <span>03 / EXECUTION</span>
              <i>IN MOTION</i>
            </div>
            <div className="system-rails">
              <div />
              <div />
              <div />
              <div />
            </div>
            <div className="execution-row">
              <span>Knowledge</span>
              <b>→</b>
              <span>Judgment</span>
              <b>→</b>
              <span>Action</span>
            </div>
            <div className="execution-tracks">
              <span>WORKFLOWS</span>
              <span>AI + PEOPLE</span>
              <span>DELIVERY</span>
            </div>
            <div className="plate-foot">
              <span>What makes it work.</span>
              <span>DN — 03</span>
            </div>
          </div>
          <div className="structure-pillar pillar-one" />
          <div className="structure-pillar pillar-two" />
          <div className="structure-pillar pillar-three" />
          <div className="plane plane-intelligence">
            <div className="plate-head">
              <span>02 / INTELLIGENCE</span>
              <i>CONNECTED</i>
            </div>
            <svg className="intelligence-map" viewBox="0 0 600 280" fill="none">
              <path d="M35 55H155L230 140H375L445 55H565M35 225H155L230 140M375 140L445 225H565M300 25V255" />
              <circle cx="300" cy="140" r="73" />
              <circle cx="300" cy="140" r="93" strokeDasharray="2 8" />
              <circle cx="35" cy="55" r="5" />
              <circle cx="565" cy="55" r="5" />
              <circle cx="35" cy="225" r="5" />
              <circle cx="565" cy="225" r="5" />
            </svg>
            <div className="intelligence-words">
              <span>POSITIONING</span>
              <span>PROOF</span>
              <span>OPPORTUNITY</span>
              <span>KNOWLEDGE</span>
            </div>
            <div className="plate-monogram">
              <Image
                src="/brand/dn-logo.png"
                alt=""
                width={2000}
                height={2000}
                sizes="240px"
              />
            </div>
            <div className="plate-foot">
              <span>What holds it together.</span>
              <span>DN — 02</span>
            </div>
          </div>
          <div className="plane plane-surface">
            <div className="surface-masthead">
              <Image
                src="/brand/dn-lockup-tight.png"
                alt=""
                width={1300}
                height={237}
                sizes="200px"
              />
              <span>STRATEGY / WEB / AI</span>
            </div>
            <div className="surface-type">
              {face[0]}
              <br />
              <em>{face[1]}</em>
            </div>
            <div className="surface-composition">
              <div className="surface-circle" />
              <div className="surface-line" />
              <div className="surface-small-type">
                Clarity.
                <br />
                Structure.
                <br />
                Craft.
              </div>
            </div>
            <div className="plate-foot">
              <span>01 / WHAT THE WORLD SEES</span>
              <span>↗</span>
            </div>
          </div>
        </div>
        <div className="scene-label label-surface" aria-hidden="true">
          <span>01</span> Presence
        </div>
        <div className="scene-label label-intelligence" aria-hidden="true">
          <span>02</span> Intelligence
        </div>
        <div className="scene-label label-execution" aria-hidden="true">
          <span>03</span> Execution
        </div>
        <span className="scene-corner" aria-hidden="true">
          +
        </span>
      </div>
      <div className="depth-control">
        <label htmlFor="business-depth">
          <span>
            {depth > 45 ? "Beneath the surface" : "What the world sees"}
          </span>
          <span className="depth-instruction">
            Drag to look deeper <span aria-hidden="true">↔</span>
          </span>
        </label>
        <input
          id="business-depth"
          type="range"
          min="0"
          max="100"
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          aria-label="Reveal the business layers"
          aria-valuetext={
            depth > 70
              ? "Presence, intelligence, and execution revealed"
              : depth > 30
                ? "Looking beneath the surface"
                : "Public face of the business"
          }
        />
      </div>
      <p className="sr-only">
        An architectural model opens into three layers: the public presence, the
        positioning and knowledge beneath it, and the systems that put the
        business into motion.
      </p>
    </div>
  );
}
