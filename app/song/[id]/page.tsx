import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeClient } from "@/components/HomeClient";
import { site } from "@/data/site";
import { allSongIds, songById } from "@/lib/songs";

/**
 * What a shared link opens: the homepage, with that song cued in the player.
 *
 * One static page per song, built from the playlist, so a link pasted into
 * WhatsApp gets its own title and preview card rather than the generic one.
 * They are kept out of search results — 149 copies of the homepage with a
 * different song in the player would read as duplicate content, and the
 * programme pages are what should rank.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return allSongIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const entry = songById(id);
  if (!entry) return {};

  const { song, playlist } = entry;
  const title = `${song.title} — ${song.singer}`;
  const description = `${playlist.nameHi} · ${playlist.name}. Listen on ${site.titleEn} — no sign-up.`;

  // The preview image comes from opengraph-image.ts beside this file.
  return {
    title,
    description,
    alternates: { canonical: `/song/${id}` },
    robots: { index: false, follow: true },
    openGraph: {
      type: "music.song",
      url: `${site.url}/song/${id}`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SongPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!songById(id)) notFound();
  return <HomeClient initialSongId={id} />;
}
