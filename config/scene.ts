/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE STAGE ARTWORK
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Put your scene at:  public/stage/scene.png   (or .jpg / .webp)
 *  then set `src` below to "/stage/scene.png".
 *
 *  IMPORTANT — it must be a CLEAN PLATE:
 *    · no title text                · no clock or date
 *    · no player bar                · no buttons or quote card
 *  Every one of those is rendered live in HTML on top of this image, so if the
 *  artwork also contains them you will see both.
 *
 *  What the plate should contain:
 *    · the small centred stage with the red tin roof
 *    · one female singer at centre, two female dancers, musicians behind
 *    · red curtains, warm amber lighting
 *    · the printed banner reading:
 *        मंडई ऑर्केस्ट्रा आपका हार्दिक स्वागत करता है
 *    · faded walls, electric wires, banana plants, bicycles, a rickshaw
 *    · muted earthy colours, a Diwali mandai night in central India
 *
 *  Aim for 2560×1440 or wider. The image is cropped with `object-fit: cover`,
 *  so keep the stage near the centre and leave room at the top and bottom —
 *  those bands sit behind the masthead and the player.
 *
 *  While `src` is null the page renders its warm lighting and vignette alone,
 *  which is a deliberately empty stage rather than a broken one.
 */
export const STAGE_SCENE = {
  // ↓ Set this to "/stage/scene.png" once your clean plate is in public/stage/
  src: "/stage/scene.png" as string | null,

  /** CSS object-position. Nudge if your stage does not sit dead centre. */
  position: "50% 50%",
} as const;
