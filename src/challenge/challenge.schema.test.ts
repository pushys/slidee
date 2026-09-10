import { describe, expect, it } from 'vitest';

import { DEFAULT_CHALLENGE_SETTINGS } from '@/challenge-settings/challenge-settings.schema';

import type { Challenge } from './challenge.schema';

import { challengeSchema } from './challenge.schema';

describe('challengeSchema', () => {
  it('should successfully parse and validate challenge data', () => {
    const data = {
      settings: DEFAULT_CHALLENGE_SETTINGS,
      status: 'active',
      score: 23,
      bestScore: 0,
      endTime: Date.now() + 1000 * 60,
    } satisfies Challenge;

    const result = challengeSchema.safeParse(data);

    expect(result.data).toStrictEqual(data);
  });

  it('should fail challenge data parse', () => {
    const result = challengeSchema.safeParse(['corrupt data']);

    expect(result.data).toStrictEqual(undefined);
  });
});
