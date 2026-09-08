import Link from "next/link";
import Image from "next/image";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <Link href="/" className="footer-name">
            <Image
              src="/brand/dn-lockup-tight.png"
              alt="Draper Norwood"
              width={1300}
              height={237}
              sizes="(max-width:760px) 80vw, 45vw"
            />
          </Link>
          <p>
            A clearer presence.
            <br />A more capable business.
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
