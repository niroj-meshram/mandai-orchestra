# मंडई ऑर्केस्ट्रा · Mandai Orchestra

छत्तीसगढ़ी • भोजपुरी • स्टेज क्लासिक्स

A quiet, cinematic page for reliving mandai orchestra nights. One illustrated
stage, one player, and as little interface as the thing can survive with.

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · no backend,
no database, no auth, no UI libraries.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

---

## The two things you will actually edit

### 1. The artwork — `public/stage/`

Drop your scene in, flip one line in `config/scene.ts`. Full instructions and
framing notes are in [`public/stage/README.md`](public/stage/README.md).

It must be a **clean plate** — no text, no interface. All of that is live HTML
on top.

### 2. The music — `data/playlists.ts`

One file, six playlists. Paste a YouTube link into `youtubeUrl` and fill in the
title, singer, duration, mood and year:

```ts
{
  title: "Sanjha Bihaniya",
  singer: "Sundar Lal & Party",
  youtubeUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  duration: "5:14",
  mood: "dhun",
  year: 2008,
}
```

Any YouTube URL shape works — `watch?v=`, `youtu.be/`, `/embed/`, `/shorts/`.

To add a playlist, copy one block and give it a new `id`. It appears in the
Playlists panel on its own.

> **The sample songs are placeholders.** Titles are invented in the local
> orchestra idiom and credited to generic troupe names, the way mandai
> programmes were really billed ("… & Party") — they are not real recordings.
> The video IDs are a few well-known public clips rotated through the list so
> the player has something to play before you paste your own. Replace them all.

---

## Everything else you might want to change

| What                        | Where                  |
| --------------------------- | ---------------------- |
| Title, tagline, footer      | `data/site.ts`         |
| The nostalgic quotes        | `data/site.ts`         |
| Colours                     | `app/globals.css` → `@theme` |
| Fonts                       | `app/layout.tsx`       |
| Background image + crop     | `config/scene.ts`      |

Colours are Tailwind v4 theme tokens, so changing one hex in `@theme` moves
every use of it:

```css
--color-amber: #e9a34c;   /* stage light, active states, accents */
--color-ember: #d6412f;   /* LIVE dot, play ring, singer name */
--color-gold:  #d8b978;   /* rules, borders, hairlines */
--color-cream: #f2e6d0;   /* primary text */
```

---

## Structure

```
app/
  layout.tsx          fonts, metadata
  page.tsx            composition + keyboard transport
  globals.css         design tokens, surfaces, animation
components/
  StageScene.tsx      artwork slot, lighting, scrims, grain
  TopBar.tsx          clock, date, LIVE indicator, mark, panel buttons
  Masthead.tsx        मंडई ऑर्केस्ट्रा title block
  QuoteCard.tsx       one rotating memory
  PlayerBar.tsx       the cassette player
  Cassette.tsx        turning reels
  Scrubber.tsx        shared slider (position + volume)
  Panel.tsx           slide-over shell — focus trap, Escape, scrim
  PlaylistsPanel.tsx  the six programmes
  AllSongsPanel.tsx   every song, flattened
  Logo.tsx  icons.tsx
hooks/
  useOrchestraRadio.ts  which programme, which song, what plays next
  useYouTubePlayer.ts   hidden iframe + IFrame API
  useClock.ts           wall clock, hydration-safe
  useReducedMotion.ts
config/scene.ts       artwork path and crop
data/
  playlists.ts        the music
  site.ts             branding and copy
lib/
  youtube.ts          URL parsing, API loader, player types
  utils.ts            time formatting, clamp, class names
```

---

## Notes on how it works

**Playback.** A single YouTube iframe is mounted off-screen for the whole
session and driven through the IFrame API — the visible controls are entirely
custom. The iframe is never unmounted between songs, because rebuilding it
re-arms the browser's autoplay block and the next song would silently refuse to
start.

**The first press.** Nothing plays until you press play. Browsers require a
user gesture before audio, so rather than work around it with a muted autoplay
trick, the play button simply is that gesture. Songs after the first advance on
their own.

**Unplayable songs.** If a video is blocked or region-restricted, the player
moves to the next one instead of stalling, and says so under the bar.

**Keyboard.** Space plays and pauses, ← and → move between songs. Panels trap
focus, close on Escape, and return focus to the button that opened them. Every
slider is a real `role="slider"` with arrow-key support.

**Reduced motion.** With `prefers-reduced-motion` set, the reels stop, the
quote stops rotating, and every transition is cut. The page stays lit; it just
holds still.

**Weight.** ~118 kB first load JS, no runtime dependencies beyond React and
Next. Grain, glass and lighting are CSS — the only image is your artwork.
