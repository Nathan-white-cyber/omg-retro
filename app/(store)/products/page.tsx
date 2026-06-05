import { PlpPage, type PlpSearchParams } from "@/components/plp/PlpPage";
import { getPlpRouteContext, metadataForPlp } from "@/lib/plp/catalog";

type PageProps = {
  searchParams?: Promise<PlpSearchParams> | PlpSearchParams;
};

export const metadata = metadataForPlp(getPlpRouteContext("products"));

export default async function ProductsPage({ searchParams = {} }: PageProps) {
  return <PlpPage kind="products" searchParams={await searchParams} />;
}
