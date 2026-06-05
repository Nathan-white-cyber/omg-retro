import type { ProductCondition } from "@/types";

export interface ConditionBadgeProps {
  condition: ProductCondition;
}

const conditionStyles: Record<ProductCondition, string> = {
  CIB: "bg-status-success/10 text-status-success ring-status-success/25",
  Loose: "bg-white/10 text-text-secondary ring-white/10",
  "New/Sealed": "bg-status-info/10 text-[#8fb0e0] ring-status-info/30",
};

export function ConditionBadge({ condition }: ConditionBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-badge px-2 py-1 font-body text-[9.5px] font-bold uppercase tracking-[0.05em] ring-1 ${conditionStyles[condition]}`}
    >
      {condition}
    </span>
  );
}
