/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SYNC-PLAYLIST — regenerate data/playlists.ts from a YouTube playlist.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *    node scripts/sync-playlist.mjs "https://www.youtube.com/playlist?list=PL…"
 *    npm run sync-playlist -- "<url>"        # url optional, see PLAYLIST below
 *
 *  Reads the playlist the way a browser does — the page ships its own data in a
 *  `ytInitialData` blob — so there is no API key, no quota and no dependency to
 *  install. Public and unlisted playlists both work; private ones do not, since
 *  the page never renders for a signed-out visitor.
 *
 *  The generated file is meant to be edited afterwards. YouTube titles are
 *  written by uploaders, not cataloguers, so the cleanup below is a best effort
 *  and the singer is frequently just the channel that posted the video. Fix the
 *  handful that read wrong; a re-run will overwrite them, so do the re-run first
 *  and the corrections second.
 */

import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "../data/playlists.ts");

/** Used when no URL is passed on the command line. */
const PLAYLIST = "https://www.youtube.com/playlist?list=PLS2iHXuLbS-w";

/**
 * The programmes the one YouTube playlist is dealt into.
 *
 * There is a single source of songs; these are views onto it, each one a page
 * on the site and a programme in the panel. A song can appear in more than one
 * — a Chhattisgarhi dance number belongs on the CG page and in the mela set,
 * and pretending otherwise would mean six thin lists instead of six useful
 * ones. `id` is also the URL slug, so changing one moves a page.
 */
const PROGRAMMES = [
  {
    id: "chhattisgarhi-orchestra-songs",
    name: "Chhattisgarhi Orchestra Hits",
    nameHi: "छत्तीसगढ़ी ऑर्केस्ट्रा",
    tagline: "गाँव के मंच से, सीधे",
    match: (s) => s.lang === "cg",
  },
  {
    id: "cg-stage-program-songs",
    name: "CG Stage Program Classics",
    nameHi: "स्टेज प्रोग्राम",
    tagline: "साउंड चेक से सुबह तक",
    // The up-tempo running order: regional, and not one of the slow ones.
    match: (s) => s.lang !== "hindi" && !["late-night", "sad"].includes(s.mood),
  },
  {
    id: "bhojpuri-orchestra-songs",
    name: "Bhojpuri Orchestra Dance Songs",
    nameHi: "भोजपुरी ऑर्केस्ट्रा",
    tagline: "स्पीकर फटने तक",
    match: (s) => s.lang === "bhojpuri",
  },
  {
    id: "mela-orchestra-songs",
    name: "Mela Orchestra Collection",
    nameHi: "मेला ऑर्केस्ट्रा",
    tagline: "झूला, जलेबी, जनरेटर",
    // What a mela crowd actually stands in front of: the dance and the
    // singalong numbers. Keyed on "dance" alone this came out at two songs,
    // because the mood guess falls back to "dhun" for anything unlabelled.
    match: (s) => ["dance", "romantic"].includes(s.mood),
  },
  {
    id: "mandai-orchestra-night",
    name: "Mandai Night Orchestra",
    nameHi: "मंडई नाइट",
    tagline: "बारह के बाद वाला प्रोग्राम",
    match: (s) => ["late-night", "sad", "romantic", "bhakti"].includes(s.mood),
  },
  {
    id: "orchestra-classics",
    name: "Orchestra Classics & Live Performances",
    nameHi: "ऑर्केस्ट्रा क्लासिक्स",
    tagline: "फिल्मी गाना, लोकल बैंड",
    match: (s) => s.lang === "hindi" || s.mood === "dhun",
  },
];

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

// ─── Fetching ────────────────────────────────────────────────────────────────

async function getText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.text();
}

/** Pulls a top-level JSON object assigned to `name` out of a YouTube page. */
function extractJson(html, name) {
  const at = html.indexOf(name);
  if (at === -1) return null;
  const start = html.indexOf("{", at);
  if (start === -1) return null;

  // Brace-match rather than regex: the blob contains braces inside strings.
  let depth = 0;
  let inStr = false;
  let escaped = false;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) {
      try {
        return JSON.parse(html.slice(start, i + 1));
      } catch {
        return null;
      }
    }
  }
  return null;
}

/** Every value stored under `key`, at any depth. */
function collect(node, key, out = []) {
  if (Array.isArray(node)) {
    for (const v of node) collect(v, key, out);
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k === key) out.push(v);
      else collect(v, key, out);
    }
  }
  return out;
}

/** YouTube stores text as either a simpleText or an array of runs. */
function text(node) {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (node.simpleText) return node.simpleText;
  if (Array.isArray(node.runs)) return node.runs.map((r) => r.text ?? "").join("");
  return "";
}

/**
 * Playlist pages render only the first ~100 items and hand back a token for the
 * rest, so anything longer has to be walked through the same internal endpoint
 * the page itself calls.
 */
async function fetchPlaylist(url) {
  const html = await getText(url);
  const data = extractJson(html, "var ytInitialData =");
  if (!data) throw new Error("Could not find ytInitialData — is the playlist private?");

  const alerts = collect(data, "alertRenderer").map((a) => text(a.text));
  if (alerts.length) console.warn(`  ! YouTube says: ${alerts.join(" / ")}`);

  const title =
    data.metadata?.playlistMetadataRenderer?.title ??
    text(collect(data, "title")[0]) ??
    "";

  const items = [...collect(data, "playlistVideoRenderer")];

  const apiKey = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
  const version = html.match(/"clientVersion":"([\d.]+)"/)?.[1] ?? "2.20240101.00.00";

  let token = collect(data, "continuationItemRenderer")[0]
    ?.continuationEndpoint?.continuationCommand?.token;

  while (token && apiKey) {
    const res = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": UA },
      body: JSON.stringify({
        continuation: token,
        context: { client: { clientName: "WEB", clientVersion: version } },
      }),
    });
    if (!res.ok) break;
    const page = await res.json();
    const more = collect(page, "playlistVideoRenderer");
    if (!more.length) break;
    items.push(...more);
    console.log(`  … ${items.length} videos`);
    token = collect(page, "continuationItemRenderer")[0]
      ?.continuationEndpoint?.continuationCommand?.token;
  }

  return { title, items };
}

/** Upload year, read off the watch page. Worth one request; it is real data. */
async function fetchYear(id) {
  try {
    const html = await getText(`https://www.youtube.com/watch?v=${id}`);
    const date =
      html.match(/"publishDate":\{"simpleText":"([^"]+)"\}/)?.[1] ??
      html.match(/"uploadDate":"(\d{4})/)?.[1] ??
      html.match(/"publishDate":"(\d{4})/)?.[1];
    const year = Number(String(date ?? "").match(/\d{4}/)?.[0]);
    return Number.isFinite(year) ? year : 0;
  } catch {
    return 0;
  }
}

/** Runs `job` over `items`, `limit` at a time, preserving order. */
async function pooled(items, limit, job) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await job(items[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}

// ─── Cleaning up what uploaders typed ────────────────────────────────────────

/** Promo noise that means nothing once the song is in a playlist. */
const NOISE =
  /\b(full\s+)?(hd|4k|official|video|audio|song|movie|lyrical|lyrics|new|latest|superhit|super\s*hit|hit|dj|remix|mix|nonstop|non\s*stop|status|shorts?|trending|viral|album|presents?|exclusive)\b/gi;

const SEPARATORS = /\s*(?:\|{1,2}|¦{1,2}|‖|·|—|–|\/{1,2})\s*/;

function tidy(s) {
  return s
    .replace(/[\[\({][^\]\)}]*[\]\)}]/g, " ") // bracketed asides
    .replace(/#\S+/g, " ") // hashtags
    .replace(/\s+/g, " ")
    .replace(/^[\s\-–—:,.|]+|[\s\-–—:,.|]+$/g, "")
    .trim();
}

/**
 * Uploaders pack the title, the artist, the label and a row of keywords into
 * one line separated by pipes. The first segment is almost always the song;
 * a later segment that reads like a person's name is the best guess at who
 * sang it.
 */
function splitTitle(raw, channel) {
  const segments = raw.split(SEPARATORS).map(tidy).filter(Boolean);

  let title = segments.find((s) => tidy(s.replace(NOISE, "")).length > 2) ?? raw;
  // Strip the keyword padding too, but never all the way to nothing — a few
  // titles are genuinely made of these words ("Full Song" as a song name).
  title = tidy(tidy(title.replace(NOISE, "")) || title);

  // "देवनागरी - Latin transliteration" is one title written twice; keep the
  // Devanagari, which is what the rest of the site is set in.
  const halves = title.split(/\s+-\s+/).map(tidy).filter(Boolean);
  if (halves.length > 1) {
    title = halves.find((h) => /[ऀ-ॿ]/.test(h)) ?? halves[0];
  }

  // Things that sit in the same slot as a name but are not a person: the film,
  // the album, the label, the studio that cut the track.
  const NOT_A_PERSON =
    /\b(album|feat|ft|topic|cassette|records?|entertainment|productions?|studios?|digital|films?|movies?|presents|vision|remix|dj)\b/i;

  const script = (s) => (/[ऀ-ॿ]/.test(s) ? "deva" : "latin");
  const wordCount = (s) => s.split(/\s+/).length;

  const nameish = (s) => {
    const clean = tidy(s.replace(/^singer\s+/i, "").replace(NOISE, ""));
    if (clean.length < 3 || clean === title) return false;
    if (NOT_A_PERSON.test(clean)) return false;
    // The same title transliterated is the commonest false positive: one half
    // Devanagari, one half Latin, same number of words.
    if (script(clean) !== script(title) && wordCount(clean) === wordCount(title)) {
      return false;
    }
    if (script(clean) === "deva") return /^[ऀ-ॿ\s.]+$/.test(clean);
    const words = clean.split(/\s+/);
    return (
      words.length >= 2 &&
      words.length <= 4 &&
      words.every((w) => /^[A-Z][a-z'.]+$/.test(w))
    );
  };

  const match = segments.slice(1).find(nameish);
  const singer = match && tidy(match.replace(/^singer\s+/i, ""));

  return {
    title: tidy(title.replace(/\s+-\s+.*$/, "")) || raw,
    // Falling back to the channel is a compromise: a label is not a singer, but
    // it is at least true, and it beats leaving the line blank.
    singer: singer ? tidy(singer) : channel || "—",
  };
}

/** Rough sort by what the song is for. Only ever a starting point. */
const MOODS = [
  ["bhakti", /chhath|chhathi|maiya|bhajan|mata|devi|ganesh|shiv|bhole|durga|puja|छठ|माई|भजन|देवी|पूजा/i],
  ["vidai", /doli|vidai|bidai|babul|डोली|विदाई|बाबुल/i],
  ["sad", /judai|bewafa|dard|aansu|tanhai|rulaya|akela|जुदाई|बेवफा|दर्द|आँसू|रोई|दुखता/i],
  ["late-night", /raat|raate|night|neend|chand|रात|रात|नींद|चाँद/i],
  ["romantic", /pyar|pyaar|ishq|dil|chumma|maya|sajan|saiyan|balam|raja|प्यार|दिल|माया|सजन|राजा|चुम्मा/i],
  ["dance", /nach|thumka|jawani|lahanga|lehanga|lahariya|lahenga|mast|garmi|item|नाच|जवानी|लहंगा|मस्त/i],
];

function guessMood(raw) {
  for (const [mood, re] of MOODS) if (re.test(raw)) return mood;
  return "dhun";
}

/**
 * Which tradition a song comes out of, read off the title and the channel that
 * posted it.
 *
 * Chhattisgarhi is checked first and deliberately: a CG song is frequently
 * uploaded by a channel with "Bhojpuri" in its name, because the labels serve
 * both markets, but the reverse almost never happens — a Bhojpuri song rarely
 * carries CG vocabulary. So the more specific signal wins, and the fallback is
 * "hindi", which here means the film songs the local bands covered.
 */
const CG =
  /\bcg\b|chhattisgarh|chhatisgarh|छत्तीसगढ़|सरगुज|\b(turi|tura|mor|tor|dai|sangi|maya|bihaav|bihav|gawan|karma|sua|panthi|jhan|chube|fuljhadi|sargujiha|barman|gorelal)\b|टूरी|टूरा|मोर|तोर|दाई|संगी|बिहाव/i;

const BHOJPURI =
  /bhojpuri|भोजपुरी|\b(bhauji|saiyan|piyawa|balamua|balmua|raja ji|lahariya|lahanga|odhaniya|jawani|chhathi|nirahua|pawan singh|sakal|amrapali)\b|भउजी|सैंया|पियवा|लहरिया|जवानी/i;

function guessLang(raw, channel) {
  const hay = `${raw} ${channel}`;
  if (CG.test(hay)) return "cg";
  if (BHOJPURI.test(hay)) return "bhojpuri";
  return "hindi";
}

// ─── Emitting ────────────────────────────────────────────────────────────────

const quote = (s) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

function render(songs, listTitle) {
  const row = (s) =>
    `      { title: ${quote(s.title)}, singer: ${quote(s.singer)}, ` +
    `youtubeUrl: ${quote(s.youtubeUrl)}, duration: ${quote(s.duration)}, ` +
    `mood: ${quote(s.mood)}, lang: ${quote(s.lang)}, year: ${s.year} },`;

  // Deal the pool into programmes. A song that matches nothing would otherwise
  // vanish from the site entirely, so the last programme takes the remainder —
  // silently dropping songs is the one failure mode nobody would notice.
  const claimed = new Set();
  const dealt = PROGRAMMES.map((p) => {
    const picked = songs.filter((s) => p.match(s));
    picked.forEach((s) => claimed.add(s.youtubeUrl));
    return { ...p, picked };
  });

  const orphans = songs.filter((s) => !claimed.has(s.youtubeUrl));
  if (orphans.length) {
    console.warn(`  ! ${orphans.length} song(s) matched no programme; added to "${dealt.at(-1).name}"`);
    dealt.at(-1).picked.push(...orphans);
  }

  for (const p of dealt) console.log(`  · ${p.name}: ${p.picked.length}`);

  const blocks = dealt
    .map(
      (p) => `  {
    id: ${quote(p.id)},
    name: ${quote(p.name)},
    nameHi: ${quote(p.nameHi)},
    tagline: ${quote(p.tagline)},
    songs: [
${p.picked.map(row).join("\n")}
    ],
  },`
    )
    .join("\n");

  return `/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PLAYLISTS — generated from a YouTube playlist. Safe to edit by hand.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Source: ${listTitle} — ${PLAYLIST}
 *
 *  Regenerate with:  npm run sync-playlist
 *  That overwrites this file, so make hand corrections after a sync, not before.
 *
 *  Titles and singers are lifted from what the uploaders typed and tidied up by
 *  a heuristic, so some will read oddly — the singer in particular is often the
 *  channel that posted the video rather than the person singing. Correcting a
 *  line here is the intended fix.
 *
 *  \`duration\` is only the label shown before YouTube reports the real length.
 *  \`mood\` is guessed from keywords; \`year\` is the upload date, not the year the
 *  song was recorded. Neither is displayed anywhere yet.
 */

export type Mood =
  | "dhun"
  | "dance"
  | "romantic"
  | "sad"
  | "bhakti"
  | "vidai"
  | "late-night";

/** Which tradition a song comes out of. "hindi" means the film songs the
    local bands covered, rather than anything sung in a village dialect. */
export type Lang = "cg" | "bhojpuri" | "hindi";

export interface Song {
  title: string;
  singer: string;
  youtubeUrl: string;
  duration: string;
  mood: Mood;
  lang: Lang;
  year: number;
}

export interface Playlist {
  /** Also the URL slug: /<id> is this programme's page. */
  id: string;
  name: string;
  /** Devanagari name, shown as the primary label in the panel. */
  nameHi: string;
  /** One quiet line under the name. */
  tagline: string;
  songs: Song[];
}

export const playlists: Playlist[] = [
${blocks}
];

export const moodLabels: Record<Mood, string> = {
  dhun: "धुन",
  dance: "डांस",
  romantic: "रोमांटिक",
  sad: "दर्द भरे",
  bhakti: "भक्ति",
  vidai: "विदाई",
  "late-night": "देर रात",
};

/**
 * Every song, once, still carrying where it came from — the All Songs list
 * needs the programme and the position to hand playback back to the right
 * place. Programmes overlap on purpose, so this dedupes on the video: without
 * that, a song in three programmes would be listed three times and the count
 * under the heading would be a lie.
 */
export const allSongs: { song: Song; playlist: Playlist; index: number }[] =
  (() => {
    const seen = new Set<string>();
    return playlists.flatMap((playlist) =>
      playlist.songs.flatMap((song, index) => {
        if (seen.has(song.youtubeUrl)) return [];
        seen.add(song.youtubeUrl);
        return [{ song, playlist, index }];
      })
    );
  })();

/** The distinct songs on the site, in programme order. */
export const uniqueSongs: Song[] = allSongs.map((entry) => entry.song);

/** Look a programme up by its slug. */
export function playlistBySlug(slug: string): Playlist | undefined {
  return playlists.find((p) => p.id === slug);
}
`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

/**
 * This runs as part of `npm run build`, which means a bad night at YouTube's
 * end — a rate limit, a markup change, a blocked datacentre IP — would
 * otherwise take the whole deploy down with it. So a failed sync is only fatal
 * when there is no previously generated file to fall back on; otherwise the
 * build carries on with the songs it already had, one release behind.
 */
async function main() {
  const url = process.argv[2] || PLAYLIST;
  console.log(`Reading ${url}`);

  const { title: listTitle, items } = await fetchPlaylist(url);
  console.log(`  ${items.length} videos in "${listTitle}"`);

  const parsed = items
    .map((v) => {
      const id = v.videoId;
      const raw = text(v.title);
      const channel = tidy(text(v.shortBylineText));
      if (!id || !raw) return null;
      // Deleted and region-blocked entries still render, with no length.
      if (v.isPlayable === false) {
        console.warn(`  ! skipping unplayable: ${raw.slice(0, 60)}`);
        return null;
      }
      return {
        ...splitTitle(raw, channel),
        youtubeUrl: `https://youtu.be/${id}`,
        duration: text(v.lengthText) || "0:00",
        mood: guessMood(raw),
        lang: guessLang(raw, channel),
        id,
      };
    })
    .filter(Boolean);

  if (!parsed.length) throw new Error("Playlist parsed to zero playable songs");

  console.log(`  fetching upload years…`);
  const years = await pooled(parsed, 6, (s) => fetchYear(s.id));
  const songs = parsed.map((s, i) => ({ ...s, year: years[i] }));

  const missing = songs.filter((s) => !s.year).length;
  if (missing) console.warn(`  ! ${missing} song(s) without a year; left as 0`);

  await writeFile(OUT, render(songs, listTitle), "utf8");
  console.log(`Wrote ${songs.length} songs to data/playlists.ts`);
}

try {
  await main();
} catch (err) {
  console.warn(`\n  ! playlist sync failed: ${err.message}`);
  if (existsSync(OUT)) {
    console.warn(`  ! keeping the existing data/playlists.ts and carrying on.\n`);
  } else {
    console.error(`  ! no data/playlists.ts to fall back on — cannot continue.\n`);
    process.exit(1);
  }
}
