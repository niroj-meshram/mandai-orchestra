/**
 * Devanagari → Latin folding, shared by the site search (lib/search.ts) and
 * the playlist tooling in scripts/, which spots the same song uploaded once in
 * each script. Plain JavaScript so the Node scripts can import it as is.
 */

const VOWELS = {
  अ: "a", आ: "aa", इ: "i", ई: "ee", उ: "u", ऊ: "oo", ऋ: "ri",
  ए: "e", ऐ: "ai", ओ: "o", औ: "au", ऑ: "o",
};

const MATRAS = {
  "ा": "aa", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo", "ृ": "ri",
  "े": "e", "ै": "ai", "ो": "o", "ौ": "au", "ॉ": "o",
};

const CONSONANTS = {
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
const SIGNS = { "ं": "n", "ँ": "n", "ः": "h" };

/**
 * @param {string} text
 * @param {"d" | "r"} [flap]
 * @returns {string}
 *
 * Devanagari → rough Latin. Anything else passes through untouched.
 * `flap` picks how ड़ / ढ़ come out.
 */
export function transliterate(text, flap = "d") {
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

/**
 * Lower-cased Latin with accents dropped.
 * @param {string} text
 * @param {"d" | "r"} [flap]
 * @returns {string}
 */
export function fold(text, flap = "d") {
  return transliterate(text, flap)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/**
 * The loose key: one consonant skeleton per word, space-separated.
 * @param {string} text
 * @param {"d" | "r"} [flap]
 * @returns {string}
 */
export function skeleton(text, flap = "d") {
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
