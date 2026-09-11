import * as z from 'zod';

import { boardStatsSchema, DEFAULT_BOARD_STATS } from './board-stats.schema';
import {
  challengeStatsSchema,
  DEFAULT_CHALLENGE_STATS,
} from './challenge-stats.schema';

export const statsSchema = z.object({
  board: boardStatsSchema.catch(DEFAULT_BOARD_STATS),
  challenge: challengeStatsSchema.catch(DEFAULT_CHALLENGE_STATS),
});

export type Stats = z.infer<typeof statsSchema>;

export const DEFAULT_STATS = statsSchema.parse({});
