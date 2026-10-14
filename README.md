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
npm test         # unit tests (search, play order, playlist parsing)
npm run lint     # ESLint with Next's rules
```

---

## The two things you will actually edit

### 1. The artwork — `public/stage/`

Drop your scene in, flip one line in `config/scene.ts`. Full instructions and
framing notes are in [`public/stage/README.md`](public/stage/README.md).

It must be a **clean plate** — no text, no interface. All of that is live HTML
on top.

### 2. The music — a YouTube playlist

The songs come from one YouTube playlist (`PLAYLIST` in
`scripts/sync-playlist.mjs`). Add or remove videos there, then:

```sh
npm run sync-playlist
```

That regenerates `data/playlists.ts` — titles, singers (from the "Singer: …"
credit in each video's description where there is one), lengths, and which of
the six programmes each song belongs to. Every build runs it, and a Vercel cron
rebuilds nightly, so a playlist change reaches the site on its own.

**Don't edit `data/playlists.ts` by hand** — the next sync overwrites it. Fixes
go in `data/song-overrides.json`, keyed by video id, and are re-applied on
every sync:

```json
{
  "EHh-RNIrvYk": { "title": "Mai Balaghat Ka Tura", "singer": "Santosh Thakrele" },
  "aSqwSiCe4eE": { "hide": true }
}
```

Any of `title`, `singer`, `mood`, `lang`, `hide`. To find what needs fixing:

```sh
npm run song-report    # writes data/song-report.md
```

It lists singers that are really a channel or label, titles still carrying the
uploader's padding, likely duplicates (the same song uploaded twice, even when
one title is in Devanagari and the other in Latin), and — after a sync — videos
that were dropped because they are removed or have embedding switched off.
Each entry comes with a line ready to paste into the overrides file.

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
