"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArticleCard, AuthorMeta } from "@/components/blog/BlogCards";
import { ProductCard } from "@/components/product/ProductCard";
import { blogCategories, type BlogPost } from "@/lib/blog/posts";
import { mockProducts } from "@/lib/medusa/mock-products";

interface BlogListingClientProps {
  posts: BlogPost[];
  initialCategory?: string;
  initialTag?: string;
  initialAuthor?: string;
}

const shopProducts = mockProducts
  .slice()
  .sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0))
  .slice(0, 4);

export function BlogListingClient({
  posts,
  initialCategory = "All",
  initialTag,
  initialAuthor,
}: BlogListingClientProps) {
  const [category, setCategory] = useState(initialCategory);
  const [showAll, setShowAll] = useState(false);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesTag = !initialTag || post.tags.some((tag) => tag.toLowerCase() === initialTag.toLowerCase());
      const matchesAuthor = !initialAuthor || post.author.name.toLowerCase() === initialAuthor.toLowerCase();
      return matchesCategory && matchesTag && matchesAuthor;
    });
  }, [category, initialAuthor, initialTag, posts]);

  const visiblePosts = showAll ? filteredPosts : filteredPosts.slice(0, 6);
  const [featured, ...gridPosts] = visiblePosts;

  return (
    <>
      <section className="border-b border-border-cream bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-3 overflow-x-auto px-7 py-4">
          {blogCategories.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                className={`h-10 shrink-0 rounded-full px-5 text-sm font-extrabold uppercase tracking-[0.06em] transition ${
                  active
                    ? "bg-brand-red text-white"
                    : "border border-border-cream bg-bg-cream text-text-dark hover:border-brand-red hover:text-brand-red"
                }`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-7 py-10">
        {featured ? (
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-card border border-border-cream bg-white shadow-card transition duration-normal hover:-translate-y-1 hover:border-border-light hover:shadow-card-hover lg:grid-cols-[55fr_45fr]"
          >
            <div
              className="min-h-[300px]"
              style={{ backgroundColor: featured.coverColor }}
              aria-hidden="true"
            />
            <div className="flex flex-col p-6 lg:p-8">
              <span className="font-body text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-red">
                {featured.category}
              </span>
              <h2 className="mt-3 font-display text-5xl uppercase leading-none text-text-dark">
                {featured.title}
              </h2>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-text-dark-muted">
                {featured.excerpt}
              </p>
              <div className="mt-6">
                <AuthorMeta post={featured} />
              </div>
              <span className="mt-auto pt-7 text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red">
                Read Article {"\u2192"}
              </span>
            </div>
          </Link>
        ) : (
          <div className="rounded-card border border-border-cream bg-white p-10 text-center shadow-card">
            <h2 className="font-display text-4xl uppercase text-text-dark">No Articles Found</h2>
          </div>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>

        <section className="mt-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-body text-[12px] font-extrabold uppercase tracking-[0.1em] text-brand-red">
                Shop picks
              </p>
              <h2 className="mt-2 font-display text-4xl uppercase leading-none text-text-dark">
                Shop The Games We Write About
              </h2>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {shopProducts.map((game) => (
              <ProductCard key={game.id} game={game} ctaVariant={2} />
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-bold text-text-dark-muted">
            Showing {visiblePosts.length} of 12 articles
          </p>
          <button
            type="button"
            disabled={showAll}
            className="h-11 rounded-btn border border-border-cream bg-white px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-text-dark transition hover:border-brand-red hover:text-brand-red disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setShowAll(true)}
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
}

