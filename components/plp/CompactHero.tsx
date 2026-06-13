interface CompactHeroProps {
  title: string;
  subtitle: string;
  platformCode?: string;
  platformColor?: string;
}

export function CompactHero({
  title,
  subtitle,
  platformCode,
  platformColor = "#CC1E1E",
}: CompactHeroProps) {
  return (
    <section className="border-b border-[var(--omg-line)] bg-[var(--omg-surface)]">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-7 py-10 md:grid-cols-[1fr_320px] md:items-center md:py-12">
        <div>
          <p className="font-body text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-red">
            Authentic · Tested · Guaranteed
          </p>
          <h1 className="mt-3 font-display text-[42px] uppercase leading-none text-[var(--omg-ink)] sm:text-[58px] lg:text-[68px]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--omg-ink-soft)]">
            {subtitle}
          </p>
        </div>

        {platformCode ? (
          <div className="hidden h-[170px] rounded-card border border-[var(--omg-line)] bg-[var(--omg-bg-page)] p-4 shadow-card md:block">
            <div
              className="flex h-full items-center justify-center rounded-[10px] border border-[var(--omg-line)] bg-white"
              style={{ boxShadow: `inset 0 0 60px ${platformColor}22` }}
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
