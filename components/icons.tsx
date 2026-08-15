/**
 * Every glyph the interface uses. Hand-drawn paths rather than an icon package
 * — eight shapes do not justify a dependency.
 */

type IconProps = { size?: number; className?: string };

const box = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
});

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ListIcon = ({ size = 16, className }: IconProps) => (
  <svg {...box(size)} {...stroke} className={className}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <circle cx="4.5" cy="6" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="18" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const NoteIcon = ({ size = 16, className }: IconProps) => (
  <svg {...box(size)} className={className} fill="currentColor">
    <path d="M20 4.2a1 1 0 0 0-1.22-.98l-8 1.9A1 1 0 0 0 10 6.1v8.62A3.2 3.2 0 1 0 12 17.6V9.36l6-1.42v4.9A3.2 3.2 0 1 0 20 15.8Z" />
  </svg>
);

/**
 * A triangle looks centred when its centroid sits on the centre, not when its
 * bounding box does — the mass is all on the base side, so box-centring reads
 * as too far left. These three points put the centroid on (12, 12), which is
 * why callers need no nudge of their own. The round join is a stroke of the
 * same colour: it inflates the wedge evenly and so leaves the centroid alone.
 */
export const PlayIcon = ({ size = 26, className }: IconProps) => (
  <svg
    {...box(size)}
    className={className}
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    <path d="M8.8 6 18.6 12 8.8 18Z" />
  </svg>
);

export const PauseIcon = ({ size = 26, className }: IconProps) => (
  <svg {...box(size)} className={className} fill="currentColor">
    <rect x="6.4" y="4.6" width="4.2" height="14.8" rx="1.1" />
    <rect x="13.4" y="4.6" width="4.2" height="14.8" rx="1.1" />
  </svg>
);

export const PrevIcon = ({ size = 22, className }: IconProps) => (
  <svg {...box(size)} className={className} fill="currentColor">
    <rect x="4.5" y="5.5" width="2.6" height="13" rx="1.1" />
    <path d="M19.5 6.7v10.6c0 .76-.86 1.2-1.48.78l-7.9-5.3a.95.95 0 0 1 0-1.56l7.9-5.3c.62-.42 1.48.02 1.48.78Z" />
  </svg>
);

export const NextIcon = ({ size = 22, className }: IconProps) => (
  <svg {...box(size)} className={className} fill="currentColor">
    <rect x="16.9" y="5.5" width="2.6" height="13" rx="1.1" />
    <path d="M4.5 6.7v10.6c0 .76.86 1.2 1.48.78l7.9-5.3a.95.95 0 0 0 0-1.56l-7.9-5.3c-.62-.42-1.48.02-1.48.78Z" />
  </svg>
);

export const VolumeIcon = ({ size = 16, className }: IconProps) => (
  <svg {...box(size)} className={className} fill="currentColor">
    <path d="M4 9.6v4.8a.9.9 0 0 0 .9.9h2.6l3.6 2.9c.6.48 1.5.06 1.5-.7V6.5c0-.76-.9-1.18-1.5-.7L7.5 8.7H4.9a.9.9 0 0 0-.9.9Z" />
    <path
      d="M15.6 9a4.2 4.2 0 0 1 0 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

export const MuteIcon = ({ size = 16, className }: IconProps) => (
  <svg {...box(size)} className={className} fill="currentColor">
    <path d="M4 9.6v4.8a.9.9 0 0 0 .9.9h2.6l3.6 2.9c.6.48 1.5.06 1.5-.7V6.5c0-.76-.9-1.18-1.5-.7L7.5 8.7H4.9a.9.9 0 0 0-.9.9Z" />
    <path
      d="M15.4 9.8l4.2 4.4M19.6 9.8l-4.2 4.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

export const CloseIcon = ({ size = 18, className }: IconProps) => (
  <svg {...box(size)} {...stroke} className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const LinkedInIcon = ({ size = 13, className }: IconProps) => (
  <svg {...box(size)} className={className} fill="currentColor">
    <path d="M4.6 9.2h2.8V19H4.6zM6 4.6a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4ZM9.6 9.2h2.7v1.34c.44-.76 1.4-1.5 2.86-1.5 2.4 0 3.24 1.5 3.24 4.06V19h-2.8v-5.3c0-1.4-.5-2.16-1.63-2.16-1.06 0-1.6.72-1.6 2.16V19H9.6Z" />
  </svg>
);

export const XIcon = ({ size = 13, className }: IconProps) => (
  <svg {...box(size)} className={className} fill="currentColor">
    <path d="M17.9 3h2.9l-6.34 7.24L22 21h-5.84l-4.57-5.98L6.35 21H3.44l6.78-7.75L3 3h5.99l4.13 5.46zm-1.02 16.25h1.61L8.2 4.66H6.47z" />
  </svg>
);

export const HeartIcon = ({ size = 14, className }: IconProps) => (
  <svg {...box(size)} className={className} fill="currentColor">
    <path d="M12 20.3s-7.4-4.6-7.4-9.6A4.2 4.2 0 0 1 12 8.1a4.2 4.2 0 0 1 7.4 2.6c0 5-7.4 9.6-7.4 9.6Z" />
  </svg>
);
