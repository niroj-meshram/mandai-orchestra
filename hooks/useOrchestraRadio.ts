"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { playlists, type Playlist, type Song } from "@/data/playlists";
import { useYouTubePlayer } from "./useYouTubePlayer";

/**
 * The radio: which programme is loaded, which song is cued, and what happens
 * when one ends. The interface is a pure view over this.
 */
export function useOrchestraRadio() {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [volume, setVolumeState] = useState(80);
  /** False until the first press — browsers will not start audio before that. */
  const [started, setStarted] = useState(false);

  const playlist: Playlist = playlists[playlistIndex];
  const song: Song = playlist.songs[songIndex] ?? playlist.songs[0];

  const songCount = playlist.songs.length;

  /** Steps through the programme, wrapping round at either end. */
  const advance = useCallback(
    (delta: number) => {
      setSongIndex((i) => (i + delta + songCount) % songCount);
    },
    [songCount]
  );

  const advanceRef = useRef(advance);
  advanceRef.current = advance;

  const player = useYouTubePlayer({
    onEnded: () => advanceRef.current(1),
  });

  const { load, play, pause, setVolume: setPlayerVolume, playing } = player;

  // Load whenever the cued song changes, but never before the first press.
  const songUrl = song?.youtubeUrl;
  useEffect(() => {
    if (!started || !songUrl) return;
    load(songUrl, true);
  }, [songUrl, started, load]);

  useEffect(() => {
    setPlayerVolume(volume);
  }, [volume, setPlayerVolume, player.ready]);

  const toggle = useCallback(() => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (playing) pause();
    else play();
  }, [started, playing, play, pause]);

  const next = useCallback(() => advance(1), [advance]);

  const previous = useCallback(() => {
    // Past three seconds, "previous" restarts the song rather than leaving it.
    if (player.currentTime > 3) {
      player.seek(0);
      return;
    }
    advance(-1);
  }, [advance, player]);

  const selectPlaylist = useCallback((id: string, songAt = 0) => {
    const idx = playlists.findIndex((p) => p.id === id);
    if (idx === -1) return;
    setPlaylistIndex(idx);
    setSongIndex(songAt);
    setStarted(true);
  }, []);

  const memo = useMemo(
    () => ({ playlist, song, playlists }),
    [playlist, song]
  );

  return {
    ...memo,
    songIndex,
    volume,
    started,
    player,
    toggle,
    next,
    previous,
    selectPlaylist,
    setVolume: setVolumeState,
  };
}
