import { describe, expect, it } from 'vitest';

import { challengeStatsSchema } from './challenge-stats.schema';

describe('challengeStatsSchema', () => {
  it('should substitute missing values with default ones', () => {
    const result = challengeStatsSchema.parse({ 3: {} });

    expect(result).toStrictEqual({ 3: { bestScore: 0 } });
  });

  it('should substitute invalid values with default ones', () => {
    const result = challengeStatsSchema.parse({
      3: { bestScore: false },
    });

    expect(result).toStrictEqual({ 3: { bestScore: 0 } });
  });

  it('should ignore entries with an invalid time limit', () => {
    const result = challengeStatsSchema.parse({
      3: { bestScore: 0 },
      5: { bestScore: 0 },
      50: { bestScore: 0 },
    });

    expect(result).toStrictEqual({ 3: { bestScore: 0 }, 5: { bestScore: 0 } });
  });

  it('should successfully parse and validate data', () => {
    const result = challengeStatsSchema.parse({
      3: { bestScore: 4 },
    });

    expect(result).toStrictEqual({ 3: { bestScore: 4 } });
  });
});
