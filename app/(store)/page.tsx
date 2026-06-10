import type { Metadata } from "next";
import { Suspense } from "react";
import {
  BestSellersSection,
  FeaturedDealsSection,
  HeroBanner,
  RecentlyAddedSection,
  SearchCtaSection,
  ShopByPlatformSection,
  WhyShopSection,
} from "@/components/sections/HomeSections";
import { TrustBar } from "@/components/sections/TrustBar";
import { PlatformGridSkeleton, ProductRailSkeleton } from "@/components/sections/home-skeletons";
import { createMetadata, ogImageUrl, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...createMetadata({
    title: "OMG Retro — Authentic Retro Games, Consoles & Accessories",
    description:
      "Shop authentic, tested retro games and consoles. Every item cleaned, tested on original hardware, and backed by a 1-year warranty.",
    path: "/",
    image: ogImageUrl,
  }),
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBar />
      <Suspense fallback={<PlatformGridSkeleton />}>
        <ShopByPlatformSection />
      </Suspense>
      <Suspense fallback={<ProductRailSkeleton count={4} />}>
        <FeaturedDealsSection />
      </Suspense>
      <Suspense fallback={<ProductRailSkeleton count={6} />}>
        <BestSellersSection />
      </Suspense>
      <Suspense fallback={<ProductRailSkeleton count={4} />}>
        <RecentlyAddedSection />
      </Suspense>
      <WhyShopSection />
      <SearchCtaSection />
    </>
  );
}
