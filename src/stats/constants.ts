import type { StatsEntry } from './types';

export const DEFAULT_STATS_ENTRY = {
  best: 0,
  average: 0,
  games: 0,
  images: [],
} satisfies StatsEntry;
