"use client";
import { useState } from "react";
import { type Focus } from "@/lib/perspectives";
const answers = [
  {
    q: "What could AI help us do?",
    a: "Retrieve knowledge. Support recurring workflows. Build useful internal tools. Keep human judgment where it matters.",
    source: "Draper Norwood / AI & modern systems",
  },
  {
    q: "Where would a project start?",
    a: "With the real constraint: what is getting in the way, what already exists, and what would make the business more capable.",
    source: "Draper Norwood / Offer philosophy",
  },
  {
    q: "Can you build the website too?",
    a: "Yes. Website strategy, design, development, and customer journeys are part of the same practice.",
    source: "Draper Norwood / Web & digital presence",
  },
];
export function WorkingModel({ focus }: { focus: Focus }) {
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState(0);
  return (
    <div className="working-model" data-model={focus}>
      <div className="model-top">
        <span>LOOK AT THE CONNECTION</span>
        <span>ILLUSTRATIVE MODEL</span>
      </div>
      {focus === "systems" ? (
        <>
          <div className="knowledge-sources">
            <span>Service knowledge</span>
            <span>Project process</span>
            <span>Offer philosophy</span>
          </div>
          <div className="model-connector" aria-hidden="true">
            ↓
          </div>
          <label className="question-select" htmlFor="model-question">
            Ask the knowledge
            <select
              id="model-question"
              value={question}
              onChange={(e) => {
                setQuestion(Number(e.target.value));
                setStep(0);
              }}
            >
              {answers.map((item, i) => (
                <option key={item.q} value={i}>
                  {item.q}
                </option>
              ))}
            </select>
          </label>
          {step ? (
            <div className="knowledge-answer" role="status">
              <span className="status-dot" /> <p>{answers[question].a}</p>
              <small>Source: {answers[question].source}</small>
              <span className="model-caveat">
                Curated answers from our service material.
              </span>
            </div>
          ) : (
            <div className="knowledge-wait">
              The information exists.
              <br />
              Make it accessible at the point of need.
            </div>
          )}
          <button
            className="model-action"
            onClick={() => setStep(step ? 0 : 1)}
          >
            {step ? "Reset the example" : "Connect the knowledge"}
            <span aria-hidden="true">{step ? "↺" : "↗"}</span>
          </button>
        </>
      ) : focus === "positioning" ? (
        <>
          <div className={`positioning-demo ${step ? "is-connected" : ""}`}>
            <div className="scattered-offer">
              <span>Strategy</span>
              <span>Websites</span>
              <span>AI</span>
              <span>Creative</span>
              <span>Systems</span>
              <span>Execution</span>
            </div>
            <div className="offer-center">
              <span>THE THROUGH-LINE</span>
              <p>
                A stronger business.
                <br />
                <em>Inside and out.</em>
              </p>
            </div>
          </div>
          <p className="model-explanation" aria-live="polite">
            {step
              ? "The capabilities now express one useful idea. Each has a reason to belong."
              : "A list tells you what a company does. It can leave you to work out why it matters."}
          </p>
          <button
            className="model-action"
            onClick={() => setStep(step ? 0 : 1)}
          >
            {step ? "See the parts" : "Find the through-line"}
            <span aria-hidden="true">{step ? "↺" : "↗"}</span>
          </button>
        </>
      ) : focus === "digital" ? (
        <>
          <div className="journey-tabs">
            {["Understand", "Believe", "Act"].map((item, i) => (
              <button
                key={item}
                aria-pressed={step === i}
                onClick={() => setStep(i)}
              >
                <span>0{i + 1}</span>
                {item}
              </button>
            ))}
          </div>
          <div className="mini-browser" key={step}>
            <div className="mini-browser-bar">
              <i />
              <i />
              <i />
              <span>A CUSTOMER’S NEXT STEP</span>
            </div>
            <span className="mini-index">0{step + 1} / 03</span>
            <h4>
              {
                [
                  "Is this for me?",
                  "Why should I trust it?",
                  "What happens next?",
                ][step]
              }
            </h4>
            <p>
              {
                [
                  "An offer that connects with the problem I came here to solve.",
                  "Relevant work, credible evidence, and a clear account of the contribution.",
                  "An invitation that makes starting a conversation feel straightforward.",
                ][step]
              }
            </p>
            <div className="mini-progress">
              <i style={{ width: `${(step + 1) * 33.333}%` }} />
            </div>
          </div>
          <button
            className="model-action"
            onClick={() => setStep((step + 1) % 3)}
          >
            {step === 2 ? "Follow the journey again" : "Follow the next step"}
            <span aria-hidden="true">{step === 2 ? "↺" : "→"}</span>
          </button>
        </>
      ) : (
        <>
          <div className="growth-flow">
            {["Idea", "Attention", "Trust", "Action"].map((item, i) => (
              <button
                className={i <= step ? "lit" : ""}
                key={item}
                aria-pressed={step === i}
                onClick={() => setStep(i)}
              >
                <span>0{i + 1}</span>
                <strong>{item}</strong>
                <i aria-hidden="true">{i < 3 ? "↘" : "↗"}</i>
              </button>
            ))}
          </div>
          <p className="model-explanation" aria-live="polite">
            {
              [
                "Start with something worth someone’s attention.",
                "Shape it for a specific audience and distribution environment.",
                "Give the interest substance: a point of view, useful proof, a reason to believe.",
                "Connect the moment to an offer, an owned relationship, or a useful next step.",
              ][step]
            }
          </p>
          <button
            className="model-action"
            onClick={() => setStep((step + 1) % 4)}
          >
            {step === 3 ? "Trace the path again" : "Follow the signal"}
            <span aria-hidden="true">{step === 3 ? "↺" : "→"}</span>
          </button>
        </>
      )}
    </div>
  );
}
