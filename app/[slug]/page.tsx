import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoryBySlug } from "@/data/categories";
import { playlistBySlug } from "@/data/playlists";
import { site } from "@/data/site";
import { SongList } from "@/components/SongList";
import { Logo } from "@/components/Logo";

/**
 * A programme's own page.
 *
 * One route renders all six, and `generateStaticParams` makes them static HTML
 * at build time — these pages have no state and no player, so they ship no
 * client JavaScript at all. That is deliberate: they exist to be read and
 * crawled, and the fastest page is the one that does not hydrate.
 *
 * The slug doubles as the playlist id, so adding a programme to the sync script
 * and a matching entry to data/categories.ts is the whole of adding a page.
 */

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};

  return {
    // `absolute` bypasses the layout's "%s · Mandai Orchestra" template. These
    // titles already carry the brand and are written to length; letting the
    // template append would push them past where Google truncates.
    title: { absolute: category.title },
    description: category.description,
    alternates: { canonical: `/${category.slug}` },
    openGraph: {
      type: "music.playlist",
      url: `${site.url}/${category.slug}`,
      title: category.title,
      description: category.description,
      images: [{ url: "/stage/scene.png", width: 1672, height: 941 }],
    },
    twitter: {
      card: "summary_large_image",
      title: category.heading,
      description: category.description,
      images: ["/stage/scene.png"],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  const playlist = playlistBySlug(slug);

  // This route sits at the root, so it is what any unknown path falls into.
  if (!category || !playlist) notFound();

  const related = category.related
    .map((s) => categoryBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicPlaylist",
        "@id": `${site.url}/${category.slug}#playlist`,
        name: category.heading,
        alternateName: playlist.name,
        description: category.description,
        url: `${site.url}/${category.slug}`,
        numTracks: playlist.songs.length,
        inLanguage: "hi-IN",
        track: playlist.songs.map((song, i) => ({
          "@type": "MusicRecording",
          position: i + 1,
          name: song.title,
          url: song.youtubeUrl,
          duration: isoDuration(song.duration),
          byArtist: { "@type": "MusicGroup", name: song.singer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: site.titleEn,
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: category.heading,
            item: `${site.url}/${category.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main className="relative min-h-dvh bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* A quiet bar rather than the full stage: this is a reading page, and
          the artwork belongs to the player. */}
      <header className="border-b border-gold/10 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <Link href="/" aria-label={site.titleEn} className="shrink-0">
            <Logo size={34} />
          </Link>
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] text-cream-dim">
              <li>
                <Link href="/" className="transition-colors hover:text-cream">
                  {site.titleEn}
                </Link>
              </li>
              <li aria-hidden className="text-gold-dim">
                /
              </li>
              <li className="truncate text-cream">{category.heading}</li>
            </ol>
          </nav>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-20">
        {/* No tracking and no uppercase here. Both are Latin typographic
            habits: letter-spacing pulls Devanagari conjuncts apart into
            separate glyphs, so छत्तीसगढ़ी sets as छ त्ती स ग ढ़ी. */}
        <p className="font-display text-[15px] text-gold">
          {category.headingHi}
        </p>

        <h1 className="mt-3 font-display text-[34px] leading-tight text-cream sm:text-5xl">
          {category.heading}
        </h1>

        <p className="mt-3 font-body text-[14px] text-cream-dim/90">
          {category.standfirst}
        </p>

        <div className="mt-8 space-y-5 font-body text-[15px] leading-relaxed text-cream-dim sm:text-base">
          {category.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl text-cream">
          {playlist.songs.length} songs in this programme
        </h2>
        <p className="mt-1 font-body text-[13px] text-cream-dim">
          Every track links to its source video.{" "}
          <Link href="/" className="text-amber transition-colors hover:text-gold">
            Play the whole programme
          </Link>{" "}
          on the stage instead.
        </p>

        <SongList songs={playlist.songs} />

        <h2 className="mt-16 font-display text-2xl text-cream">
          More from the archive
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {related.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/${other.slug}`}
                className="glass block h-full rounded-lg px-4 py-3.5 transition-colors duration-200 hover:border-gold/40"
              >
                <span className="block font-body text-[14px] font-medium leading-snug text-cream">
                  {other.heading}
                </span>
                <span className="mt-1 block font-body text-[11.5px] text-gold-dim">
                  {other.headingHi}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </article>

      <footer className="border-t border-gold/10 px-5 py-8 text-center sm:px-8">
        <p className="font-body text-[10px] uppercase tracking-[0.28em] text-cream-dim/45">
          {site.footer}
        </p>
      </footer>
    </main>
  );
}

/** "5:24" → "PT5M24S", which is the only duration format schema.org accepts. */
function isoDuration(label: string): string | undefined {
  const parts = label.split(":").map(Number);
  if (parts.some(Number.isNaN)) return undefined;
  const [h, m, s] =
    parts.length === 3 ? parts : [0, parts[0] ?? 0, parts[1] ?? 0];
  return `PT${h ? `${h}H` : ""}${m}M${s}S`;
}
