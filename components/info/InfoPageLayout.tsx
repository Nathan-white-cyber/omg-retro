import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const quickLinks = [
  { label: "About Us", href: "/info/about" },
  { label: "Our Guarantee", href: "/info/guarantee" },
  { label: "Shipping Info", href: "/info/shipping" },
  { label: "Returns Policy", href: "/info/returns" },
  { label: "Help Centre / FAQ", href: "/info/faq" },
  { label: "Contact Us", href: "/info/contact" },
  { label: "Privacy Policy", href: "/info/privacy" },
  { label: "Terms of Service", href: "/info/terms" },
];

function Icon({
  type,
  className = "h-5 w-5",
}: {
  type: "shield" | "controller" | "check" | "truck" | "headset";
  className?: string;
}) {
  const paths = {
    shield: <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />,
    controller: (
      <>
        <rect x="3" y="8" width="18" height="10" rx="4" />
        <path d="M8 13h.01M16 13h.01M10 11v4M8 13h4" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    truck: (
      <>
        <path d="M1 5h13v11H1zM14 8h4l4 4v4h-8" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    headset: (
      <>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v4a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 2" />
        <path d="M20 13v4a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2" />
        <path d="M16 19c0 1-1 2-3 2h-1" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

interface InfoPageLayoutProps {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  children: ReactNode;
}

export function InfoPageLayout({
  title,
  subtitle,
  breadcrumbLabel,
  children,
}: InfoPageLayoutProps) {
  return (
    <div className="bg-bg-cream text-text-dark">
      <section className="bg-[#0E0E0E] text-white">
        <Breadcrumb items={[{ label: breadcrumbLabel }]} variant="dark" />
        <div className="mx-auto max-w-[1240px] px-7 py-12">
          <p className="font-body text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand-red">
            OMG Retro info
          </p>
          <h1 className="mt-3 font-display text-display-lg uppercase leading-none text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-[620px] text-body-lg text-white/60">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1240px] gap-8 px-7 py-10 lg:grid-cols-[1fr_360px]">
        <main className="min-w-0 space-y-8">{children}</main>

        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <section className="rounded-card border border-border-cream bg-white p-5 shadow-card">
            <h2 className="font-display text-3xl uppercase leading-none text-text-dark">
              Quick Links
            </h2>
            <nav className="mt-4 flex flex-col gap-1">
              {quickLinks.map((link) => {
                const active = link.label === breadcrumbLabel;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-btn px-3 py-2 text-sm font-bold transition ${
                      active
                        ? "bg-brand-red/10 text-brand-red"
                        : "text-text-dark-muted hover:bg-black/[0.04] hover:text-brand-red"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </section>

          <section className="rounded-card border border-border-cream bg-white p-5 shadow-card">
            <Icon type="headset" className="h-10 w-10 rounded-full bg-brand-red/10 p-2 text-brand-red" />
            <h2 className="mt-3 font-display text-3xl uppercase leading-none text-text-dark">
              Need Help?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-dark-muted">
              Our team responds within 24 hours.
            </p>
            <Link
              href="/info/contact"
              className="mt-4 inline-flex h-10 items-center rounded-btn border border-brand-red px-5 text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red transition hover:bg-brand-red hover:text-white"
            >
              Contact Us
            </Link>
          </section>

          <section className="rounded-card border border-border-cream bg-white p-5 shadow-card">
            <div className="space-y-4">
              {[
                ["shield", "Authentic Games"],
                ["controller", "Tested Before Shipping"],
                ["check", "1-Year Warranty"],
                ["truck", "Free Shipping on orders $75+"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon type={icon as "shield"} className="h-9 w-9 rounded-full bg-brand-red/10 p-2 text-brand-red" />
                  <span className="text-sm font-extrabold text-text-dark">{label}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

