import { Breadcrumb, type BreadcrumbItem } from "@/components/layout/Breadcrumb";

interface CompactHeroProps {
  title: string;
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
  platformCode?: string;
  platformColor?: string;
}

export function CompactHero({
  title,
  subtitle,
  breadcrumbs,
  platformCode,
  platformColor = "#CC1E1E",
}: CompactHeroProps) {
  return (
    <section className="bg-bg-dark">
      <Breadcrumb
        items={breadcrumbs}
        variant="dark"
      />
      <div className="mx-auto grid max-w-[1240px] gap-8 px-7 py-10 md:grid-cols-[1fr_320px] md:items-center md:py-12">
        <div>
          <p className="font-body text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-red">
            Shop OMG Retro
          </p>
          <h1 className="mt-3 font-display text-[42px] uppercase leading-none text-text-primary sm:text-[58px] lg:text-[68px]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
            {subtitle}
          </p>
        </div>

        {platformCode ? (
          <div className="hidden h-[170px] rounded-card border border-border bg-bg-surface p-4 shadow-card md:block">
            <div
              className="flex h-full items-center justify-center rounded-[10px] border border-white/10 bg-black/35"
              style={{ boxShadow: `inset 0 0 60px ${platformColor}33` }}
            >
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full font-display text-[38px] uppercase text-white shadow-ctrl-3d"
                style={{ backgroundColor: platformColor }}
              >
                {platformCode.slice(0, 3)}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
