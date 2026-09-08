import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases } from "@/lib/work";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((c) => c.slug === slug);
  if (!c) return { title: "Work not found" };
  return {
    title: c.name,
    description: c.intro,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      title: `${c.name} — Draper Norwood`,
      description: c.intro,
      url: `/work/${c.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${c.name} — Draper Norwood`,
      description: c.intro,
    },
  };
}
export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = cases.find((c) => c.slug === slug);
  if (!c) notFound();
  const next = cases[(cases.indexOf(c) + 1) % cases.length];
  return (
    <>
      <Header />
      <main id="home" className={`case-page case-${c.slug}`}>
        <section className="case-hero shell">
          <Link className="back-link" href="/#work">
            ← All work
          </Link>
          <div className="case-heading">
            <p className="eyebrow">
              Case {c.number} / {c.name}
            </p>
            <h1>{c.title}</h1>
            <p className="case-intro">{c.intro}</p>
          </div>
          <div className="case-meta">
            <div>
              <span className="eyebrow">Context</span>
              <p>{c.client}</p>
            </div>
            <div>
              <span className="eyebrow">Work</span>
              <p>{c.discipline}</p>
            </div>
          </div>
        </section>
        {c.slug === "the-lost-archives" ? (
          <div className="archive-spread shell">
            <figure>
              <Image
                src="/archive/tapes.webp"
                alt={c.imageAlt}
                width={640}
                height={640}
                priority
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <figcaption>01 / Source material · U-matic recordings</figcaption>
            </figure>
            <figure>
              <Image
                src="/archive/newsletter.webp"
                alt="The first page of the 1954 News Letter showing Walter and Lao Russell"
                width={1200}
                height={1552}
                priority
                sizes="(max-width: 760px) 50vw, 30vw"
              />
              <figcaption>02 / Source · 1954 News Letter</figcaption>
            </figure>
          </div>
        ) : (
          <figure className="case-artifact shell">
            <Image
              src={c.image}
              alt={c.imageAlt}
              width={1254}
              height={1254}
              priority
              sizes="(max-width: 760px) 100vw, 620px"
            />
            <figcaption>Existing project artwork / {c.name}</figcaption>
          </figure>
        )}
        <section
          className="case-story shell"
          aria-label="The thinking and the work"
        >
          <article>
            <span className="eyebrow">01 / What existed</span>
            <h2>The material.</h2>
            <p>{c.material}</p>
          </article>
          <article>
            <span className="eyebrow">02 / What we saw</span>
            <h2>The opportunity.</h2>
            <p>{c.insight}</p>
          </article>
          <article>
            <span className="eyebrow">03 / What took form</span>
            <h2>The work.</h2>
            <ul>
              {c.built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
        <section className="case-outcome">
          <div className="shell">
            <p className="eyebrow">04 / What happened</p>
            <h2>
              {c.metrics.length
                ? "The documented result."
                : "A sharper direction."}
            </h2>
            <p className="outcome-intro">{c.outcome}</p>
            {c.metrics.length > 0 && (
              <div className="case-metrics">
                {c.metrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="scope-note">{c.scope}</p>
            <a
              className="text-link"
              href={c.evidence}
              target="_blank"
              rel="noreferrer"
            >
              View the original evidence sheet{" "}
              <span className="sr-only">(opens in a new tab)</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <section className="case-next shell">
          <Link href={`/work/${next.slug}`}>
            <span className="eyebrow">Next case / {next.number}</span>
            <h2>
              <span className="next-case-name">
                {next.slug === "datacenter-dynamics" ? <>Datacenter<wbr />Dynamics</> : next.name}
              </span>
              <span aria-hidden="true">↗</span>
            </h2>
          </Link>
          <Link className="text-link" href="/#contact">
            Have something we should look at? <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
