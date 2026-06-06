import { DarkCallout, FeatureCard, InfoSection } from "@/components/info/InfoBlocks";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";

export const dynamic = "force-dynamic";

export default function GuaranteePage() {
  return (
    <InfoPageLayout title="Our Guarantee" subtitle="Every game. Tested. Guaranteed." breadcrumbLabel="Our Guarantee">
      <DarkCallout title="The OMG Retro Promise">
        <p>
          Every game we sell has been cleaned, tested on original hardware, and confirmed working before it ships. If it does not work, we make it right - no questions asked.
        </p>
      </DarkCallout>

      <section>
        <h2 className="mb-4 font-display text-4xl uppercase leading-none text-text-dark">
          What We Guarantee
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard title="Authentic Only">No reproductions, no fakes. Ever.</FeatureCard>
          <FeatureCard title="Tested on Real Hardware">Played and verified on the original console.</FeatureCard>
          <FeatureCard title="Honest Grading">Conditions described accurately with real photos.</FeatureCard>
          <FeatureCard title="Packaged with Care">Protection for every order.</FeatureCard>
        </div>
      </section>

      <DarkCallout title="1-Year Warranty" href="/info/contact" cta="Contact Us">
        <p>
          If your item stops working within 12 months, contact us with your order number. We will replace it or issue a full refund - your choice. We cover return shipping on all warranty claims.
        </p>
      </DarkCallout>

      <InfoSection title="Authenticity Guarantee">
        <p>
          We verify every item using the details that matter: board markings, label printing, cartridge shell quality, chip signatures, disc identifiers, case artwork, and region-specific manufacturing details.
        </p>
        <p>
          If an item cannot be confidently authenticated, it does not go into our catalog.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}

