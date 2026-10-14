import { describe, expect, it } from "vitest";
import { shuffleOrder, stepIndex } from "@/lib/queue";
import { mulberry32 } from "@/lib/utils";

describe("stepIndex", () => {
  it("walks programme order and wraps at both ends", () => {
    expect(stepIndex({ order: null, count: 4, from: 1, delta: 1 })).toBe(2);
    expect(stepIndex({ order: null, count: 4, from: 3, delta: 1 })).toBe(0);
    expect(stepIndex({ order: null, count: 4, from: 0, delta: -1 })).toBe(3);
  });

  it("follows a shuffled order", () => {
    const order = [2, 0, 3, 1];
    expect(stepIndex({ order, count: 4, from: 2, delta: 1 })).toBe(0);
    expect(stepIndex({ order, count: 4, from: 1, delta: 1 })).toBe(2);
    expect(stepIndex({ order, count: 4, from: 2, delta: -1 })).toBe(1);
  });

  it("steps over dead videos", () => {
    const dead = new Set([1, 2]);
    expect(stepIndex({ order: null, count: 4, from: 0, delta: 1, isDead: (i) => dead.has(i) })).toBe(3);
    expect(stepIndex({ order: null, count: 4, from: 3, delta: -1, isDead: (i) => dead.has(i) })).toBe(0);
  });

  it("stays put when every song is dead", () => {
    expect(stepIndex({ order: null, count: 3, from: 1, delta: 1, isDead: () => true })).toBe(1);
  });

  it("copes with an empty programme", () => {
    expect(stepIndex({ order: null, count: 0, from: 0, delta: 1 })).toBe(0);
  });
});

describe("shuffleOrder", () => {
  it("starts with the current song and contains every song once", () => {
    const order = shuffleOrder(10, 4, mulberry32(1));
    expect(order[0]).toBe(4);
    expect([...order].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("actually shuffles", () => {
    const order = shuffleOrder(10, 0, mulberry32(7));
    expect(order).not.toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
