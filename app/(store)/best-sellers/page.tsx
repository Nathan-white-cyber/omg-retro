import { PlpPage, type PlpSearchParams } from "@/components/plp/PlpPage";
import { getPlpRouteContext, metadataForPlp } from "@/lib/plp/catalog";

type PageProps = {
  searchParams?: Promise<PlpSearchParams> | PlpSearchParams;
};

export const metadata = metadataForPlp(getPlpRouteContext("best-sellers"));

export default async function BestSellersPage({ searchParams = {} }: PageProps) {
  return <PlpPage kind="best-sellers" searchParams={await searchParams} />;
}
