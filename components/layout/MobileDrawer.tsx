"use client";

import Link from "next/link";
import { BadgeHelp, BookOpen, ChevronDown, PackageCheck, UserRound, X } from "lucide-react";
import { drawerMinorLinks, platformMenus } from "./layout-data";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const minorIcons = {
    help: BadgeHelp,
    "package-check": PackageCheck,
    book: BookOpen,
  };

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-mobile-drawer bg-black/55 backdrop-blur-sm transition md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-label="Close menu"
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-mobile-drawer flex h-dvh w-[320px] max-w-[88vw] flex-col bg-bg-cream text-text-dark shadow-[0_0_40px_rgba(0,0,0,.4)] transition-transform duration-slow md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center gap-3 bg-bg-dark px-4 py-4 text-white">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
            <UserRound className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <b className="block text-[15px]">Account</b>
            <Link href="/login" onClick={onClose} className="text-[13px] font-extrabold text-brand-red">
              Sign in or create account
            </Link>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/10"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {platformMenus.map((menu) => (
            <details key={menu.key} className="border-b border-border-cream">
              <summary className="flex min-h-[52px] cursor-pointer list-none items-center gap-3 px-[18px] font-body text-base font-extrabold uppercase tracking-[0.03em] marker:hidden [&::-webkit-details-marker]:hidden">
                {menu.label}
                <ChevronDown className="ml-auto h-[18px] w-[18px] text-text-dark-muted" aria-hidden="true" />
              </summary>
              <div className="border-t border-border-cream bg-black/[0.04] py-1">
                {menu.systems.map((system) => (
                  <Link
                    key={system.href}
                    href={system.href}
                    onClick={onClose}
                    className="flex min-h-[46px] items-center px-[30px] text-[14.5px] font-semibold"
                  >
                    {system.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}

          <Link
            href="/deals"
            onClick={onClose}
            className="flex min-h-[52px] items-center border-b border-border-cream px-[18px] font-body text-base font-extrabold uppercase tracking-[0.03em] text-brand-red"
          >
            Deals
          </Link>
          <Link
            href="/best-sellers"
            onClick={onClose}
            className="flex min-h-[52px] items-center border-b border-border-cream px-[18px] font-body text-base font-extrabold uppercase tracking-[0.03em]"
          >
            Best Sellers
          </Link>
          <Link
            href="/new-arrivals"
            onClick={onClose}
            className="flex min-h-[52px] items-center border-b border-border-cream px-[18px] font-body text-base font-extrabold uppercase tracking-[0.03em]"
          >
            New Arrivals
          </Link>

          <div className="h-2 bg-black/[0.05]" />

          {drawerMinorLinks.map(({ label, href, icon }) => {
            const Icon = minorIcons[icon as keyof typeof minorIcons];

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex min-h-12 items-center gap-3 border-b border-border-cream px-[18px] text-[14.5px] font-semibold"
              >
                <Icon className="h-[18px] w-[18px] text-text-dark-muted" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
