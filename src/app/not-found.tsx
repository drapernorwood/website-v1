import Link from "next/link";
export default function NotFound() {
  return (
    <main id="home" className="not-found shell">
      <p className="eyebrow">Draper Norwood / 404</p>
      <h1>
        Nothing here.
        <br />
        <em>Plenty elsewhere.</em>
      </h1>
      <Link className="text-link" href="/">
        Return to the work <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
