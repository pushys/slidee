import { useLocalstorageState } from 'rooks';

import { STORAGE_PREFIX } from '@/shared/constants';

import type { Settings } from './types';

import { DEFAULT_SETTINGS } from './constants';

export function useSettings() {
  const [settings, setSettings] = useLocalstorageState<Settings>(
    `${STORAGE_PREFIX}.settings`,
    DEFAULT_SETTINGS,
  );

  // Merge user settings with default ones in case the browser
  // version doesn't contain some newly added properties.
  return [{ ...DEFAULT_SETTINGS, ...settings }, setSettings] as const;
}
