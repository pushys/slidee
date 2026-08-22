import { mapValues } from 'es-toolkit/object';
import { useMemo, type Dispatch, type SetStateAction } from 'react';
import { useLocalstorageState } from 'rooks';

import { STORAGE_PREFIX } from '@/shared/constants';

import type { Stats } from './types';

import { DEFAULT_STATS_ENTRY } from './constants';

export function useStats(): [Stats, Dispatch<SetStateAction<Stats>>] {
  const [stats, setStats] = useLocalstorageState<Stats>(
    `${STORAGE_PREFIX}.stats`,
    {},
  );

  // Merge stats entries with some default values in case future
  // versions of the game introduce some new properties which
  // would be missing on already saved data in the storage.
  const safeStats = useMemo<Stats>(
    () => mapValues(stats, (value) => ({ ...DEFAULT_STATS_ENTRY, ...value })),
    [stats],
  );

  return [safeStats, setStats];
}
