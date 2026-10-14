import { renderSongCard, OG_SIZE } from "@/lib/og";
import { allSongIds, songById } from "@/lib/songs";

export const size = OG_SIZE;
export const contentType = "image/jpeg";
export const alt = "A song on Mandai Orchestra";

export function generateStaticParams() {
  return allSongIds().map((id) => ({ id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = songById(id);
  if (!entry) return new Response("Not found", { status: 404 });

  const png = await renderSongCard({
    title: entry.song.title,
    singer: entry.song.singer,
    programme: `${entry.playlist.nameHi} · ${entry.playlist.name}`,
  });
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": contentType },
  });
}
