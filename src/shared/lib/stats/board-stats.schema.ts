import * as z from 'zod';

import { imageKeySchema, imageKeys } from '@/assets/images';
import { Game } from '@/shared/lib/game/game';
import { safePartialRecord } from '@/shared/utils/zod/safe-partial-record';

const boardStatsEntrySchema = z.object({
  best: z.number(),
  average: z.number(),
  games: z.number(),
  images: z.array(imageKeySchema).catch((ctx) => {
    if (!Array.isArray(ctx.value)) return [];

    // In case some image keys aren't valid we at least try to save some that are.
    return ctx.value.filter((i) => imageKeys.includes(i));
  }),
});

export const boardStatsSchema = safePartialRecord(
  z.enum(Game.BoardSize),
  boardStatsEntrySchema,
  Number,
);

export type BoardStatsEntry = z.infer<typeof boardStatsEntrySchema>;
export type BoardStats = z.infer<typeof boardStatsSchema>;

export const DEFAULT_BOARD_STATS = boardStatsSchema.parse({});
