import Link from "next/link";
import type { ReactNode } from "react";

export function InfoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-card border border-border-cream bg-white p-6 shadow-card">
      <h2 className="font-display text-4xl uppercase leading-none text-text-dark">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-text-dark-muted">
        {children}
      </div>
    </section>
  );
}

export function FeatureCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-card border border-border-cream bg-white p-5 shadow-card">
      <h3 className="font-body text-sm font-extrabold uppercase tracking-[0.08em] text-text-dark">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-dark-muted">{children}</p>
    </div>
  );
}

export function DarkCallout({
  title,
  children,
  href,
  cta,
}: {
  title: string;
  children: ReactNode;
  href?: string;
  cta?: string;
}) {
  return (
    <section className="rounded-card border border-l-4 border-white/10 border-l-brand-red bg-[#1A1A1A] p-6 text-white shadow-card">
      <h2 className="font-display text-4xl uppercase leading-none">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-white/60">{children}</div>
      {href && cta ? (
        <Link
          href={href}
          className="mt-5 inline-flex h-11 items-center rounded-btn border border-brand-red px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red transition hover:bg-brand-red hover:text-white"
        >
          {cta}
        </Link>
      ) : null}
    </section>
  );
}

