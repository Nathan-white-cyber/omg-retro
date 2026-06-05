export interface RatingStarsProps {
  rating: number;
  reviewCount: number;
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-[13px] w-[13px] ${filled ? "fill-[#f5a623]" : "fill-transparent"} text-[#f5a623]`}
      aria-hidden="true"
    >
      <path
        d="m12 2 3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.77l-6.18 3.24L7 14.13l-5-4.87 6.91-1L12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RatingStars({ rating, reviewCount }: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
      <span className="inline-flex" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} filled={index < clamped} />
        ))}
      </span>
      <span>({reviewCount.toLocaleString("en-US")})</span>
    </span>
  );
}
