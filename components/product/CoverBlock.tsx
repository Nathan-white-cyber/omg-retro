import Image from "next/image";
import type { CSSProperties } from "react";
import { getPlatformColor } from "@/lib/utils/platform";

export interface CoverBlockProps {
  platform: string;
  systemCode: string;
  title: string;
  imageUrl?: string;
  coverColor?: string;
  aspect?: "portrait" | "landscape" | "square";
  priority?: boolean;
  className?: string;
}

export function CoverBlock({
  platform,
  systemCode,
  title,
  imageUrl,
  coverColor,
  aspect = "portrait",
  priority = false,
  className = "",
}: CoverBlockProps) {
  const color = coverColor ?? getPlatformColor(platform);
  const aspectClass =
    aspect === "landscape" ? "aspect-[4/3]" : aspect === "square" ? "aspect-square" : "aspect-[3/4]";

  return (
    <div
      className={`relative flex ${aspectClass} w-full flex-col justify-between overflow-hidden rounded bg-[linear-gradient(150deg,var(--cover-color),color-mix(in_srgb,var(--cover-color)_62%,#000))] p-2.5 text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.15)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(115deg,rgba(255,255,255,.16),transparent_42%)] ${className}`}
      style={{ "--cover-color": color } as CSSProperties}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          <span className="relative z-10 self-start rounded-[3px] bg-black/30 px-1.5 py-0.5 font-body text-[8.5px] font-extrabold uppercase tracking-[0.08em]">
            {systemCode}
          </span>
          <span className="relative z-10 font-display text-[clamp(16px,2vw,26px)] uppercase leading-none tracking-[0.01em] drop-shadow-[0_1px_3px_rgba(0,0,0,.5)]">
            {title}
          </span>
        </>
      )}
    </div>
  );
}
