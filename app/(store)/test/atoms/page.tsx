import { AtomsTestClient } from "./AtomsTestClient";

export default function ProductAtomsTestPage() {
  return (
    <section className="bg-bg-dark px-6 py-10">
      <div className="mx-auto max-w-[1240px]">
        <p className="mb-3 font-body text-label-md uppercase text-brand-red">
          Phase 3 Test Page
        </p>
        <h1 className="font-display text-display-md uppercase text-text-primary">
          Product Atoms
        </h1>
        <p className="mt-3 max-w-2xl text-body-lg text-text-secondary">
          Standalone atoms for product cards, listing pages, PDP, cart recommendations,
          and wishlist surfaces.
        </p>
        <div className="mt-8">
          <AtomsTestClient />
        </div>
      </div>
    </section>
  );
}
