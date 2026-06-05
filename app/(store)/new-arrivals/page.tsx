import { PlpPage, type PlpSearchParams } from "@/components/plp/PlpPage";
import { getPlpRouteContext, metadataForPlp } from "@/lib/plp/catalog";

type PageProps = {
  searchParams?: Promise<PlpSearchParams> | PlpSearchParams;
};

export const metadata = metadataForPlp(getPlpRouteContext("new-arrivals"));

export default async function NewArrivalsPage({ searchParams = {} }: PageProps) {
  return <PlpPage kind="new-arrivals" searchParams={await searchParams} />;
}
