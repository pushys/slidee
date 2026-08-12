import { useLocalstorageState } from 'rooks';

import { STORAGE_PREFIX } from '@/shared/constants';

import type { Stats } from './types';

export function useStats() {
  return useLocalstorageState<Stats>(`${STORAGE_PREFIX}.stats`, {});
}
