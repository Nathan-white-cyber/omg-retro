import { PlpPage, type PlpSearchParams } from "@/components/plp/PlpPage";
import { getPlpRouteContext, metadataForPlp } from "@/lib/plp/catalog";

type PageProps = {
  searchParams?: Promise<PlpSearchParams> | PlpSearchParams;
};

export const metadata = metadataForPlp(getPlpRouteContext("search"));

export default async function SearchPage({ searchParams = {} }: PageProps) {
  return <PlpPage kind="search" searchParams={await searchParams} />;
}
