import Link from "next/link";
import { footerColumns } from "./layout-data";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-[#c7cad2]">
      <div className="mx-auto max-w-[1240px] px-7">
        <div className="grid gap-8 py-10 md:grid-cols-[1.6fr_1fr_1fr_1fr_1.4fr] md:py-12">
          <div>
            <Logo />
            <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-white/50">
              Your destination for authentic retro games, consoles and accessories. Relive the classics.
            </p>
            <p className="mt-4 font-body text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/40">
              Follow us soon
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 font-body text-label-lg uppercase text-white">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] text-white/60 transition hover:text-brand-red">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 font-body text-label-lg uppercase text-white">
              Stay in the Loop
            </h4>
            <p className="mb-3.5 text-[13px] leading-relaxed text-white/55">
              Get updates on new arrivals, deals and more retro goodness.
            </p>
            <form className="flex" action="/newsletter">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="h-[42px] min-w-0 flex-1 rounded-l-btn border border-white/20 bg-white/5 px-3.5 text-[13px] text-white outline-none placeholder:text-white/40 focus:border-brand-red"
              />
              <button
                type="submit"
                className="h-[42px] rounded-r-btn bg-brand-red px-4 font-body text-xs font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-brand-red-dark"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-4 text-[12.5px] text-white/50 md:flex-row md:items-center md:justify-between">
          <span>(c) 2026 OMG Retro. All rights reserved.</span>
          <span className="flex gap-5">
            <Link href="/info/privacy" className="transition hover:text-brand-red">
              Privacy Policy
            </Link>
            <Link href="/info/terms" className="transition hover:text-brand-red">
              Terms of Service
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
