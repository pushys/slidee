import useLocalStorageState from 'use-local-storage-state';

import { STATS_STORAGE_KEY } from './constants';
import { type Stats, statsSchema, DEFAULT_STATS } from './stats.schema';

/**
 * Low-level hook for accessing, validating and writing statistics data to
 * `localStorage`.
 */
export function useLocalStorageStats() {
  return useLocalStorageState<Stats>(STATS_STORAGE_KEY, {
    defaultValue: DEFAULT_STATS,
    serializer: {
      parse: (value) => statsSchema.parse(JSON.parse(value)),
      stringify: JSON.stringify,
    },
  });
}
