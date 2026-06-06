"use client";

import { useState } from "react";

export function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 border-y border-border-cream py-5">
      <span className="text-sm font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
        Share this article:
      </span>
      <a
        href="https://twitter.com/intent/tweet"
        className="grid h-10 w-10 place-items-center rounded-full border border-border-cream bg-white text-sm font-extrabold text-text-dark transition hover:border-brand-red hover:text-brand-red"
        aria-label="Share on Twitter"
      >
        T
      </a>
      <a
        href="https://www.facebook.com/sharer/sharer.php"
        className="grid h-10 w-10 place-items-center rounded-full border border-border-cream bg-white text-sm font-extrabold text-text-dark transition hover:border-brand-red hover:text-brand-red"
        aria-label="Share on Facebook"
      >
        F
      </a>
      <button
        type="button"
        className="h-10 rounded-full border border-border-cream bg-white px-4 text-sm font-extrabold text-text-dark transition hover:border-brand-red hover:text-brand-red"
        onClick={copyLink}
      >
        {copied ? "Copied" : "Copy Link"}
      </button>
    </div>
  );
}

