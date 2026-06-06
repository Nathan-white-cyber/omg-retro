import { DarkCallout, FeatureCard, InfoSection } from "@/components/info/InfoBlocks";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <InfoPageLayout title="Contact Us" subtitle="Real people, real help." breadcrumbLabel="Contact Us">
      <InfoSection title="Send Us a Message">
        <form className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">Name</span>
              <input className="h-11 w-full rounded-btn border border-border-cream bg-bg-cream px-3 outline-none focus:border-brand-red" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">Email</span>
              <input type="email" className="h-11 w-full rounded-btn border border-border-cream bg-bg-cream px-3 outline-none focus:border-brand-red" />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">Order number optional</span>
            <input className="h-11 w-full rounded-btn border border-border-cream bg-bg-cream px-3 outline-none focus:border-brand-red" />
          </label>
          <label className="block">
            <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">Message</span>
            <textarea rows={6} className="w-full rounded-btn border border-border-cream bg-bg-cream px-3 py-3 outline-none focus:border-brand-red" />
          </label>
          <button type="button" className="h-11 w-full rounded-btn bg-brand-red px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark md:w-auto">
            Send Message
          </button>
        </form>
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

