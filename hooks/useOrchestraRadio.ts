"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { playlists, type Playlist, type Song } from "@/data/playlists";
import { parseVideoId } from "@/lib/youtube";
import { songById } from "@/lib/songs";
import { shuffleOrder, stepIndex } from "@/lib/queue";
import { useYouTubePlayer } from "./useYouTubePlayer";

/** Where the last visit got to. Bump the suffix if the shape changes. */
const STORAGE_KEY = "mo-radio-v1";

interface Saved {
  playlistId: string;
  songIndex: number;
  time: number;
  volume: number;
  shuffle: boolean;
  repeatOne: boolean;
}

/** localStorage throws outright in some private modes; treat that as empty. */
function readSaved(): Partial<Saved> | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<Saved>) : null;
  } catch {
    return null;
  }
}

function writeSaved(saved: Saved) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {
    // Storage full or blocked — remembering is a nicety, not a requirement.
  }
}

/**
 * The radio: which programme is loaded, which song is cued, and what happens
 * when one ends. The interface is a pure view over this.
 */
export function useOrchestraRadio({ initialSongId }: { initialSongId?: string } = {}) {
  // A shared link's song is known on the server, so it is rendered cued from
  // the first paint rather than swapped in after hydration.
  const linked = initialSongId ? songById(initialSongId) : undefined;
  const [playlistIndex, setPlaylistIndex] = useState(() =>
    linked ? Math.max(0, playlists.findIndex((p) => p.id === linked.playlist.id)) : 0
  );
  const [songIndex, setSongIndex] = useState(linked?.index ?? 0);
  const [volume, setVolumeState] = useState(80);
  /** False until the first press — browsers will not start audio before that. */
  const [started, setStarted] = useState(false);
  const [repeatOne, setRepeatOne] = useState(false);
  /** Play order as song indices while shuffling; null means programme order. */
  const [order, setOrder] = useState<number[] | null>(null);
  const shuffle = order !== null;

  const playlist: Playlist = playlists[playlistIndex];
  const song: Song = playlist.songs[songIndex] ?? playlist.songs[0];
  const songCount = playlist.songs.length;

  /**
   * Videos that failed this session. Without this, a deleted video is retried
   * — and skipped again — every time the programme comes round.
   */
  const deadRef = useRef(new Set<string>());

  /**
   * The index `delta` steps from `from` in the current play order, wrapping at
   * either end and stepping over dead videos. Returns `from` if every song in
   * the programme is dead.
   */
  const step = useCallback(
    (from: number, delta: number) =>
      stepIndex({
        order,
        count: songCount,
        from,
        delta,
        isDead: (i) => deadRef.current.has(playlist.songs[i]?.youtubeUrl),
      }),
    [order, songCount, playlist]
  );

  const advance = useCallback(
    (delta: number) => setSongIndex((i) => step(i, delta)),
    [step]
  );

  // The player calls back into whatever these are at the time, not at mount.
  const endedRef = useRef<(failed: boolean) => void>(() => {});

  const player = useYouTubePlayer({
    onEnded: (failed) => endedRef.current(failed),
  });

  const { load, play, pause, seek, setVolume: setPlayerVolume, playing } = player;

  /**
   * True only when the listener asked for silence. Every other pause — the
   * phone locking, another app taking the audio — is the browser's doing, and
   * is worth trying to undo.
   */
  const userPausedRef = useRef(false);

  endedRef.current = (failed) => {
    if (failed) {
      deadRef.current.add(song.youtubeUrl);
      advance(1);
    } else if (repeatOne) {
      seek(0);
      play();
    } else {
      advance(1);
    }
  };

  // ── Remembering the last visit ─────────────────────────────────────────────

  /** Where to start the restored song, consumed by its first load. */
  const resumeRef = useRef<{ url: string; time: number } | null>(null);
  /** No saving until the restore has run, or the defaults would overwrite it. */
  const [restored, setRestored] = useState(false);

  // Read once on mount, after hydration, so server and client markup agree.
  // A shared link wins over the last visit for which song; settings still
  // come back.
  const linkedRef = useRef(Boolean(linked));
  useEffect(() => {
    const saved = readSaved();
    if (saved) {
      const pIdx = playlists.findIndex((p) => p.id === saved.playlistId);
      if (linkedRef.current) {
        if (saved.shuffle) setOrder(shuffleOrder(songCount, songIndex));
      } else if (pIdx !== -1) {
        const songs = playlists[pIdx].songs;
        const sIdx =
          typeof saved.songIndex === "number" && songs[saved.songIndex] ? saved.songIndex : 0;
        setPlaylistIndex(pIdx);
        setSongIndex(sIdx);
        if (saved.shuffle) setOrder(shuffleOrder(songs.length, sIdx));
        if (typeof saved.time === "number" && saved.time > 5) {
          resumeRef.current = { url: songs[sIdx].youtubeUrl, time: saved.time };
        }
      }
      if (typeof saved.volume === "number") setVolumeState(saved.volume);
      if (saved.repeatOne) setRepeatOne(true);
    }
    setRestored(true);
    // Runs once: the starting song is what it is restoring from.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load whenever the cued song changes, but never before the first press.
  const songUrl = song?.youtubeUrl;
  useEffect(() => {
    if (!started || !songUrl) return;
    const resume = resumeRef.current;
    resumeRef.current = null;
    load(songUrl, true, resume?.url === songUrl ? resume.time : 0);
  }, [songUrl, started, load]);

  useEffect(() => {
    setPlayerVolume(volume);
  }, [volume, setPlayerVolume, player.ready]);

  /** Exact position for the save on the way out; the effect below rounds it. */
  const timeRef = useRef(0);
  timeRef.current = started ? player.currentTime : (resumeRef.current?.time ?? 0);

  const snapshot = useCallback(
    (): Saved => ({
      playlistId: playlist.id,
      songIndex,
      time: timeRef.current,
      volume,
      shuffle,
      repeatOne,
    }),
    [playlist.id, songIndex, volume, shuffle, repeatOne]
  );

  // Every few seconds of playback, and on any change of song or setting.
  const timeBucket = Math.floor(player.currentTime / 5);
  useEffect(() => {
    if (restored) writeSaved(snapshot());
  }, [restored, snapshot, timeBucket]);

  // And once more as the page goes away, so the position is exact.
  useEffect(() => {
    if (!restored) return;
    const save = () => writeSaved(snapshot());
    const onHide = () => document.visibilityState === "hidden" && save();
    window.addEventListener("pagehide", save);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("pagehide", save);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [restored, snapshot]);

  // ── Transport ──────────────────────────────────────────────────────────────

  const resume = useCallback(() => {
    userPausedRef.current = false;
    if (!started) setStarted(true);
    else play();
  }, [started, play]);

  const stop = useCallback(() => {
    userPausedRef.current = true;
    pause();
  }, [pause]);

  const toggle = useCallback(() => {
    if (started && playing) stop();
    else resume();
  }, [started, playing, stop, resume]);

  const next = useCallback(() => advance(1), [advance]);

  /**
   * Jump by a number of seconds within the current song.
   *
   * Clamped at both ends rather than allowed to run past them: seeking beyond
   * the duration makes YouTube fire `ENDED`, which would skip to the next song
   * — so a forward nudge near the end of a track would silently behave like the
   * next button. Held a quarter-second short of the end for the same reason.
   * Before the first press there is nothing loaded to seek within.
   */
  const skip = useCallback(
    (seconds: number) => {
      if (!started) return;
      const limit = player.duration > 0 ? player.duration - 0.25 : Infinity;
      player.seek(Math.min(Math.max(player.currentTime + seconds, 0), limit));
    },
    [started, player]
  );

  const previous = useCallback(() => {
    // Past three seconds, "previous" restarts the song rather than leaving it.
    if (player.currentTime > 3) {
      player.seek(0);
      return;
    }
    advance(-1);
  }, [advance, player]);

  const selectPlaylist = useCallback(
    (id: string, songAt = 0) => {
      const idx = playlists.findIndex((p) => p.id === id);
      if (idx === -1) return;
      setPlaylistIndex(idx);
      setSongIndex(songAt);
      // A new programme gets a fresh shuffle, starting from the chosen song.
      if (shuffle) setOrder(shuffleOrder(playlists[idx].songs.length, songAt));
      userPausedRef.current = false;
      setStarted(true);
    },
    [shuffle]
  );

  const toggleShuffle = useCallback(() => {
    setOrder((o) => (o ? null : shuffleOrder(songCount, songIndex)));
  }, [songCount, songIndex]);

  const toggleRepeatOne = useCallback(() => setRepeatOne((r) => !r), []);

  /** What plays after this one, for the "up next" line. */
  const upNext: Song | null = useMemo(() => {
    if (repeatOne) return song;
    const i = step(songIndex, 1);
    return i === songIndex ? null : playlist.songs[i];
  }, [repeatOne, song, step, songIndex, playlist]);

  // ── Lock screen, notification and media keys ───────────────────────────────
  //
  // The Media Session API is what puts the title and artwork on a phone's lock
  // screen and in the laptop's media popup, and routes the keyboard's and
  // headphones' media keys here. Handlers call through refs so they are
  // registered once, not on every render.

  const actionsRef = useRef({ resume, stop, next, previous, skip, seek });
  actionsRef.current = { resume, stop, next, previous, skip, seek };

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const a = () => actionsRef.current;
    const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
      ["play", () => a().resume()],
      ["pause", () => a().stop()],
      ["nexttrack", () => a().next()],
      ["previoustrack", () => a().previous()],
      ["seekbackward", (d) => a().skip(-(d.seekOffset ?? 10))],
      ["seekforward", (d) => a().skip(d.seekOffset ?? 10)],
      ["seekto", (d) => d.seekTime != null && a().seek(d.seekTime)],
    ];
    for (const [action, handler] of handlers) {
      // Browsers throw for actions they do not support.
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {}
    }
    return () => {
      for (const [action] of handlers) {
        try {
          navigator.mediaSession.setActionHandler(action, null);
        } catch {}
      }
    };
  }, []);

  useEffect(() => {
    if (!("mediaSession" in navigator) || !song) return;
    const id = parseVideoId(song.youtubeUrl);
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.title,
      artist: song.singer,
      album: playlist.name,
      artwork: id
        ? [
            { src: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`, sizes: "320x180", type: "image/jpeg" },
            { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: "480x360", type: "image/jpeg" },
          ]
        : [],
    });
  }, [song, playlist.name]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.playbackState = !started ? "none" : playing ? "playing" : "paused";
  }, [started, playing]);

  // The scrubber on the lock screen. Re-sent on play/pause and every ten
  // seconds; between those the browser runs the clock itself.
  const positionBucket = Math.floor(player.currentTime / 10);
  useEffect(() => {
    if (!("mediaSession" in navigator) || player.duration <= 0) return;
    try {
      navigator.mediaSession.setPositionState({
        duration: player.duration,
        position: Math.min(player.currentTime, player.duration),
        playbackRate: 1,
      });
    } catch {}
    // currentTime is read, not depended on: it is covered by positionBucket.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.duration, playing, positionBucket]);

  // ── Pauses the listener did not ask for ────────────────────────────────────
  //
  // Some phones pause the hidden YouTube player when the screen locks or the
  // tab goes to the background. Try once to carry on, and again when the page
  // comes back. A pause the listener pressed is left alone. iOS will refuse;
  // there is nothing a page can do about that.

  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    if (!started || playing || userPausedRef.current) return;
    if (document.visibilityState !== "hidden") return;
    const t = window.setTimeout(() => {
      if (!playingRef.current && !userPausedRef.current) play();
    }, 600);
    return () => window.clearTimeout(t);
  }, [started, playing, play]);

  useEffect(() => {
    if (!started) return;
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      if (!playingRef.current && !userPausedRef.current) play();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [started, play]);

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
    shuffle,
    repeatOne,
    upNext,
    toggle,
    next,
    previous,
    skip,
    selectPlaylist,
    toggleShuffle,
    toggleRepeatOne,
    setVolume: setVolumeState,
  };
}
