import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { TrustBar } from "@/components/sections/TrustBar";

export function PlpLoadingPage() {
  return (
    <>
      <section className="bg-bg-dark">
        <div className="mx-auto max-w-[1240px] px-7 py-12">
          <div className="h-3 w-40 animate-pulse rounded bg-brand-red/50" />
          <div className="mt-4 h-14 max-w-xl animate-pulse rounded bg-white/10" />
          <div className="mt-4 h-5 max-w-2xl animate-pulse rounded bg-white/10" />
        </div>
      </section>
      <TrustBar variant="compact" />
      <section className="border-b border-border bg-bg-dark">
        <div className="mx-auto flex max-w-[1240px] gap-3 overflow-hidden px-7 py-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-[108px] min-w-[128px] animate-pulse rounded-card bg-bg-surface" />
          ))}
        </div>
      </section>
      <section className="bg-bg-cream">
        <div className="mx-auto max-w-[1240px] px-7 py-5">
          <div className="mb-5 h-14 animate-pulse rounded-card bg-white" />
          <div className="grid gap-7 lg:grid-cols-plp-layout">
            <div className="hidden h-[620px] animate-pulse rounded-card bg-white lg:block" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <TrustBar variant="compact" />
    </>
  );
}
