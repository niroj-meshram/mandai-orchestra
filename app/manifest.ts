import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Makes the site installable — "Add to Home screen" on a phone, "Install" in
 * desktop Chrome — so it opens full-screen from its own icon like an app.
 * It does not change what the browser allows in the background: the music
 * still comes from YouTube's player and stops on lock where it did before.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.titleHi} · ${site.titleEn}`,
    short_name: site.titleEn,
    description: site.descriptionShort,
    lang: "hi",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#0d0805",
    theme_color: "#0d0805",
    categories: ["music", "entertainment"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
