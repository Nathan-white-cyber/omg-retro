import { HeroBanner } from "@/components/sections/HomeSections";
import { TrustBar } from "@/components/sections/TrustBar";
import { PlatformGridSkeleton, ProductRailSkeleton } from "@/components/sections/home-skeletons";

export default function StoreLoading() {
  return (
    <>
      <HeroBanner />
      <TrustBar />
      <PlatformGridSkeleton />
      <ProductRailSkeleton count={4} />
      <ProductRailSkeleton count={6} />
    </>
  );
}
