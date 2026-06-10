import { SkeletonCard } from "@/components/ui/SkeletonCard";

export function ProductRailSkeleton({ count = 4, dark = false }: { count?: number; dark?: boolean }) {
  return (
    <div className={dark ? "bg-bg-dark px-7 py-section-y-sm md:py-section-y" : "bg-bg-cream px-7 py-section-y-sm md:py-section-y"}>
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-6 h-8 w-64 animate-pulse rounded bg-bg-surface2/50" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: count }, (_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PlatformGridSkeleton() {
  return (
    <div className="bg-bg-cream px-7 py-section-y-sm md:py-section-y">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-6 h-8 w-64 animate-pulse rounded bg-bg-surface2/30" />
        <div className="grid gap-5 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="aspect-[1/1.12] animate-pulse rounded-card bg-bg-surface2" />
          ))}
        </div>
      </div>
    </div>
  );
}
