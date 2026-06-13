"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

const controllerColors = [
  { name: "Classic Grey", color: "#9a9ea3" },
  { name: "Smoke Black", color: "#1c1c22" },
  { name: "Atomic Purple", color: "#6a4fb0" },
  { name: "Jungle Green", color: "#1f8a4c" },
  { name: "Watermelon Red", color: "#d23b2c" },
  { name: "Ice Blue", color: "#3a7bd5" },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function Stepper({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="qty-sm">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease add-on quantity">
        -
      </button>
      <input value={value} readOnly aria-label="Add-on quantity" />
      <button type="button" onClick={() => onChange(Math.min(4, value + 1))} aria-label="Increase add-on quantity">
        +
      </button>
    </div>
  );
}

export default function AddonConfigurator() {
  // TODO: wire to Medusa cart.
  const [openAddon, setOpenAddon] = useState<string | null>("oem");
  const [oemQty, setOemQty] = useState(1);
  const [thirdPartyQty, setThirdPartyQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(controllerColors[2]);

  return (
    <div className="addon-list">
      <div className={`addon${openAddon === "oem" ? " is-open" : ""}`}>
        <button type="button" className="addon-head" onClick={() => setOpenAddon(openAddon === "oem" ? null : "oem")}>
          <span className="addon-check">
            <CheckIcon />
          </span>
          <span className="addon-info">
            <span className="addon-name">OEM Controller</span>
            <span className="addon-desc">Official Nintendo controller in your chosen color</span>
          </span>
          <span className="addon-price">+$20.00 each</span>
        </button>
        <div className="addon-body">
          <div className="addon-row">
            <span className="addon-row-label">Qty</span>
            <Stepper value={oemQty} onChange={setOemQty} />
          </div>
          <div className="addon-row">
            <span className="addon-row-label">Color</span>
            <div className="swatches">
              {controllerColors.map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  className={`swatch${swatch.name === selectedColor.name ? " is-sel" : ""}`}
                  style={{ "--c": swatch.color } as CSSProperties}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedColor(swatch);
                  }}
                  aria-label={swatch.name}
                />
              ))}
              <span className="swatch-name">
                Selected: <b>{selectedColor.name}</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={`addon${openAddon === "third-party" ? " is-open" : ""}`}>
        <button
          type="button"
          className="addon-head"
          onClick={() => setOpenAddon(openAddon === "third-party" ? null : "third-party")}
        >
          <span className="addon-check">
            <CheckIcon />
          </span>
          <span className="addon-info">
            <span className="addon-name">3rd-Party Controller</span>
            <span className="addon-desc">Budget-friendly tested controller</span>
          </span>
          <span className="addon-price">+$14.99 each</span>
        </button>
        <div className="addon-body">
          <div className="addon-row">
            <span className="addon-row-label">Qty</span>
            <Stepper value={thirdPartyQty} onChange={setThirdPartyQty} />
          </div>
        </div>
      </div>
    </div>
  );
}
