"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  PlayerState,
  loadYouTubeApi,
  parseVideoId,
  type YTPlayer,
} from "@/lib/youtube";

interface Options {
  /** Called when the current video reaches its end. */
  onEnded?: () => void;
}

/**
 * Wraps a hidden YouTube iframe and exposes just the controls the amplifier
 * needs. The iframe stays mounted off-screen for the whole session — tearing it
 * down between songs would re-trigger the browser's autoplay gate.
 */
export function useYouTubePlayer({ onEnded }: Options = {}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const endedRef = useRef(onEnded);
  endedRef.current = onEnded;

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  // Pending video requested before the API finished loading.
  const pendingRef = useRef<{ id: string; autoplay: boolean } | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !hostRef.current || !window.YT?.Player) return;

      const player = new window.YT.Player(hostRef.current, {
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (cancelled) return;
            setReady(true);
            const pending = pendingRef.current;
            if (pending) {
              pendingRef.current = null;
              if (pending.autoplay) player.loadVideoById(pending.id);
              else player.cueVideoById(pending.id);
            }
          },
          onStateChange: (e: { data: number }) => {
            if (cancelled) return;
            setPlaying(e.data === PlayerState.PLAYING);
            setBuffering(e.data === PlayerState.BUFFERING);
            if (e.data === PlayerState.PLAYING) setFailed(false);
            if (e.data === PlayerState.ENDED) endedRef.current?.();
          },
          onError: () => {
            if (cancelled) return;
            // Unplayable / blocked video — skip on rather than stall the stage.
            setFailed(true);
            setPlaying(false);
            endedRef.current?.();
          },
        },
      });

      playerRef.current = player;
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, []);

  // Progress ticker. Only runs while audio is actually moving.
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      setCurrentTime(p.getCurrentTime() ?? 0);
      const d = p.getDuration() ?? 0;
      if (d > 0) setDuration(d);
    }, 250);
    return () => window.clearInterval(id);
  }, [playing]);

  const load = useCallback((url: string, autoplay = true) => {
    const id = parseVideoId(url);
    if (!id) {
      setFailed(true);
      return;
    }
    setCurrentTime(0);
    setDuration(0);
    setFailed(false);
    const p = playerRef.current;
    if (!p) {
      pendingRef.current = { id, autoplay };
      return;
    }
    if (autoplay) p.loadVideoById(id);
    else p.cueVideoById(id);
  }, []);

  const play = useCallback(() => playerRef.current?.playVideo(), []);
  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);
  const seek = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    setCurrentTime(seconds);
  }, []);
  const setVolume = useCallback((v: number) => {
    const p = playerRef.current;
    if (!p) return;
    p.setVolume(v);
    if (v === 0) p.mute();
    else if (p.isMuted()) p.unMute();
  }, []);

  return {
    hostRef,
    ready,
    playing,
    buffering,
    currentTime,
    duration,
    failed,
    load,
    play,
    pause,
    seek,
    setVolume,
  };
}
