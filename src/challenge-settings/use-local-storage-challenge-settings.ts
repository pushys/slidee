import useLocalStorageState from 'use-local-storage-state';

import {
  type ChallengeSettings,
  challengeSettingsSchema,
  DEFAULT_CHALLENGE_SETTINGS,
} from './challenge-settings.schema';
import { CHALLENGE_SETTINGS_STORAGE_KEY } from './constants';

/**
 * Low-level hook for accessing, validating and writing challenge settings data
 * to `localStorage`.
 */
export function useLocalStorageChallengeSettings() {
  return useLocalStorageState<ChallengeSettings>(
    CHALLENGE_SETTINGS_STORAGE_KEY,
    {
      defaultValue: DEFAULT_CHALLENGE_SETTINGS,
      serializer: {
        parse: (value) => challengeSettingsSchema.parse(JSON.parse(value)),
        stringify: JSON.stringify,
      },
    },
  );
}
