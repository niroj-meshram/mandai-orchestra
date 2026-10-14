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

const VOWELS: Record<string, string> = {
  अ: "a", आ: "aa", इ: "i", ई: "ee", उ: "u", ऊ: "oo", ऋ: "ri",
  ए: "e", ऐ: "ai", ओ: "o", औ: "au", ऑ: "o",
};

const MATRAS: Record<string, string> = {
  "ा": "aa", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo", "ृ": "ri",
  "े": "e", "ै": "ai", "ो": "o", "ौ": "au", "ॉ": "o",
};

const CONSONANTS: Record<string, string> = {
  क: "k", ख: "kh", ग: "g", घ: "gh", ङ: "n",
  च: "ch", छ: "chh", ज: "j", झ: "jh", ञ: "n",
  ट: "t", ठ: "th", ड: "d", ढ: "dh", ण: "n",
  त: "t", थ: "th", द: "d", ध: "dh", न: "n",
  प: "p", फ: "ph", ब: "b", भ: "bh", म: "m",
  य: "y", र: "r", ल: "l", व: "v",
  श: "sh", ष: "sh", स: "s", ह: "h",
  क़: "q", ख़: "kh", ग़: "g", ज़: "z", फ़: "f", ड़: "d", ढ़: "dh",
};

/** ड़ and ढ़ are written "d" and "r" about equally often ("ladki", "larki"). */
const FLAPS = new Set(["ड़", "ढ़"]);

const NUKTA = "़";
const VIRAMA = "्";
const SIGNS: Record<string, string> = { "ं": "n", "ँ": "n", "ः": "h" };

/**
 * Devanagari → rough Latin. Anything else passes through untouched.
 * `flap` picks how ड़ / ढ़ come out.
 */
export function transliterate(text: string, flap: "d" | "r" = "d"): string {
  // Fold "क" + nukta into the precomposed letter so one lookup covers both.
  const chars = [...text.normalize("NFC")];
  let out = "";

  for (let i = 0; i < chars.length; i++) {
    let ch = chars[i];
    if (chars[i + 1] === NUKTA && CONSONANTS[ch + NUKTA]) ch += chars[++i];
    else if (chars[i + 1] === NUKTA) i++;

    if (CONSONANTS[ch]) {
      out += FLAPS.has(ch) && flap === "r" ? "r" : CONSONANTS[ch];
      const next = chars[i + 1];
      // A consonant carries an "a" unless a vowel sign or virama replaces it.
      // The skeleton drops vowels anyway, so no schwa-deletion rules needed.
      if (next === VIRAMA) i++;
      else if (!MATRAS[next]) out += "a";
    } else if (MATRAS[ch]) out += MATRAS[ch];
    else if (VOWELS[ch]) out += VOWELS[ch];
    else if (SIGNS[ch]) out += SIGNS[ch];
    else out += ch;
  }
  return out;
}

/** Lower-cased Latin with accents dropped. */
export function fold(text: string, flap: "d" | "r" = "d"): string {
  return transliterate(text, flap)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** The loose key: one consonant skeleton per word, space-separated. */
export function skeleton(text: string, flap: "d" | "r" = "d"): string {
  return fold(text, flap)
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/ph/g, "f")
    .replace(/w/g, "v")
    .replace(/z/g, "j")
    .replace(/q/g, "k")
    .replace(/x/g, "ks")
    .replace(/([bcdgjkpst])h/g, "$1")
    .split(/\s+/)
    .map((word) =>
      word
        // Doubled letters first, so "babu" stays "bb" but "chatta" is "ct".
        .replace(/(.)\1+/g, "$1")
        // A leading vowel is kept as a marker, so "ek" is not just "k".
        .replace(/^[aeiouy]+/, (v) => (v === "y" ? "y" : "a"))
        .replace(/(?!^)[aeiouy]/g, "")
    )
    .filter(Boolean)
    .join(" ");
}

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
