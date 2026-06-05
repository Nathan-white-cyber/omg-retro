import Link from "next/link";

interface LogoProps {
  className?: string;
  tagline?: boolean;
}

export function Logo({ className = "", tagline = true }: LogoProps) {
  return (
    <Link href="/" className={`flex shrink-0 flex-col leading-none ${className}`}>
      <span className="flex gap-2 font-display text-[30px] uppercase tracking-[0.01em]">
        <span className="text-text-primary">OMG</span>
        <span className="text-brand-red">Retro</span>
      </span>
      {tagline ? (
        <span className="mt-1 font-body text-[9.5px] font-bold uppercase tracking-[0.22em] text-text-secondary">
          Authentic Retro Gaming
        </span>
      ) : null}
    </Link>
  );
}
