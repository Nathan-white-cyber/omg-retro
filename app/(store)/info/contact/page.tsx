import type { Metadata } from "next";
import { ContactForm } from "@/components/info/ContactForm";
import { DarkCallout, FeatureCard, InfoSection } from "@/components/info/InfoBlocks";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createMetadata({
  title: "Contact Us — OMG Retro",
  description: "Contact the OMG Retro support team for order help, returns, warranty, and game questions.",
  path: "/info/contact",
});

export default function ContactPage() {
  return (
    <InfoPageLayout title="Contact Us" subtitle="Real people, real help." breadcrumbLabel="Contact Us">
      <InfoSection title="Send Us a Message">
        <ContactForm />
      </InfoSection>

      <section>
        <h2 className="mb-4 font-display text-4xl uppercase leading-none text-text-dark">
          Other Ways To Reach Us
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard title="Email">support@omgretro.com</FeatureCard>
          <FeatureCard title="Response Time">Within 24 hours on business days.</FeatureCard>
          <FeatureCard title="Order Help">Include your order number for faster support.</FeatureCard>
        </div>
      </section>

      <DarkCallout title="Before You Contact Us">
        <p>
          Many shipping, return, and warranty answers are available in the quick links. If you still need help, send us a note and we will take care of it.
        </p>
      </DarkCallout>
    </InfoPageLayout>
  );
}
