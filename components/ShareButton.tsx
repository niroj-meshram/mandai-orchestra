"use client";

import { useEffect, useState } from "react";
import type { Song } from "@/data/playlists";
import { site } from "@/data/site";
import { songId } from "@/lib/songs";
import { CheckIcon, ShareIcon } from "./icons";

/**
 * Shares a link to the song that is playing. On a phone that is the system
 * share sheet — WhatsApp, mostly. Where there is no share sheet (most desktop
 * browsers) it copies the link instead and says so.
 */
export function ShareButton({ song }: { song: Song }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const share = async () => {
    const id = songId(song.youtubeUrl);
    // The live origin, so a link shared from a preview deploy opens there.
    const url = `${window.location.origin}/song/${id}`;
    const text = `${song.title} — ${song.singer} · ${site.titleHi}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: song.title, text, url });
        return;
      } catch (err) {
        // Closing the sheet is not a failure; anything else falls through.
        if ((err as Error).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={share}
        aria-label="Share this song"
        title={copied ? "Link copied" : "Share this song"}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-cream-dim transition-colors hover:bg-cream/10 hover:text-cream"
      >
        {copied ? <CheckIcon className="text-amber" /> : <ShareIcon />}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </>
  );
}
