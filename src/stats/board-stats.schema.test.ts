import { describe, expect, it } from 'vitest';

import { boardStatsSchema, type BoardStats } from './board-stats.schema';

describe('boardStatsSchema', () => {
  it('should return fully parsed and validated stats', () => {
    const data = {
      3: { best: 600, average: 700, games: 15, images: ['car'] },
      4: { best: 1200, average: 1300, games: 10, images: ['cat'] },
    } satisfies BoardStats;

    const result = boardStatsSchema.parse(data);

    expect(result).toStrictEqual(data);
  });

  it('should return only valid board stats entries', () => {
    const result = boardStatsSchema.parse({
      3: { best: '600', average: false, games: 0x23, images: 1 },
      4: { best: 1200, average: 1300, games: 10, images: ['cat'] },
    });

    expect(result).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: ['cat'] },
    } satisfies BoardStats);
  });

  it('should ignore non-existent board size stats entries', () => {
    const result = boardStatsSchema.parse({
      2: { best: 100, average: 120, games: 4, images: [] },
      4: { best: 1200, average: 1300, games: 10, images: ['cat'] },
      7: { best: 450, average: 500, games: 23, images: ['galaxy'] },
    });

    expect(result).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: ['cat'] },
    } satisfies BoardStats);
  });

  it("should substitute missing stats entry's values with default ones", () => {
    const result = boardStatsSchema.parse({
      4: { best: 1200, average: 1300, games: 10 },
    });

    expect(result).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: [] },
    } satisfies BoardStats);
  });

  it('should substitute invalid stats entry values with default ones', () => {
    const result = boardStatsSchema.parse({
      4: {
        best: 1200,
        average: 1300,
        games: 10,
        images: 'invalid_array',
      },
    });

    expect(result).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: [] },
    } satisfies BoardStats);
  });

  it('should try to keep valid image keys', () => {
    const result = boardStatsSchema.parse({
      4: {
        best: 1200,
        average: 1300,
        games: 10,
        images: ['building', 'invalid_image'],
      },
    });

    expect(result).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: ['building'] },
    } satisfies BoardStats);
  });
});
