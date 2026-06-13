"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type ProductType = "game" | "console" | "accessory";
type TabId = "description" | "details" | "shipping";

export interface PdpTabsProps {
  description: string;
  productType: ProductType;
  platform: string;
}

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "description", label: "Description" },
  { id: "details", label: "Details" },
  { id: "shipping", label: "Shipping & Returns" },
];

function RowIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function PdpTabs({ description, productType, platform }: PdpTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <section className="pdp-tabs-section">
      <div className="pdp-wrap">
        <div className="pdp-tab-nav" role="tablist" aria-label="Product information">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn${activeTab === tab.id ? " is-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={`tab-panel${activeTab === "description" ? " is-active" : ""}`} role="tabpanel">
          <h3>Description</h3>
          <p>{description || "A tested and cleaned OMG Retro item, ready for your collection."}</p>
        </div>
        <div className={`tab-panel${activeTab === "details" ? " is-active" : ""}`} role="tabpanel">
          <h3>Details</h3>
          <ul>
            <li>Platform: {platform}</li>
            <li>Condition: all tested & guaranteed</li>
            <li>Region: NTSC (North America)</li>
            <li>Compatible Systems: {platform}</li>
            {productType === "console" ? <li>Includes Controller: Yes</li> : null}
          </ul>
        </div>
        <div className={`tab-panel${activeTab === "shipping" ? " is-active" : ""}`} role="tabpanel">
          <h3>Shipping & Returns</h3>
          <div className="ship-rows">
            <div className="ship-row">
              <RowIcon><path d="M14 18V6H3v12h2" /><path d="M15 18H9" /><path d="M19 18h2v-6h-4l-3-4v10h1" /></RowIcon>
              <div className="ship-row-text"><h4>Free Shipping</h4><p>Free Shipping on orders $75+.</p></div>
            </div>
            <div className="ship-row">
              <RowIcon><path d="m3 7 3-3 3 3" /><path d="M6 4v12a4 4 0 0 0 4 4h8" /></RowIcon>
              <div className="ship-row-text"><h4>30-Day Returns</h4><p>Return eligible products within 30 days.</p></div>
            </div>
            <div className="ship-row">
              <RowIcon><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" /></RowIcon>
              <div className="ship-row-text"><h4>1-Year Warranty</h4><p>Every tested product is backed for one full year.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
