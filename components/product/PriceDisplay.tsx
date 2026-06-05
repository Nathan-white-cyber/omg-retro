import { formatPrice } from "@/lib/utils/format";

export interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  showSaving?: boolean;
}

export function PriceDisplay({ price, originalPrice, showSaving = false }: PriceDisplayProps) {
  const saving = originalPrice ? Math.max(originalPrice - price, 0) : 0;

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className="font-body text-[18px] font-extrabold leading-none text-brand-red">
        {formatPrice(price)}
      </span>
      {originalPrice ? (
        <span className="text-[13px] text-text-secondary line-through">
          {formatPrice(originalPrice)}
        </span>
      ) : null}
      {showSaving && saving > 0 ? (
        <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-status-success">
          Save {formatPrice(saving)}
        </span>
      ) : null}
    </div>
  );
}
