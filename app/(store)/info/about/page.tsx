import type { Metadata } from "next";
import Link from "next/link";
import { DarkCallout, FeatureCard, InfoSection } from "@/components/info/InfoBlocks";
import { InfoPageLayout } from "@/components/info/InfoPageLayout";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createMetadata({
  title: "About Us — OMG Retro",
  description: "Learn the story behind OMG Retro and our authentic, tested retro game promise.",
  path: "/info/about",
});

export default function AboutPage() {
  return (
    <InfoPageLayout title="About Us" subtitle="By gamers, for gamers." breadcrumbLabel="About Us">
      <InfoSection title="Our Story">
        <p>
          OMG Retro was founded by lifelong collectors who were tired of buying untested games from unreliable sellers. Too many listings had vague condition notes, surprise reproductions, or cartridges that simply did not work.
        </p>
        <p>
          We built the store we always wished existed: one where every item is authentic, honestly graded, and tested before it ships. Retro collecting should feel exciting, not risky.
        </p>
        <p>
          Today, OMG Retro helps players and collectors find original games, consoles, and accessories with the confidence that every order has been handled by people who care about the same details you do.
        </p>
        <div className="mt-6 rounded-card border border-border bg-[#1A1A1A]">
          <div className="grid h-[300px] place-items-center text-white/50">
            The OMG Retro team
          </div>
        </div>
        <p className="text-center text-[12px] font-bold uppercase tracking-[0.08em] text-text-dark-muted">
          The OMG Retro team
        </p>
      </InfoSection>

      <section>
        <h2 className="mb-4 font-display text-4xl uppercase leading-none text-text-dark">
          What Makes Us Different
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard title="Authentic Only">No reproductions, no bootlegs. Every item verified original.</FeatureCard>
          <FeatureCard title="Tested on Real Hardware">Every game played on the original console before it ships.</FeatureCard>
          <FeatureCard title="Honestly Graded">Real photos, accurate descriptions. What you see is what you get.</FeatureCard>
          <FeatureCard title="Packaged with Care">Anti-static bags, bubble wrap, custom boxes for CIB items.</FeatureCard>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-4xl uppercase leading-none text-text-dark">
          Our Team
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["JR", "Jake Rivera", "Founder", "Started collecting N64 games at age 12. Built OMG Retro to be the store he always wished existed."],
            ["MS", "Maria Santos", "Head of Quality", "Tests every single item before it ships. 10 years of retro hardware experience."],
            ["CP", "Chris Park", "Customer Support", "Gamer first, support lead second. Here to make sure every order is perfect."],
          ].map(([initials, name, role, bio]) => (
            <div key={name} className="rounded-card border border-border-cream bg-white p-5 text-center shadow-card">
              <div className="mx-auto grid h-[60px] w-[60px] place-items-center rounded-full bg-brand-red font-display text-2xl uppercase text-white">
                {initials}
              </div>
              <h3 className="mt-4 font-extrabold text-text-dark">{name}</h3>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-brand-red">{role}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-dark-muted">{bio}</p>
            </div>
          ))}
        </div>
      </section>

      <DarkCallout title="Our Guarantee" href="/info/guarantee" cta="View Our Guarantee">
        <p>Every game. Tested. Guaranteed. Backed by our 1-year warranty.</p>
      </DarkCallout>

      <div className="hidden">
        <Link href="/info/guarantee">Guarantee</Link>
      </div>
    </InfoPageLayout>
  );
}
