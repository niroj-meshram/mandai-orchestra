/**
 * Search that copes with the same song being written two ways — "पान वाला"
 * and "paan wala" — and with Hinglish spelling never agreeing with itself
 * ("ladki", "larki", "ladaki").
 *
 * Both sides go through the same two steps:
 *   1. Devanagari is transliterated to rough Latin.
 *   2. That is squeezed to a consonant skeleton: vowels go (except a word's
 *      first letter), aspirates and doubled letters collapse, and the usual
 *      Hinglish swaps (w/v, ph/f, z/j, q/k) are folded together.
 * The skeleton is lossy on purpose, so plain substring matches rank first.
 */

import { fold, skeleton } from "./transliterate.mjs";

export { fold, skeleton, transliterate } from "./transliterate.mjs";

export interface SearchIndex {
  plain: string;
  loose: string;
}

export function buildIndex(text: string): SearchIndex {
  // Both readings of ड़ go in, so either spelling of it finds the song.
  return {
    plain: `${fold(text)} | ${fold(text, "r")}`,
    loose: `${skeleton(text)} | ${skeleton(text, "r")}`,
  };
}

/**
 * 2 = every word matches as typed, 1 = some only match loosely, 0 = no match.
 * A word's skeleton must have two letters to be used: one letter would match
 * nearly everything.
 */
export function score(query: string, entry: SearchIndex): number {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (!words.length) return 2;

  let best = 2;
  for (const word of words) {
    if (entry.plain.includes(word)) continue;
    const key = skeleton(word);
    if (key.length >= 2 && entry.loose.includes(key)) best = 1;
    else return 0;
  }
  return best;
}
