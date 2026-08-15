"use client";

import Image from "next/image";
import { STAGE_SCENE } from "@/config/scene";
import { site } from "@/data/site";

/**
 * The background layer: the mandai scene, plus the lighting that makes the
 * overlay readable on top of it.
 *
 * The artwork itself is a clean plate — no text, no interface, just the stage
 * and the street. Everything you can read on this page is live HTML above it,
 * so the copy reflows on a phone and stays selectable and translatable.
 *
 * Drop your artwork at `public/stage/scene.png` (see config/scene.ts).
 */
export function StageScene() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Warm ground colour, so the page is never black while the plate loads
          and never letterboxes to a cold edge on wide screens. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 42%, #2a1a10 0%, #150d08 55%, #0a0604 100%)",
        }}
      />

      {STAGE_SCENE.src && (
        <Image
          src={STAGE_SCENE.src}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: STAGE_SCENE.position }}
        />
      )}

      {/* ── Lighting ─────────────────────────────────────────────────────────
          Amber key over the stage, so the centre stays warm and the corners
          fall away. Screen blend keeps it as light rather than a tint. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 46%, color-mix(in oklab, var(--glow) 26%, transparent) 0%, transparent 68%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ── Readability scrims ───────────────────────────────────────────────
          Three soft gradients, one per region of the interface. Without these
          the overlay text sits on unpredictable parts of the artwork. */}
      <div
        className="absolute inset-x-0 top-0 h-[38vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,5,3,0.82) 0%, rgba(8,5,3,0.35) 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[46vh]"
        style={{
          background:
            "linear-gradient(0deg, rgba(8,5,3,0.9) 0%, rgba(8,5,3,0.5) 42%, transparent 100%)",
        }}
      />

      {/* Vignette. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 88% at 50% 45%, transparent 45%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      <div className="film-grain absolute inset-0" />

      {/* The banner is painted into the artwork, so it is invisible to screen
          readers. Announce it here instead — it is the stage's welcome. */}
      <p className="sr-only">{site.stageBanner}</p>
    </div>
  );
}
