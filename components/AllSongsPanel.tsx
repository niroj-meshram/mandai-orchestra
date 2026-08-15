"use client";

import { allSongs } from "@/data/playlists";
import { cx } from "@/lib/utils";
import { Panel } from "./Panel";

/**
 * Every song from every programme, in one list. Picking one switches to its
 * programme and starts there.
 */
export function AllSongsPanel({
  open,
  onClose,
  activePlaylistId,
  activeSongIndex,
  playing,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  activePlaylistId: string;
  activeSongIndex: number;
  playing: boolean;
  onSelect: (playlistId: string, songIndex: number) => void;
}) {
  return (
    <Panel
      open={open}
      onClose={onClose}
      title="सारे गाने"
      subtitle={`${allSongs.length} songs across every programme`}
    >
      <ul className="flex flex-col">
        {allSongs.map(({ song, playlist, index }) => {
          const active =
            playlist.id === activePlaylistId && index === activeSongIndex;

          return (
            <li key={`${playlist.id}-${index}`}>
              <button
                type="button"
                onClick={() => {
                  onSelect(playlist.id, index);
                  onClose();
                }}
                aria-current={active ? "true" : undefined}
                className={cx(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-200",
                  active ? "bg-amber/12" : "hover:bg-cream/6"
                )}
              >
                <span
                  aria-hidden
                  className="grid w-4 shrink-0 place-items-center"
                >
                  {active ? (
                    <span
                      className={cx(
                        "block h-1.5 w-1.5 rounded-full bg-amber",
                        playing && "anim-lamp"
                      )}
                      style={{ boxShadow: "0 0 8px var(--color-amber)" }}
                    />
                  ) : (
                    <span className="block h-1 w-1 rounded-full bg-cream-dim/30" />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={cx(
                      "block truncate font-body text-[14px] leading-snug",
                      active ? "font-medium text-amber" : "text-cream"
                    )}
                  >
                    {song.title}
                  </span>
                  <span className="mt-0.5 block truncate font-body text-[11.5px] leading-snug text-cream-dim">
                    {song.singer} · {playlist.nameHi}
                  </span>
                </span>

                <span className="shrink-0 font-body text-[11px] tabular-nums text-cream-dim/70">
                  {song.duration}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
