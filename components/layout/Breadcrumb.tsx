"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "cream" | "dark";
}

export function Breadcrumb({ items, className = "", variant = "cream" }: BreadcrumbProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`border-b ${
        isDark ? "border-border bg-bg-dark" : "border-border-cream bg-bg-cream"
      } ${className}`}
    >
      <div className="mx-auto max-w-[1240px] px-7">
        <nav
          aria-label="Breadcrumb"
          className={`flex min-h-[52px] items-center gap-2 overflow-x-auto whitespace-nowrap font-body text-[12.5px] font-bold uppercase tracking-[0.05em] ${
            isDark ? "text-text-secondary" : "text-text-dark-muted"
          }`}
        >
          <Link href="/" className="inline-flex items-center gap-1.5 transition hover:text-brand-red">
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            Home
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
                {item.href && !isLast ? (
                  <Link href={item.href} className="transition hover:text-brand-red">
                    {item.label}
                  </Link>
                ) : (
                    <span
                      className={isDark ? "text-text-primary" : "text-text-dark"}
                      aria-current={isLast ? "page" : undefined}
                    >
                    {item.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
