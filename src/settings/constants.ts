import type { Settings } from './types';

export const DEFAULT_SETTINGS = {
  sound: true,
  boardSize: 4,
  confetti: true,
  animations: true,
  showNumbers: false,
  tileGap: true,
  image: null,
} satisfies Settings;
