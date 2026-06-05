import { PlpPage, type PlpSearchParams } from "@/components/plp/PlpPage";
import { getPlpRouteContext, metadataForPlp } from "@/lib/plp/catalog";

type PageProps = {
  searchParams?: Promise<PlpSearchParams> | PlpSearchParams;
};

export const metadata = metadataForPlp(getPlpRouteContext("platform", { vendor: "sega" }));

export default async function SegaPage({ searchParams = {} }: PageProps) {
  return <PlpPage kind="platform" vendor="sega" searchParams={await searchParams} />;
}
