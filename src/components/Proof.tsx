import Image from "next/image";
import Link from "next/link";
import { cases } from "@/lib/work";
export function Proof() {
  return (
    <section id="work" className="work-section">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">01 / Selected work</p>
          <h2>
            The work,
            <br />
            read closely.
          </h2>
          <p>
            Look closely. Find the real opportunity.
            <br />
            Build something that carries it.
          </p>
        </div>
        <Link className="featured-work" href="/work/the-lost-archives">
          <div className="featured-image">
            <Image
              src="/archive/tapes.webp"
              alt="Original U-matic tapes in the Lost Archives production archive"
              width={640}
              height={640}
              sizes="(max-width: 760px) 100vw, 55vw"
            />
            <span className="image-index">
              Case 01 / From archive to audience
            </span>
            <span className="image-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <div className="featured-copy">
            <span className="eyebrow">
              University of Science and Philosophy
            </span>
            <h3>
              A rare archive.
              <br />A new point
              <br /> of entry.
            </h3>
            <p>
              Rare recordings became The Lost Archives: a media property built
              around discovery, with a path from first encounter to deeper
              exploration.
            </p>
            <div className="feature-result">
              <strong>1.4M+</strong>
              <span>
                Facebook views
                <br />
                in an early launch window
              </span>
            </div>
            <span className="text-link">
              Read the thinking. See the work. <span aria-hidden="true">↗</span>
            </span>
          </div>
        </Link>
        <div className="work-ledger">
          {cases.slice(1).map((c) => (
            <Link className="work-row" key={c.slug} href={`/work/${c.slug}`}>
              <span className="folio">{c.number}</span>
              <div className="work-row-name">
                <span className="eyebrow">{c.discipline}</span>
                <h3>
                  {c.slug === "datacenter-dynamics" ? <>Datacenter<wbr />Dynamics</> : c.name}
                </h3>
              </div>
              <p>{c.short}</p>
              <span className="row-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
        <p className="work-note">
          The work is the evidence. Each case separates the material, our
          contribution, and the documented outcome.
        </p>
      </div>
    </section>
  );
}
