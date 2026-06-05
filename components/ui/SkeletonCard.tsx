export interface SkeletonCardProps {
  variant?: "grid" | "list";
  className?: string;
}

export function SkeletonCard({ variant = "grid", className = "" }: SkeletonCardProps) {
  if (variant === "list") {
    return (
      <div
        className={`grid animate-pulse grid-cols-[120px_1fr] gap-4 rounded-card border border-border bg-bg-surface p-3 shadow-card ${className}`}
      >
        <div className="aspect-[3/4] rounded bg-bg-surface2" />
        <div className="flex flex-col gap-3">
          <div className="h-3 w-24 rounded bg-bg-surface2" />
          <div className="h-4 w-3/4 rounded bg-bg-surface2" />
          <div className="h-4 w-1/2 rounded bg-bg-surface2" />
          <div className="mt-auto flex items-center justify-between gap-4">
            <div className="h-6 w-20 rounded bg-bg-surface2" />
            <div className="h-10 w-32 rounded-full bg-bg-surface2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex animate-pulse flex-col overflow-hidden rounded-card border border-border bg-bg-surface shadow-card ${className}`}
    >
      <div className="aspect-[4/3] bg-bg-surface2" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-3 w-24 rounded bg-bg-surface2" />
        <div className="h-4 w-full rounded bg-bg-surface2" />
        <div className="h-4 w-3/4 rounded bg-bg-surface2" />
        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="h-6 w-20 rounded bg-bg-surface2" />
          <div className="h-6 w-14 rounded bg-bg-surface2" />
        </div>
        <div className="h-3 w-28 rounded bg-bg-surface2" />
      </div>
      <div className="px-4 pb-4">
        <div className="h-[52px] rounded-full bg-bg-surface2" />
      </div>
    </div>
  );
}
