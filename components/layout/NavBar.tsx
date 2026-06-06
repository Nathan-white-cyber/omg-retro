"use client";

import Link from "next/link";
import { ChevronDown, CircleUserRound, Search } from "lucide-react";
import { CartBadge } from "./CartBadge";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { platformMenus } from "./layout-data";

interface NavBarProps {
  activePlatform?: string;
}

export function NavBar({ activePlatform }: NavBarProps) {
  return (
    <div className="hidden md:block">
      <header className="relative z-nav border-b border-border bg-bg-surface">
        <div className="mx-auto flex min-h-[84px] max-w-[1240px] items-center gap-8 px-7">
          <Logo />

          <form action="/search" className="flex max-w-[560px] flex-1">
            <input
              aria-label="Search games, consoles, accessories"
              name="q"
              type="search"
              placeholder="Search games, consoles, accessories..."
              className="h-[46px] min-w-0 flex-1 rounded-l-btn border-2 border-border bg-bg-dark px-4 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-brand-red"
            />
            <button
              type="submit"
              className="grid h-[46px] w-[54px] place-items-center rounded-r-btn bg-brand-red text-white transition hover:bg-brand-red-dark"
              aria-label="Search"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-btn border border-border bg-white/5 px-4 py-2.5 text-[13.5px] font-bold transition hover:border-brand-red hover:bg-brand-red/10 hover:text-brand-red"
            >
              <CircleUserRound className="h-[22px] w-[22px]" aria-hidden="true" />
              Account
            </Link>
            <CartBadge />
          </div>
        </div>
      </header>

      <nav className="relative z-40 border-b border-border bg-bg-dark">
        <div className="mx-auto flex min-h-nav-h max-w-[1240px] items-stretch gap-1 px-7">
          {platformMenus.map((menu) => {
            const isActive = activePlatform === menu.key;

            return (
              <div
                key={menu.key}
                className="group flex cursor-pointer items-center border-b-[3px] border-transparent px-4 font-body text-[14.5px] font-bold uppercase tracking-[0.03em] text-text-primary transition hover:border-brand-red hover:text-brand-red"
              >
                <Link
                  href={menu.href}
                  prefetch={menu.href === "/nintendo" ? true : undefined}
                  className={isActive ? "text-brand-red" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  {menu.label}
                </Link>
                <ChevronDown
                  className="ml-1.5 h-3 w-3 opacity-70 transition group-hover:rotate-180"
                  aria-hidden="true"
                />
                <MegaMenu menu={menu} />
              </div>
            );
          })}

          <Link
            href="/deals"
            prefetch={true}
            className="flex items-center border-b-[3px] border-brand-red px-4 font-body text-[14.5px] font-bold uppercase tracking-[0.03em] text-brand-red transition hover:bg-brand-red/10"
          >
            Deals
          </Link>
          <Link
            href="/best-sellers"
            className="flex items-center border-b-[3px] border-transparent px-4 font-body text-[14.5px] font-bold uppercase tracking-[0.03em] text-text-primary transition hover:border-brand-red hover:text-brand-red"
          >
            Best Sellers
          </Link>
        </div>
      </nav>
    </div>
  );
}
