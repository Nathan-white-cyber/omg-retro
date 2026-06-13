const trustItems = [
  {
    label: "Authentic Games",
    icon: (
      <>
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    label: "Tested Before Shipping",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="11" rx="3" />
        <circle cx="8" cy="12.5" r="1.3" />
        <path d="M16 11h.01M19 13h.01" />
      </>
    ),
  },
  {
    label: "1-Year Warranty",
    icon: <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />,
  },
  {
    label: "Free Shipping $75+",
    icon: (
      <>
        <path d="M1 5h13v11H1zM14 8h4l4 4v4h-8" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
  },
];

export function PlpTrustStrip() {
  return (
    <section className="plp-trust border-b border-[var(--omg-line)] bg-[var(--omg-surface)]">
      <div className="mx-auto max-w-[1240px] px-7">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-[11px]">
          {trustItems.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-2 font-body text-[12px] font-extrabold uppercase tracking-[0.05em] text-[var(--omg-ink-soft)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className="h-4 w-4 flex-none text-brand-red"
              >
                {item.icon}
              </svg>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
