const trustItems = [
  {
    title: "Authentic Games",
    body: "Original games. No reproductions.",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
    ),
  },
  {
    title: "Tested Before Shipping",
    body: "Every game is tested and cleaned.",
    icon: (
      <>
        <rect x="3" y="8" width="18" height="10" rx="4" />
        <path d="M8 13h.01M16 13h.01M10 11v4M8 13h4" />
      </>
    ),
  },
  {
    title: "1-Year Warranty",
    body: "Shop with confidence.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  },
  {
    title: "Fast U.S. Shipping",
    body: "Orders $75+ ship free.",
    icon: (
      <>
        <path d="M1 5h13v11H1zM14 8h4l4 4v4h-8" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
  },
];

interface TrustBarProps {
  variant?: "default" | "compact";
}

export function TrustBar({ variant = "default" }: TrustBarProps) {
  if (variant === "compact") {
    return (
      <section className="bg-bg-surface">
        <div className="mx-auto max-w-[1240px] px-7 py-3">
          <p className="text-center font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-primary">
            Authentic Games <span className="mx-2 text-brand-red">·</span>
            Tested Before Shipping <span className="mx-2 text-brand-red">·</span>
            1-Year Warranty <span className="mx-2 text-brand-red">·</span>
            Free Shipping $75+
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bg-surface">
      <div className="mx-auto grid max-w-[1240px] gap-4 px-7 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3.5 rounded-card border border-border bg-bg-dark/40 p-4"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-10 w-10 shrink-0 rounded-full bg-brand-red/10 p-2 text-brand-red"
              aria-hidden="true"
            >
              {item.icon}
            </svg>
            <div>
              <h3 className="font-body text-[13.5px] font-extrabold uppercase tracking-[0.04em] text-text-primary">
                {item.title}
              </h3>
              <p className="mt-0.5 text-[12.5px] leading-snug text-text-secondary">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
