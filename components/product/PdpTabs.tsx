"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useState } from "react";

type ProductType = "game" | "console" | "accessory";
type TabId = "desc" | "specs" | "ship";

export interface PdpTabsProps {
  description: string;
  productType: ProductType;
  platform: string;
  metadata: Record<string, string>;
}

interface ShipDetail {
  text: string;
  excluded?: boolean;
}

interface ShipCard {
  id: string;
  title: string;
  text: string;
  icon: ReactNode;
  details: ShipDetail[];
}

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "desc", label: "Description" },
  { id: "specs", label: "Specifications" },
  { id: "ship", label: "Shipping & Returns" },
];

function Icon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {children}
    </svg>
  );
}

function specRows(productType: ProductType, platform: string, metadata: Record<string, string>) {
  if (productType === "console") {
    return [
      ["Platform", platform],
      ["Region", "NTSC - North America"],
      ["Video Output", "Composite & S-Video (A/V multi-out)"],
      ["Controller Ports", "4 - all tested for stick drift"],
      ["Condition", "Refurbished - cleaned & bench-tested"],
      ["In the Box", "Console · 1x 3rd-party controller · power supply · A/V cable"],
      ["Warranty", "1-year OMG Retro warranty"],
    ];
  }

  if (productType === "accessory") {
    return [
      ["Type", "Controller"],
      ["Platform", platform],
      ["Color", "Atomic Purple (translucent)"],
      ["Connection", "Standard N64 controller plug"],
      ["Expansion", "Compatible with Rumble Pak & Controller Pak"],
      ["Condition", "Pre-owned - cleaned, tested, drift-checked"],
      ["Compatibility", "All Nintendo 64 consoles"],
      ["Warranty", "1-year OMG Retro warranty"],
    ];
  }

  return [
    ["Platform", platform],
    ["Region", "NTSC - North America"],
    ["Release Year", metadata.year ?? "N/A"],
    ["Genre", metadata.genre ?? "N/A"],
    ["Players", metadata.players ?? "1 Player"],
    ["Save Type", "Internal battery save (3 files)"],
    ["Condition", "Loose / CIB / Sealed - each individually graded"],
    ["Includes", "Varies by condition (see selector above)"],
  ];
}

const shipCards: ShipCard[] = [
  {
    id: "free-shipping",
    title: "Free U.S. Shipping",
    icon: (
      <>
        <path d="M1 5h13v11H1zM14 8h4l4 4v4h-8" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    text: "Orders over $75 ship free. Most orders ship within 1-2 business days via tracked mail.",
    details: [
      { text: "Standard delivery: 3-7 business days (free over $75, $4.99 under)" },
      { text: "Expedited delivery: 1-3 business days ($9.99)" },
      { text: "All orders include tracking via USPS or UPS" },
      { text: "Orders placed before 2 PM EST ship same day" },
      { text: "Cartridges ship in anti-static bags with bubble wrap" },
      { text: "CIB and boxed items ship in custom-fit boxes to protect original packaging" },
    ],
  },
  {
    id: "tested",
    title: "Tested & Guaranteed",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="11" rx="3" />
        <circle cx="8" cy="12.5" r="1.3" />
        <path d="M16 11h.01M19 13h.01" />
      </>
    ),
    text: "Every game is cleaned and tested on original hardware before it leaves our shop.",
    details: [
      { text: "Each game is played and verified to title screen on original console hardware" },
      { text: "Cartridge pins are cleaned and polished" },
      { text: "Disc-based games are resurfaced if needed and tested for read errors" },
      { text: "All listings include honest condition descriptions and real photos" },
      { text: "\"Complete in Box\" means cartridge/disc + manual + original box unless otherwise noted" },
      { text: "Have a question about condition? Contact us - we'll send additional photos" },
    ],
  },
  {
    id: "warranty",
    title: "1-Year Warranty",
    icon: <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />,
    text: "If it stops working within a year, we'll repair or replace it - no hassle.",
    details: [
      { text: "Covers all games, consoles, and accessories" },
      { text: "If your item stops working within 12 months of purchase, we will replace it or issue a full refund - your choice" },
      { text: "No questions asked - just contact us with your order number" },
      { text: "We cover return shipping on all warranty claims" },
      { text: "Does not cover physical damage, liquid damage, or buyer modifications", excluded: true },
    ],
  },
  {
    id: "returns",
    title: "30-Day Returns",
    icon: (
      <>
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    text: "Not what you expected? Return any item within 30 days for a full refund.",
    details: [
      { text: "30-day return window from delivery date" },
      { text: "Condition mismatch: full refund + free return shipping" },
      { text: "Defective / not working: full refund or replacement + free return shipping" },
      { text: "Changed your mind: return accepted in same condition received - buyer pays return shipping ($4.99 label provided)" },
      { text: "Refunds processed within 3-5 business days after item received" },
      { text: "Not eligible: sealed items opened after delivery, items modified by buyer, items damaged after delivery", excluded: true },
    ],
  },
];

export default function PdpTabs({ description, productType, platform, metadata }: PdpTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("desc");
  const [expandedShip, setExpandedShip] = useState<string | null>(null);
  const rows = specRows(productType, platform, metadata);
  const openCard = shipCards.find((card) => card.id === expandedShip);

  function toggleShipCard(id: string) {
    setExpandedShip((current) => (current === id ? null : id));
  }

  function onShipKeyDown(event: KeyboardEvent<HTMLDivElement>, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleShipCard(id);
    }
  }

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

        <div className={`tab-panel${activeTab === "desc" ? " is-active" : ""}`} data-panel="desc" role="tabpanel">
          <div className="prose">
            <p className="lead">{description || "A tested and cleaned OMG Retro item, ready for your collection."}</p>
            <p><em>Every item is inspected, cleaned, and packed for collectors who still play.</em></p>
          </div>
        </div>

        <div className={`tab-panel${activeTab === "specs" ? " is-active" : ""}`} data-panel="specs" role="tabpanel">
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

        <div className={`tab-panel${activeTab === "ship" ? " is-active" : ""}`} data-panel="ship" role="tabpanel">
          <div className="ship-expand">
            <div className="ship-grid">
              {shipCards.map((card) => {
                const expanded = expandedShip === card.id;

                return (
                  <div
                    key={card.id}
                    className="ship-card"
                    role="button"
                    tabIndex={0}
                    aria-expanded={expanded}
                    onClick={() => toggleShipCard(card.id)}
                    onKeyDown={(event) => onShipKeyDown(event, card.id)}
                  >
                    <span className="ship-accent" />
                    <Icon className="ship-ico">{card.icon}</Icon>
                    <h4>{card.title}</h4>
                    <p>{card.text}</p>
                    <span className="ship-more-link">
                      <span className="lbl-open">View Details</span>
                      <span className="lbl-close">Hide Details</span>
                      <Icon><path d="m6 9 6 6 6-6" /></Icon>
                    </span>
                    <ul className="ship-more" hidden={!expanded}>
                      {card.details.map((detail) => (
                        <li key={detail.text} className={detail.excluded ? "is-excl" : undefined}>
                          {detail.text}
                        </li>
                      ))}
                    </ul>
                    <span className="ship-caret" />
                  </div>
                );
              })}
            </div>

            <div className={`ship-drawer${openCard ? " is-open" : ""}`} data-ship-drawer>
              <div className="ship-drawer-in">
                <div className="ship-drawer-pad">
                  <span className="ship-caret" />
                  <div className="ship-panel">
                    <div className="ship-panel-head">
                      <div>
                        {openCard ? <Icon className="ship-panel-ico">{openCard.icon}</Icon> : null}
                        <div className="ship-panel-title">{openCard?.title ?? ""}</div>
                        <div className="ship-panel-sub">{openCard?.text ?? ""}</div>
                      </div>
                      <button
                        type="button"
                        className="ship-panel-close"
                        onClick={() => setExpandedShip(null)}
                        aria-label="Close shipping details"
                      >
                        {"\u00d7"}
                      </button>
                    </div>
                    <ul className="ship-detail-list">
                      {openCard?.details.map((detail) => (
                        <li key={detail.text} className={detail.excluded ? "is-excl" : undefined}>
                          <Icon><path d="m5 12 4 4L19 6" /></Icon>
                          <span>{detail.text}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="ship-contact">
                      Questions? <a href="#">Contact our shop {"\u2192"}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
