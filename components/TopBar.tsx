"use client";

import { useClock } from "@/hooks/useClock";
import { site } from "@/data/site";
import { cx } from "@/lib/utils";
import { ListIcon, NoteIcon, LinkedInIcon, XIcon } from "./icons";
import { Logo } from "./Logo";

/**
 * The top of the frame: what time it is on the left, the mark in the middle,
 * and the two ways into the music on the right.
 */
export function TopBar({
  live,
  onOpenPlaylists,
  onOpenSongs,
}: {
  live: boolean;
  onOpenPlaylists: () => void;
  onOpenSongs: () => void;
}) {
  const { time, meridiem, date } = useClock();

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 px-5 pt-5 sm:px-8 sm:pt-7">
      <div className="flex items-start justify-between gap-4">
        {/* ── Clock ─────────────────────────────────────────────────────── */}
        <div className="anim-fade min-w-0">
          <p className="font-display text-2xl leading-none text-cream sm:text-[32px]">
            {time ? (
              <>
                {time}
                <span className="ml-1.5 text-base text-cream-dim sm:text-lg">
                  {meridiem}
                </span>
              </>
            ) : (
              <span className="opacity-0">00:00</span>
            )}
          </p>

          <p className="mt-1 truncate font-body text-[10px] uppercase tracking-[0.2em] text-cream-dim sm:text-[11px]">
            {date ?? " "}
          </p>

          <span
            aria-hidden
            className="mt-2.5 block h-px w-24 sm:w-32"
            style={{
              background:
                "linear-gradient(90deg, rgba(216,185,120,0.5), transparent)",
            }}
          />

          {/* ── Live indicator ──────────────────────────────────────────────
              The programme is on whether or not you have pressed play, so this
              always reads LIVE PROGRAM. The lamp only pulses once sound is
              actually coming out. */}
          <p
            className="mt-4 inline-flex items-center gap-2 rounded-full border px-2.5 py-1"
            style={{
              borderColor: "rgba(214,65,47,0.5)",
              background: "rgba(10,6,4,0.5)",
            }}
          >
            <span
              aria-hidden
              className={cx(
                "block h-1.5 w-1.5 rounded-full bg-ember",
                live && "anim-live"
              )}
              style={{ boxShadow: "0 0 8px var(--color-ember)" }}
            />
            <span className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-cream">
              Live Program
            </span>
          </p>

          {/* ── Credit ──────────────────────────────────────────────────────
              Closes the left column, quiet enough to sit under the lamp
              without competing with it. Two destinations means the name can no
              longer be the link, so it reads as a line of text and the icons
              carry the addresses. */}
          <div className="mt-4 flex w-fit items-center gap-2">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-cream-dim/70">
              Built by
            </span>
            <span className="font-body text-[11px] font-medium tracking-wide text-cream">
              {site.author.name}
            </span>

            <span aria-hidden className="h-3 w-px bg-cream-dim/25" />

            <SocialLink
              href={site.author.linkedin}
              label={`${site.author.name} on LinkedIn`}
            >
              <LinkedInIcon size={12} />
            </SocialLink>
            <SocialLink
              href={site.author.x}
              label={`${site.author.name} on X`}
            >
              <XIcon size={12} />
            </SocialLink>
          </div>
        </div>

        {/* ── Mark ──────────────────────────────────────────────────────── */}
        {/* The mark hangs a little lower than the buttons, the way the sign
            above a stage sits below the roofline. */}
        <div className="anim-fade hidden shrink-0 pt-6 sm:block">
          <Logo />
        </div>

        {/* ── Ways in ───────────────────────────────────────────────────── */}
        <div className="anim-fade pointer-events-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <TopButton onClick={onOpenPlaylists} icon={<ListIcon />}>
            Playlists
          </TopButton>
          <TopButton onClick={onOpenSongs} icon={<NoteIcon />}>
            All Songs
          </TopButton>
        </div>
      </div>
    </header>
  );
}

/**
 * An icon-only link out to a profile. The header is pointer-events-none so the
 * stage stays clickable through it, which means anything interactive in it has
 * to opt itself back in; the label is what a screen reader gets in place of the
 * glyph.
 */
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="pointer-events-auto grid h-6 w-6 place-items-center rounded-full text-cream-dim transition-colors duration-200 hover:bg-cream/10 hover:text-gold"
    >
      {children}
    </a>
  );
}

function TopButton({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass flex items-center gap-2 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:border-gold/40 hover:bg-brown/60 sm:px-4"
    >
      <span className="text-amber">{icon}</span>
      <span className="font-body text-xs font-medium text-cream sm:text-sm">
        {children}
      </span>
    </button>
  );
}
