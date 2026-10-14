/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SONG-REPORT — what in data/playlists.ts probably needs a human.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *    npm run song-report
 *
 *  Titles and singers come from whatever uploaders typed, so some read wrong:
 *  a label or channel where the singer should be, a title still carrying the
 *  uploader's padding, the same song uploaded twice. This lists the likely
 *  ones in data/song-report.md, each with a line ready to paste into
 *  data/song-overrides.json — which is where fixes belong, because the sync
 *  re-applies that file every time and overwrites data/playlists.ts.
 *
 *  The sync writes the same report on every run; this command is for checking
 *  the current file without fetching anything.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { skeleton } from "../lib/transliterate.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
export const PLAYLISTS = resolve(HERE, "../data/playlists.ts");
export const OVERRIDES = resolve(HERE, "../data/song-overrides.json");
export const REPORT = resolve(HERE, "../data/song-report.md");

/** The 11-character id at the end of a youtu.be / watch URL. */
export const videoId = (url) =>
  url.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/)?.[1] ?? url;

// ─── Overrides ───────────────────────────────────────────────────────────────

const FIELDS = ["title", "singer", "mood", "lang"];

/**
 * data/song-overrides.json, keyed by video id. Keys starting with "$" are
 * comments. A missing file is an empty one.
 */
export async function loadOverrides() {
  let raw;
  try {
    raw = await readFile(OVERRIDES, "utf8");
  } catch {
    return {};
  }
  const parsed = JSON.parse(raw);
  return Object.fromEntries(Object.entries(parsed).filter(([k]) => !k.startsWith("$")));
}

/**
 * Applies overrides to parsed songs (each with an `id`). Hidden songs are
 * dropped. Returns the songs and the ids of overrides that matched nothing,
 * which usually means the video left the playlist.
 */
export function applyOverrides(songs, overrides) {
  const used = new Set();
  const out = [];
  for (const song of songs) {
    const fix = overrides[song.id];
    if (!fix) {
      out.push(song);
      continue;
    }
    used.add(song.id);
    if (fix.hide) continue;
    const patched = { ...song, overridden: true };
    for (const f of FIELDS) if (typeof fix[f] === "string" && fix[f]) patched[f] = fix[f];
    out.push(patched);
  }
  const unused = Object.keys(overrides).filter((id) => !used.has(id));
  return { songs: out, unused };
}

// ─── Reading the current file ────────────────────────────────────────────────

/**
 * The songs in data/playlists.ts, once each. The generated file has one song
 * object per line, which is all this relies on — no TypeScript needed.
 */
export async function readCurrentSongs() {
  const source = await readFile(PLAYLISTS, "utf8");
  const seen = new Set();
  const songs = [];
  for (const line of source.split("\n")) {
    const row = line.trim();
    if (!row.startsWith("{ title:")) continue;
    // Each row is a plain object literal: strings, numbers, nothing else.
    const song = new Function(`return (${row.replace(/,$/, "")})`)();
    const id = videoId(song.youtubeUrl);
    if (seen.has(id)) continue;
    seen.add(id);
    songs.push({ ...song, id });
  }
  return songs;
}

// ─── Heuristics ──────────────────────────────────────────────────────────────

/** Words that mark a channel, label or uploader rather than a person. */
const LABELISH =
  /\b(cassettes?|music|records?|studios?|digital|films?|entertainment|official|topic|dj|sound|series|channel|productions?|tv|hd|album|songs?|gana|geet|arkestra|orchestra|hits?|status|media|video)\b|गाना|गीत|सुपर\s*हिट|एल्बम/i;

/** Padding uploaders put in titles that a cataloguer would not. */
const TITLE_NOISE =
  /\b(cg|viral|dj|song|video|new|hd|full|official|ll)\b|\|\||#/i;

/**
 * @returns {{ id: string, title: string, singer: string, why: string[], fix: object }[]}
 */
export function findSuspects(songs) {
  const singers = new Set(songs.map((s) => s.singer.toLowerCase()));
  const out = [];

  for (const s of songs) {
    if (s.overridden) continue;
    const why = [];
    const fix = {};

    if (s.singer === "—" || !s.singer) {
      why.push("no singer");
      fix.singer = "";
    } else if (s.fromChannel) {
      why.push("singer is just the uploading channel");
      fix.singer = "";
    } else if (LABELISH.test(s.singer)) {
      why.push("singer looks like a label or channel");
      fix.singer = "";
    } else if (/\d/.test(s.singer)) {
      why.push("singer has digits in it");
      fix.singer = "";
    } else if (/^[A-Z\s]{4,}$/.test(s.singer)) {
      why.push("singer in capitals — often a channel name");
      fix.singer = "";
    }

    if (s.title.length > 45) {
      why.push(`title is long (${s.title.length} chars) — probably has the singer or label in it`);
      fix.title = s.title;
    } else if (TITLE_NOISE.test(s.title)) {
      why.push("title still has uploader padding (CG, viral, ||…)");
      fix.title = s.title.replace(TITLE_NOISE, " ").replace(/\s+/g, " ").trim();
    }
    if (singers.has(s.title.toLowerCase())) {
      why.push("title is a singer's name — the real title may have been lost");
      fix.title = "";
    }

    if (why.length) out.push({ id: s.id, title: s.title, singer: s.singer, why, fix });
  }
  return out;
}

/**
 * Songs that look like the same song: equal title skeletons once both are in
 * Latin letters, or one title being the start of the other ("ए मोर रंगोबती
 * गलारा बाई" and "A Mor Rongobati Galara Bai O De De Mola…"). Never merged
 * automatically — two uploads may be different recordings worth keeping.
 */
export function findDuplicates(songs) {
  const keyed = songs.map((s) => ({ s, words: skeleton(s.title).split(" ").filter(Boolean) }));
  const groups = [];
  const grouped = new Set();

  for (let i = 0; i < keyed.length; i++) {
    if (grouped.has(i)) continue;
    const group = [keyed[i].s];
    for (let j = i + 1; j < keyed.length; j++) {
      if (grouped.has(j)) continue;
      const [a, b] = [keyed[i].words, keyed[j].words];
      const [short, long] = a.length <= b.length ? [a, b] : [b, a];
      // Three words of agreement before calling it the same song: "Gorelal
      // Barman" alone is a singer, not a title.
      if (short.length < 3) continue;
      if (short.every((w, k) => w === long[k])) {
        group.push(keyed[j].s);
        grouped.add(j);
      }
    }
    if (group.length > 1) {
      grouped.add(i);
      groups.push(group);
    }
  }
  return groups;
}

// ─── Writing it up ───────────────────────────────────────────────────────────

const cell = (s) => String(s).replace(/\|/g, "\\|");
const link = (id) => `[${id}](https://youtu.be/${id})`;

export function renderReport({ songs, suspects, duplicates, dropped = [], unused = [] }) {
  const lines = [
    "# Song report",
    "",
    `Generated ${new Date().toISOString().slice(0, 10)} from ${songs.length} songs. ` +
      "Regenerate with `npm run song-report` (or any sync).",
    "",
    "Fixes go in `data/song-overrides.json`, never in `data/playlists.ts` — the sync",
    "overwrites that file, and re-applies the overrides every time. Each entry is",
    'keyed by video id: `{ "title": "", "singer": "", "mood": "", "lang": "", "hide": true }`,',
    "all optional. Fill in the blanks below and paste.",
    "",
  ];

  if (dropped.length) {
    lines.push(`## Dropped by the last sync (${dropped.length})`, "");
    lines.push("Not playable inside the site. Remove them from the YouTube playlist, or leave");
    lines.push("them — they are skipped either way.", "");
    lines.push("| Video | Title | Why |", "|---|---|---|");
    for (const d of dropped) lines.push(`| ${link(d.id)} | ${cell(d.title)} | ${d.why} |`);
    lines.push("");
  }

  lines.push(`## Possible duplicates (${duplicates.length})`, "");
  if (!duplicates.length) lines.push("None found.", "");
  duplicates.forEach((group, n) => {
    lines.push(`${n + 1}. ${group.map((s) => `${cell(s.title)} — ${cell(s.singer)} (${link(s.id)})`).join("\n   ")}`);
  });
  if (duplicates.length) {
    lines.push("", 'To keep only one, hide the others: `"<id>": { "hide": true }`.', "");
  }

  lines.push(`## Titles and singers to check (${suspects.length})`, "");
  if (!suspects.length) lines.push("Nothing flagged.", "");
  for (const s of suspects) {
    lines.push(`### ${cell(s.title)}`, "");
    lines.push(`${link(s.id)} · singer: **${cell(s.singer)}**`, "");
    for (const w of s.why) lines.push(`- ${w}`);
    lines.push("", "```json", `"${s.id}": ${JSON.stringify(s.fix)},`, "```", "");
  }

  if (unused.length) {
    lines.push(`## Overrides that matched no song (${unused.length})`, "");
    lines.push("The video is no longer in the playlist. Safe to delete these entries:", "");
    for (const id of unused) lines.push(`- ${link(id)}`);
    lines.push("");
  }

  return lines.join("\n");
}

export async function writeReport(input) {
  const suspects = findSuspects(input.songs);
  const duplicates = findDuplicates(input.songs);
  await writeFile(REPORT, renderReport({ ...input, suspects, duplicates }), "utf8");
  return { suspects: suspects.length, duplicates: duplicates.length };
}

// ─── Command line ────────────────────────────────────────────────────────────

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { songs, unused } = applyOverrides(await readCurrentSongs(), await loadOverrides());
  const counts = await writeReport({ songs, unused });
  console.log(
    `Checked ${songs.length} songs: ${counts.suspects} to check, ` +
      `${counts.duplicates} possible duplicate group(s). See data/song-report.md`
  );
}
