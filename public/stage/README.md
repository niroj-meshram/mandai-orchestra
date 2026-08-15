# The stage artwork

Put your scene here as `scene.png` (or `.jpg` / `.webp`), then open
`config/scene.ts` and set:

```ts
src: "/stage/scene.png",
```

That is the only change needed. The site picks it up immediately.

---

## It must be a clean plate

The artwork carries **no text and no interface**. Everything readable on the
page is live HTML rendered on top of the image:

| In the artwork              | Rendered in HTML over it        |
| --------------------------- | ------------------------------- |
| the stage, performers, street | the title मंडई ऑर्केस्ट्रा      |
| the printed stage banner     | the clock and date              |
| lighting, bulbs, atmosphere  | LIVE PROGRAM indicator          |
|                             | Playlists / All Songs buttons    |
|                             | the quote card                   |
|                             | the player bar                   |
|                             | the footer line                  |

If the artwork also contains those, you will see both at once.

Keeping them separate is what lets the title reflow on a phone, the clock tick,
the copy stay selectable and translatable, and the whole thing stay editable
without regenerating an image.

## What the plate should show

- the small centred stage with the red tin roof
- one female singer at centre, two female dancers, musicians behind
- red curtains, warm amber lighting
- the printed banner reading **मंडई ऑर्केस्ट्रा आपका हार्दिक स्वागत करता है**
- faded walls, electric wires, banana plants, bicycles, a rickshaw
- muted earthy colours — a Diwali mandai night in central India

## Framing

- **2560×1440 or wider.** It is cropped with `object-fit: cover`.
- Keep the stage near the centre.
- Leave the top ~20% and bottom ~25% relatively quiet — the masthead sits over
  the first band and the player over the second. The site darkens both, but a
  busy detail there still fights the text.
- Use `position` in `config/scene.ts` to nudge the crop if the stage does not
  sit dead centre.

---

`reference.png` in this folder is the mockup this layout was built against. It
is a **guide only** — it has the interface baked into the pixels, so it is not
usable as the plate. Generate the same scene without any of that.
