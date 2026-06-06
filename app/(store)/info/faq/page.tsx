import { InfoSection } from "@/components/info/InfoBlocks";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";

export const dynamic = "force-dynamic";

const faqs = [
  ["Are your games authentic?", "Yes. We do not sell reproductions or bootlegs. Every item is inspected for authenticity before listing."],
  ["Do you test every game?", "Yes. Games are cleaned and tested on original hardware before shipping."],
  ["What does CIB mean?", "CIB means complete in box. It usually includes the original game, case or box, manual, and any listed inserts."],
  ["How fast do you ship?", "Orders placed before 2 PM EST ship same day. Later orders ship the next business day."],
  ["Do you accept returns?", "Yes. Returns are accepted within 30 days, and warranty issues are covered for 12 months."],
  ["Do you ship outside the United States?", "For now we support U.S. and Canadian shipping in the checkout experience."],
  ["What if my game stops working?", "Contact us with your order number. Our 1-year warranty covers replacement or refund for qualifying items."],
  ["Can I change my order?", "Contact us as soon as possible. Once an order ships, changes may not be possible."],
];

export default function FaqPage() {
  return (
    <InfoPageLayout title="Help Centre / FAQ" subtitle="Answers before you need to ask." breadcrumbLabel="Help Centre / FAQ">
      <InfoSection title="Frequently Asked Questions">
        <div className="space-y-3">
          {faqs.map(([question, answer]) => (
            <details key={question} className="rounded-card border border-border-cream bg-bg-cream p-4">
              <summary className="cursor-pointer font-extrabold text-text-dark">{question}</summary>
              <p className="mt-3 text-sm leading-relaxed text-text-dark-muted">{answer}</p>
            </details>
          ))}
        </div>
      </InfoSection>
    </InfoPageLayout>
  );
}

