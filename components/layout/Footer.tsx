import Link from "next/link";
import { footerColumns } from "./layout-data";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="omg-site-footer">
      <div className="omg-container">
        <div className="omg-footer-main">
          <div className="omg-footer-brand">
            <Logo />
            <p>
              Your destination for authentic retro games, consoles and accessories. Relive the classics.
            </p>
            <div className="omg-footer-social">
              <a href="https://www.facebook.com/" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 9h3V6h-3c-2 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5Z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.youtube.com/" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-2-.2-3.3-.4-4-.3-.9-1-1.5-1.9-1.7C18 6 12 6 12 6s-6 0-7.7.3c-.9.2-1.6.8-1.9 1.7C2.2 8.7 2 10 2 12s.2 3.3.4 4c.3.9 1 1.5 1.9 1.7C6 18 12 18 12 18s6 0 7.7-.3c.9-.2 1.6-.8 1.9-1.7.2-.7.4-2 .4-4ZM10 15V9l5 3-5 3Z" />
                </svg>
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="omg-footer-col">
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="omg-footer-news">
            <h4>Stay in the Loop</h4>
            <p>
              Get updates on new arrivals, deals and more retro goodness.
            </p>
            <form action="/newsletter">
              <input
                aria-label="Email address for newsletter"
                type="email"
                name="email"
                placeholder="Email address"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="omg-footer-bottom">
          <span>(c) 2024 OMG Retro. All rights reserved.</span>
          <span className="links">
            <Link href="/info/privacy">Privacy Policy</Link>
            <Link href="/info/terms">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
