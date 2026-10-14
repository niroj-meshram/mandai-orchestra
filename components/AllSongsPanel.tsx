"use client";

import { useEffect, useMemo, useState } from "react";
import { allSongs } from "@/data/playlists";
import { buildIndex, score } from "@/lib/search";
import { cx } from "@/lib/utils";
import { CloseIcon, SearchIcon } from "./icons";
import { Panel } from "./Panel";

/** One entry per song: title, singer and both programme names. */
const haystacks = allSongs.map((entry) =>
  buildIndex(
    [entry.song.title, entry.song.singer, entry.playlist.name, entry.playlist.nameHi].join(" ")
  )
);

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
  const [query, setQuery] = useState("");

  // Start each visit with the full list.
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  /**
   * Every word typed has to appear somewhere, in any order. Exact matches come
   * first; ones that only match after transliteration or loose spelling follow.
   */
  const results = useMemo(() => {
    if (!query.trim()) return allSongs;
    const exact: typeof allSongs = [];
    const loose: typeof allSongs = [];
    allSongs.forEach((entry, i) => {
      const s = score(query, haystacks[i]);
      if (s === 2) exact.push(entry);
      else if (s === 1) loose.push(entry);
    });
    return [...exact, ...loose];
  }, [query]);

  return (
    <Panel
      open={open}
      onClose={onClose}
      title="सारे गाने"
      subtitle={`${allSongs.length} songs across every programme`}
    >
      <div className="sticky -top-3 z-10 -mx-3 -mt-3 bg-ink-soft/95 px-3 pb-2 pt-3 sm:-mx-4 sm:px-4">
        <label className="flex items-center gap-2 rounded-lg border border-gold/20 bg-cream/5 px-3 transition-colors focus-within:border-amber/60">
          <SearchIcon size={15} className="shrink-0 text-cream-dim" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search song, singer or programme"
            aria-label="Search songs"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent py-2.5 font-body text-[14px] text-cream outline-none placeholder:text-cream-dim/60 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-cream-dim transition-colors hover:bg-cream/10 hover:text-cream"
            >
              <CloseIcon size={13} />
            </button>
          )}
        </label>
        {query && (
          <p aria-live="polite" className="mt-2 px-1 font-body text-[11.5px] text-cream-dim">
            {results.length
              ? `${results.length} ${results.length === 1 ? "song" : "songs"} found`
              : "No songs match. Try fewer words."}
          </p>
        )}
      </div>

      <ul className="flex flex-col">
        {results.map(({ song, playlist, index }) => {
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
