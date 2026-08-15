import { site } from "@/data/site";

/**
 * The title block sitting over the stage roof. The Hindi name leads at full
 * size, the English name reads as its translation underneath, and the tagline
 * closes the group — three sizes, one centre line, nothing else.
 *
 * On a phone this sits in normal flow directly under the top bar, so it clears
 * the clock and the credit by construction however tall those turn out to be.
 * Only from sm up, where there is room for the poster composition, does it lift
 * out and position itself against the frame.
 */
export function Masthead() {
  return (
    <div className="pointer-events-none z-10 mt-7 px-5 text-center sm:absolute sm:inset-x-0 sm:top-[17vh] sm:mt-0 sm:px-6">
      {/* Painted gold rather than coloured gold: a top-down gradient is clipped
          to the glyphs so each letter is pale at the head and deepens toward
          the foot, the way the name reads on the stage banner.

          Two knock-on effects of a transparent fill. The bold has to be a
          stroke — Tiro ships at 400 only, and font-weight:700 would get
          faux-bolded and smear the conjuncts — and it needs a literal colour,
          since currentColor is now transparent. That colour is a mid-gold from
          inside the gradient's own range: the stroke is wide enough to carry
          the weight, and anything darker would eat the fill and dull the
          letters. The contour comes from a tight drop-shadow instead, and the
          glow has to be a drop-shadow too, because text-shadow paints nothing
          behind transparent glyphs. */}
      <h1
        className="anim-rise font-display leading-[1.04]"
        style={{
          fontSize: "clamp(2.15rem, 8.2vw, 6.2rem)",
          backgroundImage:
            "linear-gradient(180deg, #fbf0cd 0%, #f4dc95 34%, #e4b45c 68%, #c9922f 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextStroke: "0.038em #dfae51",
          filter:
            "drop-shadow(0 1px 0 rgba(120,74,20,0.85)) drop-shadow(0 2px 22px rgba(233,163,76,0.45)) drop-shadow(0 6px 34px rgba(0,0,0,0.8))",
        }}
      >
        {site.titleHi}
      </h1>

      {/* English name, flanked by rules that stop short of it. Set in wide
          engraved caps: the letters carry a cream-to-gold fall, so the fill is
          a clipped gradient, the weight is a stroke tinted from inside that
          same range, and the glow comes from a drop-shadow — text-shadow
          paints nothing behind transparent glyphs. The trailing letter-space
          is pulled back with text-indent so the word still sits on the centre
          line. */}
      <div
        className="anim-rise mt-3 flex items-center justify-center gap-3 sm:gap-4"
        style={{ animationDelay: "120ms" }}
      >
        <Rule side="left" />
        <p
          className="whitespace-nowrap font-display uppercase tracking-[0.2em] indent-[0.2em] sm:tracking-[0.35em] sm:indent-[0.35em]"
          style={{
            fontSize: "clamp(0.8rem, 1.6vw, 1.25rem)",
            backgroundImage:
              "linear-gradient(180deg, #f2e6d0 0%, #f2e6d0 42%, #d8b978 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextStroke: "0.032em #ecdcb4",
            filter:
              "drop-shadow(0 1px 10px rgba(216,185,120,0.35)) drop-shadow(0 2px 14px rgba(0,0,0,0.8))",
          }}
        >
          {site.titleEn}
        </p>
        <Rule side="right" />
      </div>

      <p
        className="anim-rise mt-2.5 font-body text-cream-dim"
        style={{
          animationDelay: "240ms",
          fontSize: "clamp(0.7rem, 1.35vw, 0.95rem)",
          letterSpacing: "0.06em",
          textShadow: "0 2px 12px rgba(0,0,0,0.85)",
        }}
      >
        {site.taglineHi}
      </p>
    </div>
  );
}

function Rule({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className="block h-px w-5 sm:w-20"
      style={{
        background:
          side === "left"
            ? "linear-gradient(90deg, transparent, rgba(216,185,120,0.65))"
            : "linear-gradient(90deg, rgba(216,185,120,0.65), transparent)",
      }}
    />
  );
}
