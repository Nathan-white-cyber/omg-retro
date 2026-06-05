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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://omgretro.com"),
  title: "OMG Retro — Authentic Retro Games, Consoles & Accessories",
  description:
    "Shop authentic, tested retro games and consoles. Every item cleaned, tested on original hardware, and backed by a 1-year warranty. Free US shipping on orders over $75.",
  openGraph: {
    title: "OMG Retro — Authentic Retro Games, Consoles & Accessories",
    description:
      "Shop authentic, tested retro games and consoles. Every item cleaned, tested on original hardware, and backed by a 1-year warranty.",
    images: [
      {
        url: "/images/og-placeholder.png",
        width: 1200,
        height: 630,
        alt: "OMG Retro",
      },
    ],
  },
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
      <Suspense fallback={<ProductRailSkeleton count={6} dark />}>
        <BestSellersSection />
      </Suspense>
      <WhyShopSection />
      <Suspense fallback={<ProductRailSkeleton count={4} />}>
        <RecentlyAddedSection />
      </Suspense>
      <SearchCtaSection />
    </>
  );
}
