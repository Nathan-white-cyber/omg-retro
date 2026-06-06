import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BlogListingClient } from "@/components/blog/BlogListingClient";
import { blogPosts } from "@/lib/blog/posts";

type BlogPageProps = {
  searchParams?: Promise<{ category?: string; tag?: string; author?: string }> | { category?: string; tag?: string; author?: string };
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The OMG Retro Blog - Retro Gaming Guides, Tips & News",
  description:
    "Collecting guides, game spotlights, and retro gaming culture from the team at OMG Retro.",
};

export default async function BlogPage({ searchParams = {} }: BlogPageProps) {
  const params = await searchParams;

  return (
    <div className="bg-bg-cream text-text-dark">
      <section className="bg-[#0E0E0E] text-white">
        <Breadcrumb items={[{ label: "Blog" }]} variant="dark" />
        <div className="mx-auto max-w-[1240px] px-7 py-12">
          <p className="font-body text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand-red">
            Guides and culture
          </p>
          <h1 className="mt-3 font-display text-display-lg uppercase leading-none text-white">
            The OMG Retro Blog
          </h1>
          <p className="mt-4 max-w-[620px] text-body-lg text-white/60">
            Guides, collecting tips, and retro gaming culture.
          </p>
        </div>
      </section>
      <BlogListingClient
        posts={blogPosts}
        initialCategory={params.category ?? "All"}
        initialTag={params.tag}
        initialAuthor={params.author}
      />
    </div>
  );
}

