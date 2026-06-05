"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import type { PlatformMenu } from "./layout-data";

interface MegaMenuProps {
  menu: PlatformMenu;
}

function CoverTile({
  code,
  color,
  className = "",
}: {
  code: string;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded bg-[linear-gradient(150deg,var(--cover-color),color-mix(in_srgb,var(--cover-color)_62%,#000))] p-2 text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.15)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(115deg,rgba(255,255,255,.16),transparent_42%)] ${className}`}
      style={{ "--cover-color": color } as CSSProperties}
    >
      <span className="relative z-10 self-start rounded bg-black/30 px-1.5 py-0.5 font-body text-[8px] font-extrabold uppercase tracking-[0.08em]">
        {code}
      </span>
      <span className="relative z-10 font-display text-base uppercase leading-none tracking-[0.01em] drop-shadow">
        {code}
      </span>
    </div>
  );
}

export function MegaMenu({ menu }: MegaMenuProps) {
  return (
    <div className="invisible absolute left-0 right-0 top-full z-mega-menu translate-y-2 border-t border-border bg-bg-surface opacity-0 shadow-[0_26px_50px_rgba(0,0,0,.3)] transition duration-fast group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[1.55fr_1fr_1.15fr] gap-9 px-7 py-7 text-left">
        <div>
          <h4 className="mb-4 font-body text-label-md uppercase text-text-secondary">
            Shop by System
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {menu.systems.map((system) => (
              <Link key={system.href} href={system.href} className="group/tile flex flex-col gap-2">
                <CoverTile
                  code={system.code}
                  color={system.coverColor}
                  className="aspect-[4/3] transition group-hover/tile:-translate-y-0.5"
                />
                <span className="text-[12.5px] font-bold tracking-[0.02em] text-text-primary transition group-hover/tile:text-brand-red">
                  {system.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-body text-label-md uppercase text-text-secondary">
            Shop by Category
          </h4>
          <ul className="flex flex-col gap-3">
            {menu.categories.map((category) => (
              <li key={category.href}>
                <Link
                  href={category.href}
                  className="flex items-center gap-2 text-sm font-semibold text-text-primary transition hover:text-brand-red"
                >
                  <span className="h-1.5 w-1.5 rounded-sm bg-brand-red" aria-hidden="true" />
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-3 rounded-card border border-border bg-black/20 p-4">
          <h5 className="font-body text-label-md uppercase text-text-secondary">
            {menu.feature.kicker}
          </h5>
          <CoverTile
            code={menu.feature.platform}
            color={menu.feature.coverColor}
            className="aspect-video"
          />
          <span className="font-display text-display-xs uppercase text-text-primary">
            {menu.feature.title}
          </span>
          <p className="text-[12.5px] leading-snug text-text-secondary">
            {menu.feature.description}
          </p>
          <Link
            href={menu.feature.href}
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-btn bg-brand-red px-4 py-2.5 font-body text-label-md uppercase text-white transition hover:bg-brand-red-dark"
          >
            Shop Deal
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
