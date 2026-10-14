import { describe, expect, it } from "vitest";
import { buildIndex, score } from "@/lib/search";
import { skeleton, transliterate } from "@/lib/transliterate.mjs";

/** Does `query` find a song whose searchable text is `haystack`? */
const finds = (query: string, haystack: string) => score(query, buildIndex(haystack)) > 0;

describe("transliterate", () => {
  it("writes Devanagari in rough Latin", () => {
    expect(transliterate("पान वाला")).toBe("paana vaalaa");
    expect(transliterate("नीबू चाट")).toBe("neeboo chaata");
  });

  it("handles conjuncts, nukta and anusvara", () => {
    expect(transliterate("बम्बई")).toBe("bambaee");
    expect(transliterate("लड़की")).toBe("ladakee");
    expect(transliterate("लड़की", "r")).toBe("larakee");
    expect(transliterate("रंग")).toBe("ranga");
  });

  it("leaves Latin alone", () => {
    expect(transliterate("Gorelal Barman")).toBe("Gorelal Barman");
  });
});

describe("skeleton", () => {
  it("gives the same key for both scripts and common spellings", () => {
    expect(skeleton("बम्बई वाली लड़की")).toBe(skeleton("Bambai Wali Ladki"));
    expect(skeleton("paan")).toBe(skeleton("pan"));
    expect(skeleton("paan")).toBe(skeleton("पान"));
  });

  it("treats doubled letters as single", () => {
    expect(skeleton("chatta")).toBe(skeleton("chata"));
    expect(skeleton("Pattel")).toBe(skeleton("Patel"));
  });

  it("keeps a word's leading vowel so short words do not vanish", () => {
    expect(skeleton("ek")).toBe("ak");
  });
});

describe("search", () => {
  it("finds Hindi titles from English spellings", () => {
    expect(finds("paan wala", "ये पान वाला बाबू")).toBe(true);
    expect(finds("pan wala babu", "ये पान वाला बाबू")).toBe(true);
    expect(finds("garmi ke din", "गर्मी के दिन माँ पीपर तरी")).toBe(true);
    expect(finds("tadpela", "तड़पेला मोरा चढल जवानी")).toBe(true);
  });

  it("accepts both d and r for ड़", () => {
    expect(finds("ladki", "बम्बई वाली लड़की")).toBe(true);
    expect(finds("larki", "बम्बई वाली लड़की")).toBe(true);
  });

  it("finds English titles from Hindi", () => {
    expect(finds("गोरेलाल", "Turi Fataka O Gorelal Barman")).toBe(true);
  });

  it("needs every word to match", () => {
    expect(finds("gorelal pawan", "Turi Fataka O Gorelal Barman")).toBe(false);
  });

  it("ranks exact matches above loose ones", () => {
    expect(score("gorelal", buildIndex("Gorelal Barman"))).toBe(2);
    expect(score("गोरेलाल", buildIndex("Gorelal Barman"))).toBe(1);
  });

  it("does not let one-letter skeletons match everything", () => {
    expect(finds("ye", "Turi Fataka O")).toBe(false);
  });

  it("treats an empty query as matching everything", () => {
    expect(score("   ", buildIndex("anything"))).toBe(2);
  });
});
