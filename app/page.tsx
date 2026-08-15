"use client";

import { useEffect, useState } from "react";
import { useOrchestraRadio } from "@/hooks/useOrchestraRadio";
import { site } from "@/data/site";
import { StageScene } from "@/components/StageScene";
import { TopBar } from "@/components/TopBar";
import { Masthead } from "@/components/Masthead";
import { PageCopy } from "@/components/PageCopy";
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

  return (
    <main className="relative h-dvh w-full overflow-hidden">
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

      <TopBar
        live={player.playing}
        onOpenPlaylists={() => setPlaylistsOpen(true)}
        onOpenSongs={() => setSongsOpen(true)}
      />

      <Masthead />

      <PageCopy />

      <QuoteCard />

      <PlayerBar radio={radio} />

      {/* The tracking is what makes this line long. At 0.34em it wraps to two
          lines on a phone and the second one lands under the player, so the
          spacing tightens before the type size does. */}
      <footer className="pointer-events-none absolute inset-x-0 bottom-2.5 z-10 px-3 text-center sm:bottom-3 sm:px-4">
        <p className="font-body text-[8px] uppercase tracking-[0.16em] text-cream-dim/45 sm:text-[11px] sm:tracking-[0.34em]">
          {site.footer}
        </p>
      </footer>

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
