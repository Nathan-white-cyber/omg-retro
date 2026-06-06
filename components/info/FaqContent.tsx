"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { useMemo, useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqGroup {
  title: string;
  items: FaqItem[];
}

const faqGroups: FaqGroup[] = [
  {
    title: "Orders & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 3-7 business days. Expedited shipping takes 1-3 business days.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes. Standard shipping is free on orders over $75. Orders under $75 ship for $4.99.",
      },
      {
        question: "How do I track my order?",
        answer:
          "You will receive a tracking number by email as soon as the shipping label is created.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "Contact us as soon as possible. Once an order ships, changes may not be possible.",
      },
    ],
  },
  {
    title: "Returns & Warranty",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "Returns are accepted within 30 days. Items must be returned in the same condition received.",
      },
      {
        question: "How does the 1-year warranty work?",
        answer:
          "If a tested item stops working within 12 months, contact us with your order number. We will replace it or issue a refund.",
      },
      {
        question: "What items are not eligible for return?",
        answer:
          "Items damaged after delivery, missing original included components, or returned in materially different condition may not qualify for a full refund.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Refunds are issued after the returned item is inspected. Your bank or card provider may take several business days to post the refund.",
      },
    ],
  },
  {
    title: "Game Conditions",
    items: [
      {
        question: "What does CIB mean?",
        answer:
          "CIB means complete in box. It usually includes the original game, case or box, manual, and any listed inserts.",
      },
      {
        question: "What is the difference between Loose and CIB?",
        answer:
          "Loose usually means the game only. CIB means complete in box with the original packaging and included materials described in the listing.",
      },
      {
        question: "How do you grade condition?",
        answer:
          "We inspect labels, shells, discs, cases, manuals, inserts, and overall wear, then describe the item honestly before listing it.",
      },
      {
        question: "Are your games authentic?",
        answer:
          "Yes. We do not sell reproductions or bootlegs. Every item is inspected for authenticity before listing.",
      },
    ],
  },
  {
    title: "Payment & Account",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major cards and supported express payment options shown during checkout.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. Payment information is processed securely by our payment provider. OMG Retro does not store full card numbers.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Password reset support will be fully wired when account authentication is integrated. For now, contact us if you need account help.",
      },
      {
        question: "Can I shop without creating an account?",
        answer:
          "Yes. You can browse products and checkout without creating an account. Creating an account makes order tracking and wishlist management easier.",
      },
    ],
  },
];

function itemMatches(item: FaqItem, term: string) {
  const haystack = `${item.question} ${item.answer}`.toLowerCase();
  return haystack.includes(term.toLowerCase());
}

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-10 w-10 rounded-full bg-brand-red/10 p-2 text-brand-red" aria-hidden="true">
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v4a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 2" />
      <path d="M20 13v4a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2" />
      <path d="M16 19c0 1-1 2-3 2h-1" />
    </svg>
  );
}

export function FaqContent() {
  const [query, setQuery] = useState("");
  const filteredGroups = useMemo(
    () =>
      faqGroups
        .map((group) => ({
          ...group,
          items: query ? group.items.filter((item) => itemMatches(item, query)) : group.items,
        }))
        .filter((group) => group.items.length > 0),
    [query],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-card border border-border-cream bg-white p-6 shadow-card">
        <h2 className="font-display text-4xl uppercase leading-none text-text-dark">
          Frequently Asked Questions
        </h2>

        <div className="mt-5 flex rounded-btn border border-border-cream bg-bg-cream focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/20">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search help articles..."
            className="h-12 min-w-0 flex-1 bg-transparent px-4 text-sm text-text-dark outline-none placeholder:text-text-dark-muted"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              className="grid h-12 w-10 place-items-center text-xl font-bold text-text-dark-muted transition hover:text-brand-red"
              onClick={() => setQuery("")}
            >
              {"\u00d7"}
            </button>
          ) : null}
          <button
            type="button"
            className="h-12 rounded-r-btn bg-brand-red px-5 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark"
          >
            Search
          </button>
        </div>

        <div className="mt-6 space-y-7">
          {filteredGroups.map((group) => (
            <section key={group.title}>
              <h3 className="mb-3 font-body text-[13px] font-extrabold uppercase tracking-[0.1em] text-text-dark">
                {group.title}
              </h3>
              <Accordion.Root
                key={`${group.title}-${query}`}
                type="single"
                collapsible
                defaultValue="item-0"
                className="space-y-3"
              >
                {group.items.map((item, index) => (
                  <Accordion.Item
                    key={item.question}
                    value={`item-${index}`}
                    className="overflow-hidden rounded-card border border-border-cream bg-bg-cream"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left font-extrabold text-text-dark transition hover:text-brand-red">
                        {item.question}
                        <span className="text-brand-red" aria-hidden="true">+</span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-4 pb-4 text-sm leading-relaxed text-text-dark-muted">
                      {item.answer}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </section>
          ))}

          {filteredGroups.length === 0 ? (
            <p className="rounded-card border border-border-cream bg-bg-cream p-4 text-sm font-bold text-text-dark-muted">
              No help articles matched your search.
            </p>
          ) : null}
        </div>
      </section>

      <section className="rounded-card border border-white/10 bg-[#1A1A1A] p-6 text-white shadow-card">
        <HeadsetIcon />
        <h2 className="mt-3 font-display text-4xl uppercase leading-none">
          Still Need Help?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Our team responds within 24 hours.
        </p>
        <Link
          href="/info/contact"
          className="mt-5 inline-flex h-11 items-center rounded-btn bg-brand-red px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
