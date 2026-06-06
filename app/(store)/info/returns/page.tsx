import { DarkCallout, FeatureCard, InfoSection } from "@/components/info/InfoBlocks";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";

export const dynamic = "force-dynamic";

export default function ReturnsPage() {
  return (
    <InfoPageLayout title="Returns Policy" subtitle="Simple returns, real support." breadcrumbLabel="Returns Policy">
      <DarkCallout title="30-Day Returns">
        <p>
          If your order is not right, contact us within 30 days of delivery. Items must be returned in the same condition received, including manuals, inserts, cases, and accessories when applicable.
        </p>
      </DarkCallout>

      <section>
        <h2 className="mb-4 font-display text-4xl uppercase leading-none text-text-dark">
          How Returns Work
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard title="Contact Us First">Send your order number and a quick note about the issue.</FeatureCard>
          <FeatureCard title="Pack Carefully">Use the original packaging when possible to protect the item.</FeatureCard>
          <FeatureCard title="Ship It Back">We will provide return instructions and warranty labels when applicable.</FeatureCard>
          <FeatureCard title="Refund or Replace">Once inspected, we issue your refund or replacement quickly.</FeatureCard>
        </div>
      </section>

      <InfoSection title="Warranty Claims">
        <p>
          Warranty claims are covered for 12 months. If a tested item stops working during that window, we cover return shipping and offer a replacement or full refund.
        </p>
      </InfoSection>

      <InfoSection title="Non-Returnable Items">
        <p>
          Items damaged after delivery, missing original included components, or returned in materially different condition may not qualify for a full refund.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}

