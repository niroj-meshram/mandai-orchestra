"use client";

import { useEffect, useState } from "react";
import { quotes } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeartIcon } from "./icons";

/** How long a quote stays up. Long enough to finish reading it twice. */
const DWELL_MS = 11000;

/**
 * One memory, in the corner, changing slowly. Never more than one at a time —
 * a list of these would be a feed, and this is supposed to feel like something
 * surfacing on its own.
 */
export function QuoteCard() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      // Fade out, swap the text while it is invisible, fade back in.
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length);
        setVisible(true);
      }, 700);
    }, DWELL_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <aside
      className="anim-fade pointer-events-none absolute right-5 top-[132px] z-10 hidden w-[290px] lg:block xl:right-8 xl:w-[318px]"
      style={{ animationDelay: "400ms" }}
    >
      <div className="glass relative rounded-lg px-5 py-4">
        {/* Corner ticks, like a printed card. */}
        {[
          "left-1.5 top-1.5 border-l border-t",
          "right-1.5 top-1.5 border-r border-t",
          "left-1.5 bottom-1.5 border-b border-l",
          "right-1.5 bottom-1.5 border-b border-r",
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute h-2.5 w-2.5 border-gold/35 ${pos}`}
          />
        ))}

        <p
          className="text-center font-body text-[13.5px] leading-relaxed text-cream/90 transition-opacity duration-700"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {quotes[index]}
        </p>

        <span
          aria-hidden
          className="mt-2.5 flex justify-center text-ember/70"
        >
          <HeartIcon />
        </span>
      </div>
    </aside>
  );
}
