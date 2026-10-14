import { shuffled } from "@/lib/utils";

/**
 * Play order, kept free of React so it can be tested on its own. The radio
 * hook holds the state; these decide what comes next.
 */

/** The current song first, then the rest of the programme in random order. */
export function shuffleOrder(
  count: number,
  first: number,
  rand: () => number = Math.random
): number[] {
  const rest = Array.from({ length: count }, (_, i) => i).filter((i) => i !== first);
  return [first, ...shuffled(rest, rand)];
}

/**
 * The index `delta` steps from `from`, following `order` (or programme order
 * when it is null), wrapping at either end and stepping over songs `isDead`
 * rejects. Returns `from` when every song is dead.
 */
export function stepIndex({
  order,
  count,
  from,
  delta,
  isDead = () => false,
}: {
  order: number[] | null;
  count: number;
  from: number;
  delta: number;
  isDead?: (index: number) => boolean;
}): number {
  const seq = order ?? Array.from({ length: count }, (_, i) => i);
  if (!seq.length) return from;
  let pos = seq.indexOf(from);
  if (pos === -1) pos = 0;
  for (let tries = 0; tries < seq.length; tries++) {
    pos = (((pos + delta) % seq.length) + seq.length) % seq.length;
    if (!isDead(seq[pos])) return seq[pos];
  }
  return from;
}
