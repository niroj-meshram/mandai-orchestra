"use client";

import { useEffect, useState } from "react";
import { useOrchestraRadio } from "@/hooks/useOrchestraRadio";
import { site } from "@/data/site";
import { StageScene } from "@/components/StageScene";
import { TopBar } from "@/components/TopBar";
import { Masthead } from "@/components/Masthead";
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

      <QuoteCard />

      <PlayerBar radio={radio} />

      <footer className="pointer-events-none absolute inset-x-0 bottom-3 z-10 px-4 text-center">
        <p className="font-body text-[10px] uppercase tracking-[0.34em] text-cream-dim/45 sm:text-[11px]">
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
