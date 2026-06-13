"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type ProductType = "game" | "console" | "accessory";
type TabId = "description" | "specs" | "shipping";

export interface PdpTabsProps {
  description: string;
  productType: ProductType;
  platform: string;
  metadata?: Record<string, unknown> | null;
  productTitle?: string;
}

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "description", label: "Description" },
  { id: "specs", label: "Specifications" },
  { id: "shipping", label: "Shipping & Returns" },
];

function metadataText(metadata: Record<string, unknown> | null | undefined, key: string, fallback: string) {
  const value = metadata?.[key];
  return typeof value === "string" || typeof value === "number" ? String(value) : fallback;
}

function Icon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {children}
    </svg>
  );
}

function specRows(productType: ProductType, platform: string, metadata: Record<string, unknown> | null | undefined, productTitle: string) {
  if (productType === "console") {
    return [
      ["Platform", platform],
      ["Region", "NTSC - North America"],
      ["Video Output", "Composite & S-Video"],
      ["Controller Ports", "4 - all tested for stick drift"],
      ["Condition", "Refurbished - cleaned & bench-tested"],
      ["In the Box", "Console, 1x 3rd-party controller, power supply, A/V cable"],
      ["Warranty", "1-year OMG Retro warranty"],
    ];
  }

  if (productType === "accessory") {
    return [
      ["Type", "Controller"],
      ["Platform", platform],
      ["Color", productTitle],
      ["Connection", "Standard N64 controller plug"],
      ["Condition", "Pre-owned - cleaned, tested, drift-checked"],
      ["Compatibility", "All Nintendo 64 consoles"],
      ["Warranty", "1-year OMG Retro warranty"],
    ];
  }

  return [
    ["Platform", platform],
    ["Region", "NTSC - North America"],
    ["Release Year", metadataText(metadata, "year", "N/A")],
    ["Genre", metadataText(metadata, "genre", "N/A")],
    ["Players", metadataText(metadata, "players", "1 Player")],
    ["Condition Grading", "Loose / CIB / Sealed - each individually graded"],
    ["Includes", "Varies by condition (see selector above)"],
  ];
}

const shipCards = [
  {
    id: "shipping",
    title: "Free U.S. Shipping",
    body: "Fast tracked shipping on qualifying orders.",
    icon: (
      <>
        <path d="M14 18V6H3v12h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2v-6h-4l-3-4v10h1" />
      </>
    ),
    details: ["Free shipping on U.S. orders $75+.", "Tracking sent as soon as the label prints.", "Orders ship in protective packaging."],
  },
  {
    id: "tested",
    title: "Tested & Guaranteed",
    body: "Every item is checked on real hardware.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="11" rx="3" />
        <path d="M8 13h.01M16 13h.01M10 11v4M8 13h4" />
      </>
    ),
    details: ["Contacts and ports are cleaned.", "Buttons, saves, and video output are verified.", "Condition notes are checked before shipping."],
  },
  {
    id: "returns",
    title: "Easy Returns",
    body: "Simple help if something is not right.",
    icon: (
      <>
        <path d="m3 7 3-3 3 3" />
        <path d="M6 4v12a4 4 0 0 0 4 4h8" />
      </>
    ),
    details: ["30-day return window on eligible items.", "Quick support from the OMG Retro team.", "Return labels available when applicable."],
  },
  {
    id: "warranty",
    title: "1-Year Warranty",
    body: "Covered for real play, not just shelf life.",
    icon: <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />,
    details: ["One year warranty on tested items.", "Repair, replacement, or store credit support.", "Warranty applies to normal play conditions."],
  },
];

export default function PdpTabs({ description, productType, platform, metadata, productTitle = "" }: PdpTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [expandedShip, setExpandedShip] = useState<string | null>("shipping");
  const rows = specRows(productType, platform, metadata, productTitle);
  const openCard = shipCards.find((card) => card.id === expandedShip);

  return (
    <section className="pdp-details">
      <div className="pdp-wrap">
        <div className="tab-bar" role="tablist" aria-label="Product information">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn${activeTab === tab.id ? " is-active" : ""}`}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={`tab-panel${activeTab === "description" ? " is-active" : ""}`} role="tabpanel">
          <div className="prose">
            <p className="lead">{description || "A tested and cleaned OMG Retro item, ready for your collection."}</p>
            <p><em>Every item is inspected, cleaned, and packed for collectors who still play.</em></p>
          </div>
        </div>

        <div className={`tab-panel${activeTab === "specs" ? " is-active" : ""}`} role="tabpanel">
          <table className="spec-table">
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label}>
                  <th>{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`tab-panel${activeTab === "shipping" ? " is-active" : ""}`} role="tabpanel">
          <div className="ship-grid">
            {shipCards.map((card) => {
              const expanded = expandedShip === card.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  className="ship-card"
                  aria-expanded={expanded}
                  onClick={() => setExpandedShip(expanded ? null : card.id)}
                >
                  <span className="ship-accent" />
                  <Icon className="ship-ico">{card.icon}</Icon>
                  <h4>{card.title}</h4>
                  <p>{card.body}</p>
                  <span className="ship-more-link">
                    <span className="lbl-open">More details</span>
                    <span className="lbl-close">Close details</span>
                    <Icon><path d="m6 9 6 6 6-6" /></Icon>
                  </span>
                  {expanded ? (
                    <ul className="ship-more">
                      {card.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  ) : null}
                  <span className="ship-caret" />
                </button>
              );
            })}
          </div>

          <div className={`ship-drawer${openCard ? " is-open" : ""}`}>
            {openCard ? (
              <div className="ship-drawer-in">
                <div className="ship-drawer-pad">
                  <div className="ship-panel-head">
                    <div>
                      <Icon className="ship-panel-ico">{openCard.icon}</Icon>
                      <div className="ship-panel-title">{openCard.title}</div>
                      <div className="ship-panel-sub">{openCard.body}</div>
                    </div>
                    <button type="button" className="ship-panel-close" onClick={() => setExpandedShip(null)} aria-label="Close shipping details">
                      ×
                    </button>
                  </div>
                  <ul className="ship-detail-list">
                    {openCard.details.map((detail) => (
                      <li key={detail}>
                        <Icon><path d="m5 12 4 4L19 6" /></Icon>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="ship-contact">Questions? <a href="/info/contact">Contact OMG Retro support</a>.</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
