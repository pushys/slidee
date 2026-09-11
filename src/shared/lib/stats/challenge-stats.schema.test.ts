import { describe, expect, it } from 'vitest';

import { challengeStatsSchema } from './challenge-stats.schema';

describe('challengeStatsSchema', () => {
  it('should substitute missing values with default ones', () => {
    const result = challengeStatsSchema.parse({});

    expect(result).toStrictEqual({ bestScore: 0 });
  });

  it('should substitute invalid values with default ones', () => {
    const result = challengeStatsSchema.parse({ bestScore: false });

    expect(result).toStrictEqual({ bestScore: 0 });
  });

  it('should successfully parse and validate stats', () => {
    const result = challengeStatsSchema.parse({ bestScore: 4 });

    expect(result).toStrictEqual({ bestScore: 4 });
  });
});
