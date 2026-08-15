import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Next generates /sitemap.xml from this.
 *
 * One page, because that is genuinely all there is — a single-screen player.
 * The value here is not the list, it is `lastModified`: the playlist is
 * re-fetched on every build, so this stamps each deploy and tells a crawler the
 * page is worth looking at again.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
