import type { Metadata } from "next";
import { FaqContent } from "@/components/info/FaqContent";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createMetadata({
  title: "Help Centre — OMG Retro",
  description: "Find answers about OMG Retro shipping, returns, warranty, conditions, payment, and accounts.",
  path: "/info/faq",
});

export default function FaqPage() {
  return (
    <InfoPageLayout title="Help Centre / FAQ" subtitle="Answers before you need to ask." breadcrumbLabel="Help Centre / FAQ">
      <FaqContent />
    </InfoPageLayout>
  );
}
