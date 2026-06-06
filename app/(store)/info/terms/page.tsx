import { InfoSection } from "@/components/info/InfoBlocks";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";

export const dynamic = "force-dynamic";

export default function TermsPage() {
  return (
    <InfoPageLayout title="Terms of Service" subtitle="The plain rules for using OMG Retro." breadcrumbLabel="Terms of Service">
      <InfoSection title="Overview">
        <p>
          These terms describe how OMG Retro provides products, content, and services. By using the site or placing an order, you agree to these terms.
        </p>
      </InfoSection>
      <InfoSection title="Orders and Payment">
        <p>
          Product availability, pricing, and condition details may change. We reserve the right to cancel orders affected by inventory errors, payment issues, or suspected fraud.
        </p>
      </InfoSection>
      <InfoSection title="Product Condition">
        <p>
          We make every reasonable effort to describe item condition clearly. Retro items are pre-owned unless specifically marked New/Sealed, and normal age-related wear may be present.
        </p>
      </InfoSection>
      <InfoSection title="Returns and Warranty">
        <p>
          Returns are handled under our Returns Policy. Warranty coverage applies to qualifying tested items for 12 months from delivery.
        </p>
      </InfoSection>
      <InfoSection title="Site Use">
        <p>
          You may not misuse the site, attempt to disrupt checkout, scrape data at scale, or use OMG Retro content in a way that misrepresents our brand.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}

