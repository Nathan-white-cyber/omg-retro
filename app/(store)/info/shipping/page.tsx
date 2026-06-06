import { DarkCallout, FeatureCard, InfoSection } from "@/components/info/InfoBlocks";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";

export const dynamic = "force-dynamic";

export default function ShippingPage() {
  return (
    <InfoPageLayout title="Shipping Information" subtitle="Fast, careful, tracked." breadcrumbLabel="Shipping Info">
      <section>
        <h2 className="mb-4 font-display text-4xl uppercase leading-none text-text-dark">
          Shipping Options
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard title="Standard Shipping">
            3-7 business days. FREE on orders over $75, $4.99 on orders under $75. USPS or UPS with tracking.
          </FeatureCard>
          <FeatureCard title="Expedited Shipping">
            1-3 business days. $9.99 flat rate. UPS Priority with tracking.
          </FeatureCard>
        </div>
      </section>

      <InfoSection title="How We Package Your Order">
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard title="Cartridges">Anti-static bag plus bubble wrap.</FeatureCard>
          <FeatureCard title="CIB Games">Custom-fit box to protect original packaging.</FeatureCard>
          <FeatureCard title="Consoles">Double-boxed with foam padding.</FeatureCard>
          <FeatureCard title="Accessories">Padded envelope or box depending on size.</FeatureCard>
        </div>
      </InfoSection>

      <DarkCallout title="Order Processing">
        <p>
          Orders placed before 2 PM EST ship same day. Orders after 2 PM or on weekends ship the next business day. You will receive a tracking number by email as soon as the label is created.
        </p>
      </DarkCallout>

      <InfoSection title="Tracking and Delivery">
        <p>
          Every shipment includes tracking. Delivery estimates begin once the carrier scans your package, and weather or carrier delays may add time during busy seasons.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}

