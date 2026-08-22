import { useMemo, type Dispatch, type SetStateAction } from 'react';
import { useLocalstorageState } from 'rooks';

import { STORAGE_PREFIX } from '@/shared/constants';

import type { Settings } from './types';

import { DEFAULT_SETTINGS } from './constants';

export function useSettings(): [Settings, Dispatch<SetStateAction<Settings>>] {
  const [settings, setSettings] = useLocalstorageState<Settings>(
    `${STORAGE_PREFIX}.settings`,
    DEFAULT_SETTINGS,
  );

  // Merge user settings with default ones in case the browser
  // version doesn't contain some newly added properties.
  const safeSettings = useMemo(
    () => ({ ...DEFAULT_SETTINGS, ...settings }),
    [settings],
  );

  return [safeSettings, setSettings];
}
