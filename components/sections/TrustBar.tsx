const trustItems = [
  {
    title: "100% Authentic",
    body: "Originals only - never reproductions.",
    icon: (
      <>
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Tested & Cleaned",
    body: "Verified on real hardware before shipping.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="11" rx="3" />
        <circle cx="8" cy="12.5" r="1.3" />
        <path d="M16 11h.01M19 13h.01" />
      </>
    ),
  },
  {
    title: "1-Year Warranty",
    body: "We stand behind every purchase.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  },
  {
    title: "Free U.S. Shipping",
    body: "On orders over $75. Ships in 1-2 days.",
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
      <div className="omg-trust-bar">
        <div className="omg-container py-3">
          <p className="text-center font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#17161d]">
            100% Authentic <span className="mx-2 text-brand-red">|</span>
            Tested & Cleaned <span className="mx-2 text-brand-red">|</span>
            1-Year Warranty <span className="mx-2 text-brand-red">|</span>
            Free Shipping $75+
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="omg-trust-bar">
      <div className="omg-container">
        {trustItems.map((item) => (
          <div key={item.title} className="omg-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {item.icon}
            </svg>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
