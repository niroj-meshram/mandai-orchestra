import { join } from "node:path";
import sharp from "sharp";

/**
 * The preview card a shared song link unfurls into: the stage, the song's
 * title and singer, and the brand.
 *
 * Drawn with sharp rather than next/og. next/og's renderer does not do Indic
 * text shaping, so vowel signs and conjuncts in a Devanagari title — most of
 * this catalogue — come out in the wrong order. sharp sets text through Pango
 * and HarfBuzz, which get them right. The fonts are the site's own, kept in
 * assets/fonts so a build never depends on reaching Google Fonts.
 */

export const OG_SIZE = { width: 1200, height: 630 };

const root = process.cwd();
const font = (name: string) => join(root, "assets/fonts", name);

const COLORS = {
  cream: "#f2e6d0",
  gold: "#d8b978",
  amber: "#e9a34c",
};

/** Pango markup is XML; titles are whatever uploaders typed. */
const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const clip = (s: string, max: number) =>
  s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;

async function text(
  content: string,
  color: string,
  fontName: string,
  fontFile: string,
  width: number
) {
  return sharp({
    text: {
      text: `<span foreground="${color}">${escape(content)}</span>`,
      font: fontName,
      fontfile: font(fontFile),
      rgba: true,
      width,
      wrap: "word",
      dpi: 72,
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
}

/** Darkens the stage towards the bottom-left, where the text sits. */
const shade = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_SIZE.width}" height="${OG_SIZE.height}">
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0d0805" stop-opacity="0.55"/>
      <stop offset="0.35" stop-color="#0d0805" stop-opacity="0.15"/>
      <stop offset="1" stop-color="#0d0805" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="h" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0d0805" stop-opacity="0.7"/>
      <stop offset="0.7" stop-color="#0d0805" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#v)"/>
  <rect width="100%" height="100%" fill="url(#h)"/>
</svg>`);

export async function renderSongCard({
  title,
  singer,
  programme,
}: {
  title: string;
  singer: string;
  programme: string;
}): Promise<Buffer> {
  const pad = 72;
  const inner = OG_SIZE.width - pad * 2;

  const [stage, logo, brand, prog, name, by] = await Promise.all([
    sharp(join(root, "public/stage/scene.png"))
      .resize(OG_SIZE.width, OG_SIZE.height, { fit: "cover", position: "top" })
      .toBuffer(),
    sharp(join(root, "app/icon.svg"), { density: 300 }).resize(64, 64).png().toBuffer(),
    text("मंडई ऑर्केस्ट्रा", COLORS.cream, "Tiro Devanagari Hindi 40", "TiroDevanagariHindi-Regular.ttf", 600),
    text(programme, COLORS.gold, "Mukta 28", "Mukta-Regular.ttf", inner),
    text(clip(title, 64), COLORS.cream, "Mukta SemiBold 66", "Mukta-SemiBold.ttf", inner),
    text(clip(singer, 60), COLORS.amber, "Mukta 36", "Mukta-Regular.ttf", inner),
  ]);

  // Stacked up from the bottom edge, so a two-line title pushes the rest up
  // rather than off the card.
  const byTop = OG_SIZE.height - pad - by.info.height;
  const nameTop = byTop - 10 - name.info.height;
  const progTop = nameTop - 14 - prog.info.height;

  return sharp(stage)
    .composite([
      { input: shade, left: 0, top: 0 },
      { input: logo, left: pad, top: pad - 8 },
      { input: brand.data, left: pad + 84, top: pad - 4 },
      { input: prog.data, left: pad, top: progTop },
      { input: name.data, left: pad, top: nameTop },
      { input: by.data, left: pad, top: byTop },
    ])
    // JPEG, not PNG: a photographic card is ~1 MB as PNG, and WhatsApp drops
    // the preview image entirely somewhere around 300 KB.
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
}
