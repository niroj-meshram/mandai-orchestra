"use client";

import { playlists } from "@/data/playlists";
import { cx } from "@/lib/utils";
import { Panel } from "./Panel";

/** The six programmes. Picking one loads it and starts from its first item. */
export function PlaylistsPanel({
  open,
  onClose,
  activeId,
  playing,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
  playing: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <Panel
      open={open}
      onClose={onClose}
      title="कार्यक्रम"
      subtitle={`${playlists.length} programmes`}
    >
      <ul className="flex flex-col gap-1.5">
        {playlists.map((p) => {
          const active = p.id === activeId;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(p.id);
                  onClose();
                }}
                aria-current={active ? "true" : undefined}
                className={cx(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-200",
                  active ? "bg-amber/12" : "hover:bg-cream/6"
                )}
              >
                <span className="min-w-0 flex-1">
                  <span
                    className={cx(
                      "block truncate font-display text-[17px] leading-snug",
                      active ? "text-amber" : "text-cream"
                    )}
                  >
                    {p.nameHi}
                  </span>
                  <span className="mt-0.5 block truncate font-body text-[12px] leading-snug text-cream-dim">
                    {p.name} · {p.tagline}
                  </span>
                </span>

                <span className="shrink-0 text-right">
                  {active ? (
                    <span className="flex items-center gap-1.5">
                      {/* Three bars, moving only while sound is actually on. */}
                      <span aria-hidden className="flex h-3.5 items-end gap-[2px]">
                        {[0, 1, 2].map((b) => (
                          <span
                            key={b}
                            className="w-[2.5px] rounded-sm bg-amber"
                            style={{
                              height: playing ? "100%" : "40%",
                              animation: playing
                                ? `lamp-breathe ${0.8 + b * 0.3}s ease-in-out infinite`
                                : undefined,
                            }}
                          />
                        ))}
                      </span>
                      <span className="font-body text-[10px] uppercase tracking-[0.16em] text-amber">
                        {playing ? "बज रहा" : "चुना"}
                      </span>
                    </span>
                  ) : (
                    <span className="font-body text-[11px] text-cream-dim/70">
                      {p.songs.length} गाने
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
