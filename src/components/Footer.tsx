import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <Link href="/" className="footer-name">
            Draper Norwood<span aria-hidden="true">↗</span>
          </Link>
          <p>
            Real value.
            <br />
            Stronger form.
          </p>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Draper Norwood</span>
          <nav aria-label="Footer">
            <Link href="/#work">Work</Link>
            <Link href="/#about">Practice</Link>
            <Link href="/#services">Capabilities</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
