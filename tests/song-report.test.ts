import { describe, expect, it } from "vitest";
import { applyOverrides, findDuplicates, findSuspects } from "../scripts/song-report.mjs";

const song = (id: string, title: string, singer = "Gorelal Barman", extra = {}) => ({
  id,
  title,
  singer,
  youtubeUrl: `https://youtu.be/${id}`,
  mood: "dhun",
  lang: "cg",
  ...extra,
});

describe("applyOverrides", () => {
  it("patches fields, hides songs and reports unused entries", () => {
    const { songs, unused } = applyOverrides(
      [song("a", "Old title"), song("b", "Hidden"), song("c", "Untouched")],
      { a: { title: "New title", singer: "" }, b: { hide: true }, gone: { title: "x" } }
    );
    expect(songs.map((s) => s.title)).toEqual(["New title", "Untouched"]);
    // An empty string is "not set", not "blank it out".
    expect(songs[0].singer).toBe("Gorelal Barman");
    expect(songs[0].overridden).toBe(true);
    expect(unused).toEqual(["gone"]);
  });
});

describe("findDuplicates", () => {
  it("matches the same song across scripts, even when one title runs on", () => {
    const groups = findDuplicates([
      song("a", "A Mor Rongobati Galara Bai O De De Mola Chume la Gorelal barman"),
      song("b", "ए मोर रंगोबती गलारा बाई"),
      song("c", "Turi Fataka O"),
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0].map((s) => s.id)).toEqual(["a", "b"]);
  });

  it("does not pair songs on two shared words", () => {
    expect(findDuplicates([song("a", "Turi Fataka O"), song("b", "Turi Fataka Wo Dance")])).toHaveLength(0);
  });
});

describe("findSuspects", () => {
  it("flags labels, channels and padded titles", () => {
    const flagged = findSuspects([
      song("a", "Fine Title", "T-Series"),
      song("b", "Fine Title", "Some Singer", { fromChannel: true }),
      song("c", "Paan Khai Lebe Mor Raja CG"),
      song("d", "Perfectly Good", "Santosh Thakrele"),
    ]);
    expect(flagged.map((s) => s.id)).toEqual(["a", "b", "c"]);
  });

  it("skips songs that already have an override", () => {
    expect(findSuspects([song("a", "Fine", "T-Series", { overridden: true })])).toHaveLength(0);
  });
});
