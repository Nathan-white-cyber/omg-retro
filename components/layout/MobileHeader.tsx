"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Logo } from "./Logo";
import { MobileDrawer } from "./MobileDrawer";

interface MobileHeaderProps {
  cartCount?: number;
}

export function MobileHeader({ cartCount = 0 }: MobileHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-nav flex items-center gap-2 border-b border-border bg-bg-surface px-3.5 py-2 md:hidden">
      <button
        type="button"
        className="grid h-11 w-11 place-items-center rounded-[12px] text-text-primary transition hover:bg-white/10"
        aria-label="Menu"
        onClick={() => setIsDrawerOpen(true)}
      >
        <Menu className="h-[23px] w-[23px]" aria-hidden="true" />
      </button>

      <Logo className="flex-1 items-center" tagline={false} />

      <div className="flex items-center gap-0.5">
        <Link
          href="/search"
          className="grid h-11 w-11 place-items-center rounded-[12px] text-text-primary transition hover:bg-white/10"
          aria-label="Search"
        >
          <Search className="h-[23px] w-[23px]" aria-hidden="true" />
        </Link>
        <Link
          href="/cart"
          className="relative grid h-11 w-11 place-items-center rounded-[12px] text-text-primary transition hover:bg-white/10"
          aria-label="Cart"
        >
          <ShoppingCart className="h-[23px] w-[23px]" aria-hidden="true" />
          <span className="absolute right-1 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-red px-1 font-body text-[11px] font-extrabold leading-none text-white shadow-[0_0_0_2px_#1A1A1A]">
            {cartCount}
          </span>
        </Link>
      </div>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
}
