"use client";

import { useEffect, useState } from "react";
import { useOrchestraRadio } from "@/hooks/useOrchestraRadio";
import { site } from "@/data/site";
import { StageScene } from "@/components/StageScene";
import { TopBar } from "@/components/TopBar";
import { Masthead } from "@/components/Masthead";
import { HomeContent } from "@/components/HomeContent";
import { QuoteCard } from "@/components/QuoteCard";
import { PlayerBar } from "@/components/PlayerBar";
import { PlaylistsPanel } from "@/components/PlaylistsPanel";
import { AllSongsPanel } from "@/components/AllSongsPanel";

export default function HomePage() {
  const radio = useOrchestraRadio();
  const { player } = radio;

  const [playlistsOpen, setPlaylistsOpen] = useState(false);
  const [songsOpen, setSongsOpen] = useState(false);

  // Transport from the keyboard. Skipped while a panel is open, so Escape and
  // Tab belong to the panel, and while a slider has focus, since those handle
  // the arrow keys themselves.
  useEffect(() => {
    const panelOpen = playlistsOpen || songsOpen;

    const onKey = (e: KeyboardEvent) => {
      if (panelOpen) return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
          target.getAttribute("role") === "slider")
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        radio.toggle();
      } else if (e.code === "ArrowRight") {
        radio.next();
      } else if (e.code === "ArrowLeft") {
        radio.previous();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [radio, playlistsOpen, songsOpen]);

  // The stage is still exactly one screen — you arrive at it and nothing has
  // moved. What changed is that the page no longer ends there: the writing sits
  // below the fold, so scrolling is now the document's job rather than an
  // inner overflow. The artwork is position:fixed and stays put behind it.
  return (
    // `clip` rather than `hidden`: overflow-x:hidden forces the computed
    // overflow-y to `auto`, which quietly turns this into a nested scroll
    // container and takes scrolling away from the document — anchor links stop
    // landing where they should. `clip` trims the same overflow without it.
    <main className="relative w-full overflow-x-clip">
      <StageScene />

      {/* The YouTube iframe stays mounted off-screen for the whole session.
          Tearing it down between songs would re-arm the browser's autoplay
          block, and the next song would silently refuse to start. */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
      >
        <div ref={player.hostRef} />
      </div>

      {/* ── Composition ────────────────────────────────────────────────────
          Two layouts, one markup.

          On a phone this is a flex column and every child sits in normal flow,
          so the browser works out where things go from how tall they actually
          are. That is the point: the earlier version placed each block at a
          hand-measured offset, and every one of those numbers was a guess that
          went wrong the moment the live pill wrapped to two lines or the screen
          turned landscape — the title would land under the player.

          From sm up there is room for the poster composition it was designed
          as, so each child re-absolutes itself against this box. */}
      <div className="relative z-10 flex min-h-dvh flex-col sm:block">
        <TopBar
          live={player.playing}
          onOpenPlaylists={() => setPlaylistsOpen(true)}
          onOpenSongs={() => setSongsOpen(true)}
        />

        <Masthead />

        {/* Lets the stage breathe between the title and the player, and takes
            up whatever is left over rather than a fixed amount. */}
        <div aria-hidden className="min-h-0 flex-1 sm:hidden" />

        <PlayerBar radio={radio} />

        <footer className="pointer-events-none z-10 px-3 pb-2.5 text-center sm:absolute sm:inset-x-0 sm:bottom-3 sm:px-4 sm:pb-0">
          <p className="font-body text-[8px] uppercase tracking-[0.16em] text-cream-dim/45 sm:text-[11px] sm:tracking-[0.34em]">
            {site.footer}
          </p>
        </footer>
      </div>

      <HomeContent />

      <QuoteCard />

      <PlaylistsPanel
        open={playlistsOpen}
        onClose={() => setPlaylistsOpen(false)}
        activeId={radio.playlist.id}
        playing={player.playing}
        onSelect={(id) => radio.selectPlaylist(id)}
      />

      <AllSongsPanel
        open={songsOpen}
        onClose={() => setSongsOpen(false)}
        activePlaylistId={radio.playlist.id}
        activeSongIndex={radio.songIndex}
        playing={player.playing}
        onSelect={(id, index) => radio.selectPlaylist(id, index)}
      />
    </main>
  );
}
