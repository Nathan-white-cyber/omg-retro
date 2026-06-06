import { FaqContent } from "@/components/info/FaqContent";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";

export const dynamic = "force-dynamic";

export default function FaqPage() {
  return (
    <InfoPageLayout title="Help Centre / FAQ" subtitle="Answers before you need to ask." breadcrumbLabel="Help Centre / FAQ">
      <FaqContent />
    </InfoPageLayout>
  );
}
