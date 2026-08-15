"use client";

import { useEffect, useRef } from "react";
import { CloseIcon } from "./icons";

/**
 * The shared slide-over. Dims the stage, traps focus while it is open, closes
 * on Escape or a click outside, and returns focus to whatever opened it.
 */
export function Panel({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  // Remember what had focus, and give it back on close.
  useEffect(() => {
    if (open) {
      restoreTo.current = document.activeElement as HTMLElement;
      // Focus the panel itself so Escape and Tab land somewhere sensible.
      window.setTimeout(() => panelRef.current?.focus(), 20);
    } else {
      restoreTo.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Keep Tab inside the panel.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    // Stop the page behind from scrolling under the panel.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Scrim. */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="anim-fade absolute inset-0 h-full w-full cursor-default bg-ink/75 backdrop-blur-[3px]"
        style={{ animationDuration: "260ms" }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="glass-strong anim-slide-up absolute inset-x-0 bottom-0 flex max-h-[82vh] flex-col rounded-t-2xl outline-none sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[420px] sm:rounded-l-2xl sm:rounded-tr-none"
      >
        <div className="flex items-start justify-between gap-4 border-b border-gold/15 px-5 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <h2 className="font-display text-xl text-cream sm:text-2xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 font-body text-xs text-cream-dim">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-cream-dim transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="quiet-scroll flex-1 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
