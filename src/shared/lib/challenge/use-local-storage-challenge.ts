import useLocalStorageState from 'use-local-storage-state';

import { type Challenge, challengeSchema } from './challenge.schema';
import { CHALLENGE_STORAGE_KEY } from './constants';

/**
 * Low-level hook for accessing, validating and writing challenge data to
 * `localStorage`.
 */
export function useLocalStorageChallenge() {
  return useLocalStorageState<Challenge | null>(CHALLENGE_STORAGE_KEY, {
    defaultValue: null,
    serializer: {
      parse: (value) => challengeSchema.parse(JSON.parse(value)),
      stringify: JSON.stringify,
    },
  });
}
