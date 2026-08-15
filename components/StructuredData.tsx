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
    ...playlists.map((playlist) => ({
      "@type": "MusicPlaylist",
      "@id": `${site.url}/#${playlist.id}`,
      name: `${playlist.nameHi} · ${playlist.name}`,
      description: playlist.tagline,
      url: `${site.url}/`,
      numTracks: playlist.songs.length,
      inLanguage: "hi-IN",
      track: playlist.songs.map((song, i) => ({
        "@type": "MusicRecording",
        position: i + 1,
        name: song.title,
        url: song.youtubeUrl,
        byArtist: { "@type": "MusicGroup", name: song.singer },
      })),
    })),
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: `${site.url}/`,
      name: `${site.titleHi} · ${site.titleEn}`,
      description: site.description,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#${playlists[0]?.id ?? "playlist"}` },
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
