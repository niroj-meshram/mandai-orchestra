"use client";

/**
 * The cassette thumbnail on the left of the player. Its reels turn while the
 * music plays — the only moving thing in the interface, and the one that says
 * "tape" rather than "stream".
 */
export function Cassette({ playing }: { playing: boolean }) {
  return (
    <span
      aria-hidden
      className="relative grid h-[58px] w-[58px] shrink-0 place-items-center overflow-hidden rounded-md sm:h-[66px] sm:w-[66px]"
      style={{
        background: "linear-gradient(155deg, #4a3320 0%, #241608 100%)",
        border: "1px solid rgba(216,185,120,0.22)",
        boxShadow: "inset 0 1px 0 rgba(242,230,208,0.12)",
      }}
    >
      {/* Label strip. */}
      <span
        className="absolute inset-x-1.5 top-1.5 h-[13px] rounded-[2px]"
        style={{
          background: "linear-gradient(180deg, #e8d7ae, #c9b184)",
        }}
      />
      {/* Ruled lines on the label. */}
      <span
        className="absolute inset-x-2.5 top-[9px] h-[6px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(120,90,40,0.5) 0 1px, transparent 1px 3px)",
        }}
      />

      {/* Reel window. */}
      <span
        className="absolute inset-x-1.5 bottom-1.5 flex h-[26px] items-center justify-around rounded-[3px] px-2"
        style={{
          background: "rgba(8,5,3,0.72)",
          border: "1px solid rgba(0,0,0,0.6)",
        }}
      >
        {[0, 1].map((r) => (
          <span
            key={r}
            className="grid h-[17px] w-[17px] place-items-center rounded-full border border-[#5a452e]"
            style={{
              background:
                "radial-gradient(circle, #150d07 38%, #3a2b1a 40%, #150d07 68%)",
              animation: playing
                ? `reel-turn ${r === 0 ? 2.4 : 3.2}s linear infinite`
                : undefined,
            }}
          >
            <span
              className="block h-[5px] w-[5px] rounded-full"
              style={{ background: playing ? "var(--color-amber)" : "#5a452e" }}
            />
          </span>
        ))}
      </span>
    </span>
  );
}
