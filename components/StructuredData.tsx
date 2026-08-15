import { site } from "@/data/site";
import { playlists, allSongs } from "@/data/playlists";

/**
 * Schema.org description of the page, as JSON-LD.
 *
 * The visible page is one canvas with the music behind a play button, which a
 * crawler reads as a thin page about nothing in particular. This is where it is
 * told what it is actually looking at: a named music playlist, its tracks, and
 * who made the site. That is what lets a result show as something richer than a
 * blue link, and what connects the page to a search for the songs on it rather
 * than only to a search for its title.
 *
 * Everything here is generated from the same data the page renders, so it can
 * never drift out of sync with what a visitor sees — which is also the thing
 * that gets structured data ignored when it happens.
 */
export function StructuredData() {
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.titleEn,
      alternateName: [site.titleHi, "CG Orchestra", "Mandai Archestra"],
      description: site.description,
      inLanguage: ["hi-IN", "en-IN"],
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.author.name,
      url: site.url,
      sameAs: [site.author.linkedin, site.author.x],
    },
    // Each programme is described in full on its own page, so here it is only
    // referenced — repeating thirty tracks on the homepage as well would
    // duplicate the same claim at two URLs and dilute both.
    {
      "@type": "ItemList",
      "@id": `${site.url}/#programmes`,
      name: "Programmes",
      numberOfItems: playlists.length,
      itemListElement: playlists.map((playlist, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: playlist.name,
        url: `${site.url}/${playlist.id}`,
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: `${site.url}/`,
      name: `${site.titleHi} · ${site.titleEn}`,
      description: site.description,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#programmes` },
      inLanguage: "hi-IN",
    },
  ];

  return (
    <script
      type="application/ld+json"
      // The payload is built from our own data files, never from user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c"
        ),
      }}
    />
  );
}

/** Kept for the page copy: how many songs are on offer, said out loud. */
export const songCount = allSongs.length;
