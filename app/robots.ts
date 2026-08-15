import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Next generates /robots.txt from this.
 *
 * The cron endpoint is disallowed not because it is secret — it authenticates
 * on its own — but because it is not a page, and a crawler spending its budget
 * on it is a crawler not reading the one page that matters.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
