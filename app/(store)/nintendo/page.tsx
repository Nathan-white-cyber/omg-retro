import { PlpPage, type PlpSearchParams } from "@/components/plp/PlpPage";
import { getPlpRouteContext, metadataForPlp } from "@/lib/plp/catalog";

type PageProps = {
  searchParams?: Promise<PlpSearchParams> | PlpSearchParams;
};

export const metadata = metadataForPlp(getPlpRouteContext("platform", { vendor: "nintendo" }));

export default async function NintendoPage({ searchParams = {} }: PageProps) {
  return <PlpPage kind="platform" vendor="nintendo" searchParams={await searchParams} />;
}
