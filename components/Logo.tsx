/**
 * The mark: a cassette reel window inside a dark disc, with the amber play
 * wedge cut through it. Small, quiet, and the only piece of pure branding on
 * the page.
 */
export function Logo({ size = 54 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 38% 30%, #2e1d12 0%, #140c07 70%)",
        border: "1px solid rgba(216,185,120,0.28)",
        boxShadow:
          "0 10px 26px -10px rgba(0,0,0,0.9), inset 0 1px 0 rgba(242,230,208,0.1)",
      }}
    >
      <svg
        width={size * 0.52}
        height={size * 0.52}
        viewBox="0 0 24 24"
        aria-hidden
      >
        {/* Play wedge. */}
        <path
          d="M8.6 5.4v13.2c0 .7.77 1.14 1.37.77l10.3-6.6a.9.9 0 0 0 0-1.54L9.97 4.63a.9.9 0 0 0-1.37.77Z"
          fill="var(--color-ember)"
        />
        {/* Tape stripes across it. */}
        <g stroke="var(--color-cream)" strokeWidth="1.15" opacity="0.92">
          <path d="M11 7.6v8.8M14 8.8v6.4M17 10v4" />
        </g>
      </svg>
      <span className="sr-only">Mandai Orchestra</span>
    </span>
  );
}
