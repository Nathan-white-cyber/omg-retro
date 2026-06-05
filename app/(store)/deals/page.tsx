import { PlpPage, type PlpSearchParams } from "@/components/plp/PlpPage";
import { getPlpRouteContext, metadataForPlp } from "@/lib/plp/catalog";

type PageProps = {
  searchParams?: Promise<PlpSearchParams> | PlpSearchParams;
};

export const metadata = metadataForPlp(getPlpRouteContext("deals"));

export default async function DealsPage({ searchParams = {} }: PageProps) {
  return <PlpPage kind="deals" searchParams={await searchParams} />;
}
