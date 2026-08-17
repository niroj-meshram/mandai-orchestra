"use client";

import { useEffect, useState } from "react";

/**
 * Hold, draw, and a little tail so the fade finishes before it is unmounted.
 * These three have to stay in step with `.curtain-panel` in globals.css — the
 * CSS draws the curtain, this decides when it stops existing, and if this is
 * the shorter of the two the panels vanish mid-travel.
 */
const RUN_MS = 420 + 1600 + 260;

/**
 * Two velvet panels that part once, on the first load of a session.
 *
 * It is `pointer-events-none` and `aria-hidden` throughout: the page underneath
 * is fully interactive from the first frame, so this can never be something a
 * visitor has to sit through. If they hit play while it is still opening, the
 * music simply starts behind it.
 *
 * The decision to show it at all is made before paint by an inline script in
 * the layout, which stamps `data-curtain` on <html>. This component only reads
 * that stamp, because a `sessionStorage` check here would run after hydration —
 * a returning visitor would see the curtain appear and then vanish, which is
 * worse than either showing it properly or not at all.
 */
export function CurtainIntro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.curtain === "skip") {
      setDone(true);
      return;
    }
    const id = window.setTimeout(() => setDone(true), RUN_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className="curtain-root pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      style={{ animation: `curtain-clear ${RUN_MS}ms linear both` }}
    >
      {/* Light spilling through the widening gap. */}
      <span
        className="absolute inset-y-0 left-1/2 w-[26vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(233,163,76,0.5), rgba(233,163,76,0) 70%)",
          animation: "curtain-seam 1500ms 460ms ease-out both",
        }}
      />

      <Panel side="left" />
      <Panel side="right" />

      {/* The rail the panels hang from, left until the very end. */}
      <span
        className="absolute inset-x-0 top-0 h-[6px]"
        style={{
          background:
            "linear-gradient(180deg, #d8b978 0%, #8f7442 55%, rgba(64,16,10,0) 100%)",
          boxShadow: "0 2px 14px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}

function Panel({ side }: { side: "left" | "right" }) {
  const left = side === "left";

  return (
    <span
      className={`curtain-velvet curtain-panel absolute inset-y-0 ${
        left ? "left-0" : "right-0"
      }`}
      style={{
        // Slightly past half, so no hairline of the page shows down the join
        // on a viewport with an odd pixel width.
        width: "50.4%",
        animationName: left ? "curtain-part-left" : "curtain-part-right",
        // Gold trim down the leading edge, and a shadow thrown inward.
        boxShadow: left
          ? "inset -3px 0 0 rgba(216,185,120,0.55), 12px 0 40px rgba(0,0,0,0.7)"
          : "inset 3px 0 0 rgba(216,185,120,0.55), -12px 0 40px rgba(0,0,0,0.7)",
      }}
    />
  );
}
