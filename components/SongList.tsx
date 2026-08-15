import type { Song } from "@/data/playlists";
import { NoteIcon } from "./icons";

/**
 * A tracklist as plain server-rendered HTML — no state, no client bundle.
 *
 * The player on the homepage is the way to actually listen; this is the way to
 * read what is on a programme, and the way a crawler finds out that this page
 * is about these thirty-odd specific songs rather than about orchestras in
 * general. Each row links out to the source video, so the list is checkable
 * rather than merely asserted.
 */
export function SongList({ songs }: { songs: Song[] }) {
  return (
    <ol className="mt-8 divide-y divide-gold/10 overflow-hidden rounded-xl border border-gold/15">
      {songs.map((song, i) => (
        <li key={song.youtubeUrl}>
          <a
            href={song.youtubeUrl}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-cream/6 sm:gap-4 sm:px-5"
          >
            <span className="w-6 shrink-0 text-right font-body text-[11px] tabular-nums text-gold-dim">
              {i + 1}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate font-body text-[14px] leading-snug text-cream sm:text-[15px]">
                {song.title}
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 truncate font-body text-[11.5px] leading-snug text-cream-dim">
                <span className="shrink-0 text-gold-dim">
                  <NoteIcon size={10} />
                </span>
                <span className="truncate">{song.singer}</span>
              </span>
            </span>

            <span className="shrink-0 font-body text-[11px] tabular-nums text-cream-dim/70">
              {song.duration}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
