import { PlpPage, type PlpSearchParams } from "@/components/plp/PlpPage";
import { getPlpRouteContext, metadataForPlp } from "@/lib/plp/catalog";

type PageProps = {
  searchParams?: Promise<PlpSearchParams> | PlpSearchParams;
};

export const metadata = metadataForPlp(getPlpRouteContext("platform", { vendor: "playstation" }));

export default async function PlayStationPage({ searchParams = {} }: PageProps) {
  return <PlpPage kind="platform" vendor="playstation" searchParams={await searchParams} />;
}
