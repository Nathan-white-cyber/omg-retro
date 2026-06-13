"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils/format";

export interface ConditionVariant {
  id: string;
  title: string;
  prices: Array<{ amount: number }>;
}

export interface ConditionSelectorProps {
  variants: ConditionVariant[];
  onSelect: (variantId: string, price: number) => void;
}

const descriptions: Record<string, string> = {
  Loose: "Cartridge only, tested & cleaned",
  CIB: "Complete in box - manual + case",
  Sealed: "New, factory sealed",
};

export default function ConditionSelector({ variants, onSelect }: ConditionSelectorProps) {
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? "");

  useEffect(() => {
    const first = variants[0];
    if (!first) return;

    setSelectedId(first.id);
    onSelect(first.id, first.prices[0]?.amount ?? 0);
  }, [onSelect, variants]);

  if (!variants.length) return null;

  return (
    <div className="buy-field">
      <span className="field-label">
        Condition <span className="field-hint">Choose your copy</span>
      </span>
      <div className="condition-opts">
        {variants.map((variant) => {
          const price = variant.prices[0]?.amount ?? 0;
          const selected = variant.id === selectedId;

          return (
            <button
              key={variant.id}
              type="button"
              className="condition-opt"
              aria-pressed={selected}
              onClick={() => {
                setSelectedId(variant.id);
                onSelect(variant.id, price);
              }}
            >
              <span>
                <span className="opt-name">{variant.title}</span>
                {descriptions[variant.title] ? <span className="opt-desc">{descriptions[variant.title]}</span> : null}
              </span>
              <span className="opt-price">{formatPrice(price)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
