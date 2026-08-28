import useLocalStorageState from 'use-local-storage-state';

import { SETTINGS_STORAGE_KEY } from './constants';
import {
  type Settings,
  settingsSchema,
  DEFAULT_SETTINGS,
} from './settings.schema';

/**
 * Low-level hook for accessing, validating and writing settings data to
 * `localStorage`.
 */
export function useLocalStorageSettings() {
  return useLocalStorageState<Settings>(SETTINGS_STORAGE_KEY, {
    defaultValue: DEFAULT_SETTINGS,
    serializer: {
      parse: (value) => settingsSchema.parse(JSON.parse(value)),
      stringify: JSON.stringify,
    },
  });
}
