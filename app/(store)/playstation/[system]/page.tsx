import type { Metadata } from "next";
import { PlpPage, type PlpSearchParams } from "@/components/plp/PlpPage";
import { getPlpRouteContext, metadataForPlp } from "@/lib/plp/catalog";

type PageProps = {
  params: Promise<{ system: string }> | { system: string };
  searchParams?: Promise<PlpSearchParams> | PlpSearchParams;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { system } = await params;
  return metadataForPlp(getPlpRouteContext("system", { vendor: "playstation", systemSlug: system }));
}

export default async function PlayStationSystemPage({ params, searchParams = {} }: PageProps) {
  const { system } = await params;
  return <PlpPage kind="system" vendor="playstation" systemSlug={system} searchParams={await searchParams} />;
}
