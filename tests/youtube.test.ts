import { describe, expect, it } from "vitest";
import { parseVideoId } from "@/lib/youtube";

describe("parseVideoId", () => {
  it.each([
    ["https://youtu.be/EHh-RNIrvYk", "EHh-RNIrvYk"],
    ["https://www.youtube.com/watch?v=EHh-RNIrvYk&t=10", "EHh-RNIrvYk"],
    ["https://www.youtube.com/embed/EHh-RNIrvYk", "EHh-RNIrvYk"],
    ["https://www.youtube.com/shorts/EHh-RNIrvYk", "EHh-RNIrvYk"],
    ["EHh-RNIrvYk", "EHh-RNIrvYk"],
    ["not a link", ""],
  ])("%s", (url, id) => {
    expect(parseVideoId(url)).toBe(id);
  });
});
