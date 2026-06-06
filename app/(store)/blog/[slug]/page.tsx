import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/blog/BlogCards";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { ProductCard } from "@/components/product/ProductCard";
import { getBlogPost, getRelatedPosts } from "@/lib/blog/posts";
import { mockProducts } from "@/lib/medusa/mock-products";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found - OMG Retro Blog",
    };
  }

  return {
    title: `${post.title} - OMG Retro Blog`,
    description: post.excerpt.slice(0, 160),
  };
}

function relatedGamesFor(slug: string) {
  if (slug.includes("n64")) {
    return mockProducts.filter((game) => game.systemCode === "N64").slice(0, 4);
  }

  if (slug.includes("gamecube")) {
    return mockProducts.filter((game) => game.systemCode === "GCN" || game.platform === "GameCube").slice(0, 4);
  }

  if (slug.includes("snes")) {
    return mockProducts.filter((game) => game.systemCode === "SNES").slice(0, 4);
  }

  if (slug.includes("fake") || slug.includes("cib")) {
    return mockProducts.filter((game) => game.condition === "CIB").slice(0, 4);
  }

  return mockProducts
    .slice()
    .sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0))
    .slice(0, 4);
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const relatedGames = relatedGamesFor(post.slug);

  return (
    <div className="bg-bg-cream text-text-dark">
      <div className="border-b border-border-cream bg-bg-cream">
        <div className="mx-auto max-w-[1240px] px-7">
          <nav className="flex min-h-[52px] items-center gap-2 overflow-x-auto whitespace-nowrap font-body text-[12.5px] font-bold uppercase tracking-[0.05em] text-text-dark-muted">
            <Link href="/" className="transition hover:text-brand-red">Home</Link>
            <span>/</span>
            <Link href="/blog" className="transition hover:text-brand-red">Blog</Link>
            <span>/</span>
            <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="transition hover:text-brand-red">
              {post.category}
            </Link>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-[720px] px-7 py-10">
        <span className="inline-flex rounded-full bg-brand-red px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white">
          {post.category}
        </span>
        <h1 className="mt-4 font-display text-display-lg uppercase leading-none text-text-dark">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center gap-3 text-sm text-text-dark-muted">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-red font-body text-sm font-extrabold uppercase text-white">
            {post.author.avatar}
          </span>
          <span>
            <span className="block font-bold text-text-dark">By {post.author.name}</span>
            <span>{post.date} - {post.readTime}</span>
          </span>
        </div>

        <div
          className="mt-8 h-[200px] rounded-card border border-border-cream shadow-card"
          style={{ backgroundColor: post.coverColor }}
          aria-hidden="true"
        />

        <div
          className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:text-text-dark prose-p:text-text-dark-muted prose-blockquote:border-l-brand-red prose-blockquote:text-text-dark"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="rounded-full bg-black/[0.06] px-3 py-1 text-[12px] font-bold text-text-dark-muted transition hover:bg-brand-red hover:text-white"
            >
              {tag}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <ShareButtons />
        </div>

        <section className="mt-8 rounded-card border border-border-cream bg-white p-5 shadow-card">
          <div className="flex gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-red font-body text-lg font-extrabold uppercase text-white">
              {post.author.avatar}
            </span>
            <div>
              <h2 className="text-lg font-extrabold text-text-dark">{post.author.name}</h2>
              <p className="mt-1 text-sm leading-relaxed text-text-dark-muted">{post.author.bio}</p>
              <Link
                href={`/blog?author=${encodeURIComponent(post.author.name)}`}
                className="mt-3 inline-flex text-sm font-extrabold uppercase tracking-[0.06em] text-brand-red"
              >
                View all posts {"\u2192"}
              </Link>
            </div>
          </div>
        </section>
      </article>

      <section className="mx-auto max-w-[1240px] px-7 pb-12">
        <h2 className="mb-5 font-display text-4xl uppercase leading-none text-text-dark">
          Related Articles
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {relatedPosts.map((item) => (
            <ArticleCard key={item.slug} post={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-7 pb-14">
        <h2 className="mb-5 font-display text-4xl uppercase leading-none text-text-dark">
          Games Mentioned In This Article
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedGames.map((game) => (
            <ProductCard key={game.id} game={game} ctaVariant={2} />
          ))}
        </div>
      </section>
    </div>
  );
}

