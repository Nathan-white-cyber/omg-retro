"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { CartBadge } from "./CartBadge";
import { Logo } from "./Logo";
import { MobileDrawer } from "./MobileDrawer";

export function MobileHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-nav flex items-center gap-2 border-b border-border bg-white px-3.5 py-2 md:hidden">
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
        <CartBadge variant="mobile" />
      </div>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
}
