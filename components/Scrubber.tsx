"use client";

import { useCallback, useRef, useState } from "react";
import { clamp } from "@/lib/utils";

/**
 * A thin drag track, used for both the song position and the volume. Reports
 * as a real slider so it works from the keyboard and reads correctly to
 * assistive tech; the styling is the only custom part.
 */
export function Scrubber({
  value,
  max,
  onChange,
  label,
  valueText,
  disabled,
  accent = "var(--color-ember)",
  className = "",
}: {
  value: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
  valueText?: string;
  disabled?: boolean;
  accent?: string;
  className?: string;
}) {
  const track = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const pct = max > 0 ? clamp((value / max) * 100, 0, 100) : 0;

  const fromClientX = useCallback(
    (clientX: number) => {
      const el = track.current;
      if (!el || max <= 0) return;
      const rect = el.getBoundingClientRect();
      onChange(clamp((clientX - rect.left) / rect.width, 0, 1) * max);
    },
    [max, onChange]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (max <= 0) return;
    const step = max / 20;
    const map: Record<string, number> = {
      ArrowRight: step,
      ArrowUp: step,
      ArrowLeft: -step,
      ArrowDown: -step,
    };
    if (e.key in map) {
      e.preventDefault();
      onChange(clamp(value + map[e.key], 0, max));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(max);
    }
  };

  return (
    <div
      ref={track}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={Math.round(max)}
      aria-valuenow={Math.round(value)}
      aria-valuetext={valueText}
      aria-disabled={disabled}
      onKeyDown={onKeyDown}
      onPointerDown={(e) => {
        if (disabled) return;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        setDragging(true);
        fromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging && fromClientX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      className={`group relative flex h-5 flex-1 cursor-pointer touch-none items-center ${
        disabled ? "cursor-default opacity-50" : ""
      } ${className}`}
    >
      {/* Track. */}
      <span className="block h-[3px] w-full rounded-full bg-cream/15" />

      {/* Filled portion. */}
      <span
        className="pointer-events-none absolute left-0 h-[3px] rounded-full"
        style={{ width: `${pct}%`, background: accent }}
      />

      {/* Handle — always visible on the progress track, so the position is
          readable at a glance rather than only on hover. */}
      <span
        className="pointer-events-none absolute h-[11px] w-[11px] rounded-full border-2 transition-transform duration-150 group-hover:scale-125"
        style={{
          left: `calc(${pct}% - 5.5px)`,
          background: "var(--color-cream)",
          borderColor: accent,
          transform: dragging ? "scale(1.3)" : undefined,
          boxShadow: "0 1px 6px rgba(0,0,0,0.7)",
        }}
      />
    </div>
  );
}
