"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Heart,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { accountNavItems } from "@/components/layout/layout-data";
import type { User } from "@/types";

interface AccountSidebarProps {
  user?: User;
}

const navIcons = {
  dashboard: LayoutDashboard,
  orders: ShoppingBag,
  wishlist: Heart,
  settings: Settings,
};

export function AccountSidebar({
  user = {
    id: "guest",
    email: "player@omgretro.com",
    firstName: "Retro",
    lastName: "Player",
    memberSince: "2026",
  },
}: AccountSidebarProps) {
  const pathname = usePathname();
  const initials = `${user.firstName?.[0] ?? "R"}${user.lastName?.[0] ?? "P"}`;
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;

  return (
    <aside className="sticky top-5 hidden min-w-0 flex-col gap-4 lg:flex">
      <div className="rounded-card border border-border-cream bg-white p-6 text-center shadow-card">
        <div className="mx-auto mb-3.5 grid h-[72px] w-[72px] place-items-center rounded-full bg-[linear-gradient(150deg,#CC1E1E,#A3121A)] font-display text-[28px] uppercase tracking-[0.02em] text-white shadow-[0_6px_18px_rgba(204,30,30,.32)]">
          {initials}
        </div>
        <div className="font-body text-xl font-extrabold leading-tight text-text-dark">
          {fullName}
        </div>
        <div className="mt-1 text-xs text-text-dark-muted">
          Member since <strong className="text-text-dark">{user.memberSince}</strong>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 rounded-card border border-border-cream bg-white p-2 shadow-card">
        {accountNavItems.map(({ label, href, icon }) => {
          const Icon = navIcons[icon as keyof typeof navIcons];
          const isActive = pathname === href || (href !== "/account" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-btn px-3.5 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-brand-red/10 text-brand-red shadow-[inset_0_0_0_1px_rgba(204,30,30,.22)]"
                  : "text-text-dark hover:bg-black/[0.05]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`h-[18px] w-[18px] ${isActive ? "text-brand-red" : "text-text-dark-muted"}`}
                aria-hidden="true"
              />
              {label}
              <ChevronRight
                className={`ml-auto h-3.5 w-3.5 transition ${
                  isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                }`}
                aria-hidden="true"
              />
            </Link>
          );
        })}

        <div className="mx-2 my-1.5 h-px bg-border-cream" />

        <button
          type="button"
          className="flex items-center gap-3 rounded-btn px-3.5 py-3 text-left text-sm font-bold text-text-dark-muted transition hover:bg-brand-red/10 hover:text-brand-red"
        >
          <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
          Sign Out
        </button>
      </nav>
    </aside>
  );
}
