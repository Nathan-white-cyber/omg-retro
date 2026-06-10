"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { getPlatformVisual } from "@/lib/utils/platform";
import styles from "./ControllerButton.module.css";

export interface ControllerButtonProps {
  platform: string;
  variant: 1 | 2 | 3 | 4;
  style?: "3d" | "subtle";
  onClick: () => void;
  loading?: boolean;
  added?: boolean;
  fullWidth?: boolean;
  className?: string;
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={styles.cartIcon}
      aria-hidden="true"
    >
      <path d="M3 4h2l2.4 12.5a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 8H6" />
      <circle cx="10" cy="21" r="1.4" />
      <circle cx="18" cy="21" r="1.4" />
    </svg>
  );
}

function Glyph({ letter }: { letter: string }) {
  return <span className={letter === "\u2715" ? styles.psCross : undefined}>{letter}</span>;
}

function pressWord(letter: string) {
  return letter === "\u2715" ? "\u2715" : letter;
}

export function ControllerButton({
  platform,
  variant,
  style = "3d",
  onClick,
  loading = false,
  added = false,
  fullWidth = false,
  className = "",
}: ControllerButtonProps) {
  const [flashAdded, setFlashAdded] = useState(false);
  const visual = getPlatformVisual(platform);
  const isAdded = added || flashAdded;
  const rootClass = `${styles.root} ${fullWidth ? styles.rootFull : ""} ${
    style === "3d" ? styles.style3d : styles.styleSubtle
  } ${className}`;
  const variantClass =
    variant === 1
      ? styles.iconOnly
      : variant === 2
        ? styles.combo
        : variant === 3
          ? styles.press
          : styles.full;

  useEffect(() => {
    if (!flashAdded) {
      return;
    }

    const timeout = window.setTimeout(() => setFlashAdded(false), 800);
    return () => window.clearTimeout(timeout);
  }, [flashAdded]);

  const handleClick = () => {
    if (loading) {
      return;
    }

    onClick();
    setFlashAdded(true);
  };

  const cssVars = {
    "--ctrl-color": visual.color,
    "--ctrl-text": visual.textColor,
  } as CSSProperties;

  const label = loading ? "Adding..." : isAdded ? "Added! \u2713" : "Add to Cart";

  return (
    <span className={rootClass} style={cssVars}>
      <button
        type="button"
        className={`${styles.button} ${variantClass} ${isAdded ? styles.added : ""} ${
          loading ? styles.loading : ""
        }`}
        onClick={handleClick}
        disabled={loading}
        aria-label={variant === 1 ? `${label} ${platform}` : undefined}
      >
        {variant === 1 ? (
          <Glyph letter={isAdded ? "\u2713" : visual.letter} />
        ) : (
          <>
            <span className={styles.icon}>
              <Glyph letter={visual.letter} />
            </span>
            <span className={styles.label}>
              {variant === 3 && !loading && !isAdded
                ? `Press ${pressWord(visual.letter)} to Add`
                : label}
            </span>
            {variant === 4 ? <CartIcon /> : null}
          </>
        )}
      </button>
    </span>
  );
}
