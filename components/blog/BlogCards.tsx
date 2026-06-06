import Link from "next/link";
import type { BlogPost } from "@/lib/blog/posts";

export function AuthorMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-3 text-[12px] text-text-dark-muted">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-red font-body text-[12px] font-extrabold uppercase text-white">
        {post.author.avatar}
      </span>
      <span>
        <span className="block font-bold text-text-dark">{post.author.name}</span>
        <span>{post.date} - {post.readTime}</span>
      </span>
    </div>
  );
}

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-border-cream bg-white shadow-card transition duration-normal hover:-translate-y-1 hover:border-border-light hover:shadow-card-hover"
    >
      <div
        className="aspect-video"
        style={{ backgroundColor: post.coverColor }}
        aria-hidden="true"
      />
      <div className="flex flex-1 flex-col p-5">
        <span className="font-body text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-red">
          {post.category}
        </span>
        <h2 className="mt-2 line-clamp-2 text-xl font-extrabold leading-tight text-text-dark">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-dark-muted">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-5">
          <AuthorMeta post={post} />
        </div>
      </div>
    </Link>
  );
}

