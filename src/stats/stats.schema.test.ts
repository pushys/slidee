import { describe, expect, it } from 'vitest';

import { statsSchema, DEFAULT_STATS } from './stats.schema';

describe('statsSchema', () => {
  it('should substitute missing values with default ones', () => {
    const result = statsSchema.parse({});

    expect(result).toStrictEqual(DEFAULT_STATS);
  });

  it('should substitute invalid values with default ones', () => {
    const result1 = statsSchema.parse({
      board: 'invalid_object',
      challenge: { bestScore: 1 },
    });
    const result2 = statsSchema.parse({
      board: { 4: { best: 1200, average: 1300, games: 10, images: ['cat'] } },
      challenge: 'invalid_object',
    });

    expect(result1).toStrictEqual({
      board: DEFAULT_STATS['board'],
      challenge: { bestScore: 1 },
    });
    expect(result2).toStrictEqual({
      board: { 4: { best: 1200, average: 1300, games: 10, images: ['cat'] } },
      challenge: DEFAULT_STATS['challenge'],
    });
  });
});
