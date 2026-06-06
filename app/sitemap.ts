import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog/posts";
import { platformRoutes } from "@/lib/plp/catalog";
import { siteUrl } from "@/lib/seo";

type SitemapEntry = MetadataRoute.Sitemap[number];

function entry(path: string, priority: number, changeFrequency: SitemapEntry["changeFrequency"]): SitemapEntry {
  return {
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const platformEntries = platformRoutes.map((platform) => entry(platform.href, 0.8, "weekly"));
  const systemEntries = platformRoutes.flatMap((platform) =>
    platform.systems.map((system) => entry(system.href, 0.7, "weekly")),
  );
  const infoEntries = [
    "/info/about",
    "/info/guarantee",
    "/info/shipping",
    "/info/returns",
    "/info/faq",
    "/info/contact",
    "/info/privacy",
    "/info/terms",
  ].map((path) => entry(path, 0.5, "monthly"));
  const blogEntries = blogPosts.map((post) => entry(`/blog/${post.slug}`, 0.6, "monthly"));

  return [
    entry("/", 1.0, "daily"),
    entry("/products", 0.9, "daily"),
    ...platformEntries,
    ...systemEntries,
    entry("/deals", 0.8, "daily"),
    entry("/best-sellers", 0.8, "daily"),
    entry("/new-arrivals", 0.8, "daily"),
    entry("/blog", 0.7, "weekly"),
    ...blogEntries,
    ...infoEntries,
  ];
}
