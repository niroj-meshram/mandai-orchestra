"use client";

import type { useOrchestraRadio } from "@/hooks/useOrchestraRadio";
import { formatTime, cx } from "@/lib/utils";
import { Cassette } from "./Cassette";
import { Scrubber } from "./Scrubber";
import {
  PlayIcon,
  PauseIcon,
  PrevIcon,
  NextIcon,
  VolumeIcon,
  MuteIcon,
  NoteIcon,
} from "./icons";

type Radio = ReturnType<typeof useOrchestraRadio>;

/**
 * The player, resting at the bottom of the frame. Warm brown and gold, one
 * cassette, three buttons and a length of tape — the amount of machinery a
 * deck actually had.
 */
export function PlayerBar({ radio }: { radio: Radio }) {
  const { song, playlist, player, volume } = radio;
  const { playing, currentTime, duration, failed } = player;

  const total = duration > 0 ? duration : 0;

  return (
    <section
      aria-label="Player"
      className="anim-slide-up absolute inset-x-0 bottom-8 z-20 px-3 sm:bottom-12 sm:px-8"
      style={{ animationDelay: "300ms" }}
    >
      <div className="glass-strong mx-auto flex max-w-5xl flex-col gap-3 rounded-xl px-4 py-3.5 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5">
        {/* ── What is playing ────────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:w-[260px] sm:flex-none">
          <Cassette playing={playing} />

          <div className="min-w-0 flex-1">
            <p
              className="truncate font-body text-[15px] font-medium leading-tight text-cream sm:text-base"
              title={song?.title}
            >
              {song?.title ?? "—"}
            </p>
            <p className="mt-0.5 truncate font-body text-[13px] leading-tight text-ember/90">
              {song?.singer ?? "—"}
            </p>
            <p className="mt-1 flex items-center gap-1.5 truncate font-body text-[11px] leading-tight text-cream-dim">
              <span className="shrink-0 text-gold-dim">
                <NoteIcon size={11} />
              </span>
              <span className="truncate">{playlist.name}</span>
            </p>
          </div>
        </div>

        {/* ── Transport ──────────────────────────────────────────────────── */}
        <div className="flex shrink-0 items-center justify-center gap-4 sm:gap-5">
          <IconButton label="Previous song" onClick={radio.previous}>
            <PrevIcon />
          </IconButton>

          <button
            type="button"
            onClick={radio.toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border-2 text-cream transition-all duration-200 hover:scale-105 active:scale-95 sm:h-14 sm:w-14"
            style={{
              borderColor: "var(--color-ember)",
              background:
                "radial-gradient(circle at 40% 32%, rgba(214,65,47,0.22), rgba(20,12,8,0.6))",
              boxShadow: "0 0 26px -6px rgba(214,65,47,0.65)",
            }}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>

          <IconButton label="Next song" onClick={radio.next}>
            <NextIcon />
          </IconButton>
        </div>

        {/* ── Position and volume ────────────────────────────────────────────
            Side by side once there is width for it. Stacked, the volume had a
            whole row to itself and nothing to sit against, so it read as an
            afterthought pinned to the bottom corner; on one line the position
            takes the slack and the volume closes the bar off. */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="w-9 shrink-0 text-right font-body text-[11px] tabular-nums text-cream-dim">
              {formatTime(currentTime)}
            </span>

            <Scrubber
              label="Song position"
              value={currentTime}
              max={total}
              disabled={total === 0}
              onChange={player.seek}
              valueText={`${formatTime(currentTime)} of ${formatTime(total)}`}
            />

            <span className="w-9 shrink-0 font-body text-[11px] tabular-nums text-cream-dim">
              {total > 0 ? formatTime(total) : "--:--"}
            </span>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => radio.setVolume(volume === 0 ? 80 : 0)}
              aria-label={volume === 0 ? "Unmute" : "Mute"}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-cream-dim transition-colors hover:bg-cream/10 hover:text-cream"
            >
              {volume === 0 ? <MuteIcon /> : <VolumeIcon />}
            </button>

            <Scrubber
              label="Volume"
              value={volume}
              max={100}
              onChange={(v) => radio.setVolume(Math.round(v))}
              valueText={`${Math.round(volume)} percent`}
              accent="var(--color-gold)"
              className="w-[76px] flex-none"
            />
          </div>
        </div>
      </div>

      {failed && (
        <p className="mx-auto mt-2 max-w-4xl text-center font-body text-[11px] text-ember">
          यह गाना नहीं चला — replace this song&rsquo;s YouTube link in{" "}
          <code className="text-cream-dim">data/playlists.ts</code>.
        </p>
      )}
    </section>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cx(
        "grid h-10 w-10 shrink-0 place-items-center rounded-full text-cream/85",
        "transition-colors duration-200 hover:bg-cream/10 hover:text-cream active:scale-95"
      )}
    >
      {children}
    </button>
  );
}
