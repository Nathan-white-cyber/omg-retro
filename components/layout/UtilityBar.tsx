"use client";

import Link from "next/link";
import { Gamepad2, PackageCheck, Truck } from "lucide-react";
import { utilityLinks, utilityPromos } from "./layout-data";

const promoIcons = {
  "package-check": PackageCheck,
  truck: Truck,
  gamepad: Gamepad2,
};

export function UtilityBar() {
  return (
    <div className="hidden border-b border-border bg-bg-dark text-[12.5px] tracking-[0.02em] text-[#cfd2da] md:block">
      <div className="mx-auto flex min-h-utility-h max-w-[1240px] items-center justify-between gap-5 px-7">
        <ul className="flex items-center gap-6">
          {utilityPromos.map(({ label, icon }) => {
            const Icon = promoIcons[icon as keyof typeof promoIcons];

            return (
            <li key={label} className="flex items-center gap-2">
              <Icon className="h-[15px] w-[15px] text-brand-red" aria-hidden="true" />
              <span>{label}</span>
            </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#cfd2da99] bg-white/10 px-3.5 py-1.5 text-xs font-bold leading-none transition hover:-translate-y-0.5 hover:border-current hover:bg-white/20"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
