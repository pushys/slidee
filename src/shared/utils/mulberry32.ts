/**
 * A fast, seedable, pseudo-random number generator. This is useful in situation
 * the you need to generate random numbers or a list of random numbers, but you
 * want to generate the same ones every time.
 *
 * @param seed
 * @returns
 */
export function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
