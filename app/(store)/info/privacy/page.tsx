import { InfoSection } from "@/components/info/InfoBlocks";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";

export const dynamic = "force-dynamic";

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy Policy" subtitle="How we handle your information." breadcrumbLabel="Privacy Policy">
      <InfoSection title="Information We Collect">
        <p>
          We collect information needed to process orders, provide support, improve the site, and communicate with customers. This may include name, email, shipping address, order history, and site activity.
        </p>
      </InfoSection>
      <InfoSection title="How We Use Information">
        <p>
          We use your information to fulfill orders, send tracking updates, answer support requests, prevent fraud, and improve the OMG Retro shopping experience.
        </p>
      </InfoSection>
      <InfoSection title="Payment Security">
        <p>
          Payment details are handled by payment processors. OMG Retro does not store full card numbers on our servers.
        </p>
      </InfoSection>
      <InfoSection title="Sharing">
        <p>
          We share only what is needed with carriers, payment processors, and service providers that help us run the store. We do not sell customer personal information.
        </p>
      </InfoSection>
      <InfoSection title="Your Choices">
        <p>
          You can contact us to request updates, corrections, or deletion of eligible account information. Marketing emails can be unsubscribed from at any time.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}

