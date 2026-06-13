"use client";

import Link from "next/link";
import { PackageCheck, Truck } from "lucide-react";
import { utilityLinks, utilityPromos } from "./layout-data";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

const promoIcons = {
  "package-check": PackageCheck,
  truck: Truck,
  gamepad: CheckIcon,
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
          {utilityLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-2">
              {index > 0 ? <span className="text-[#cfd2da66]">|</span> : null}
              <Link href={link.href} className="text-xs font-bold leading-none transition hover:text-white">
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
