import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { categories } from "@/data/categories";

/**
 * Next generates /sitemap.xml from this.
 *
 * Derived from the category list rather than typed out, so a new programme is
 * in the sitemap the moment it exists — a hand-maintained list of URLs is a
 * list that silently goes stale, and a page missing from it is a page that may
 * never get crawled.
 *
 * `lastModified` is stamped at build time, and the playlist is re-fetched on
 * every build, so it genuinely tracks when the content last changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      // No trailing slash, to match exactly what the canonical tag emits.
      // Listing "…/" here while the page declares "…" as its canonical is the
      // kind of disagreement Search Console reports as "duplicate, Google
      // chose a different canonical".
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...categories.map((category) => ({
      url: `${site.url}/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
