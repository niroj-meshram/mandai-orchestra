import { allSongs } from "@/data/playlists";
import { parseVideoId } from "@/lib/youtube";

/**
 * Songs are addressed by their YouTube video id in shared links: it is already
 * unique, survives a re-sync that reorders the playlist, and needs no slug
 * table to keep in step with data/playlists.ts (which the sync overwrites).
 */
export const songId = (youtubeUrl: string) => parseVideoId(youtubeUrl);

/** A song with the programme and position the player needs to cue it. */
export function songById(id: string) {
  return allSongs.find((entry) => songId(entry.song.youtubeUrl) === id);
}

export const allSongIds = () =>
  allSongs.map((entry) => songId(entry.song.youtubeUrl)).filter(Boolean);
