export interface DiscountBadgeProps {
  percent: number;
}

export function DiscountBadge({ percent }: DiscountBadgeProps) {
  return (
    <span className="inline-flex rounded-badge bg-brand-red px-2 py-1 font-body text-[10.5px] font-extrabold uppercase tracking-[0.05em] text-white">
      {percent}% OFF
    </span>
  );
}
