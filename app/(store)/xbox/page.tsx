import { PlpPage, type PlpSearchParams } from "@/components/plp/PlpPage";
import { getPlpRouteContext, metadataForPlp } from "@/lib/plp/catalog";

type PageProps = {
  searchParams?: Promise<PlpSearchParams> | PlpSearchParams;
};

export const metadata = metadataForPlp(getPlpRouteContext("platform", { vendor: "xbox" }));

export default async function XboxPage({ searchParams = {} }: PageProps) {
  return <PlpPage kind="platform" vendor="xbox" searchParams={await searchParams} />;
}
