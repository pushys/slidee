import { isPlainObject } from 'es-toolkit';
import * as z from 'zod';

import { images, type ImageKeys } from '@/assets/images';
import { Game } from '@/shared/lib/game/game';

const imageKeys = Object.keys(images) as ImageKeys[];

const boardSizeSchema = z.enum(Game.BoardSize);

const boardStatsEntrySchema = z.object({
  best: z.number(),
  average: z.number(),
  games: z.number(),
  images: z.array(z.enum(Object.keys(images) as ImageKeys[])).catch((ctx) => {
    if (!Array.isArray(ctx.value)) return [];

    // In case some image keys aren't valid we at least try to save some that are.
    return ctx.value.filter((i) => imageKeys.includes(i));
  }),
});

export const boardStatsSchema = z.custom<unknown>().transform((data, ctx) => {
  if (!isPlainObject(data)) {
    ctx.addIssue('Invalid data');
    return z.NEVER;
  }

  const result: Partial<Record<Game.BoardSize, BoardStatsEntry>> = {};

  for (const [key, value] of Object.entries(data)) {
    const boardSize = boardSizeSchema.safeParse(Number(key));

    if (!boardSize.success) continue;

    const entry = boardStatsEntrySchema.safeParse(value);

    if (entry.success) {
      result[boardSize.data] = entry.data;
    }
  }

  return result;
});

export type BoardStatsEntry = z.infer<typeof boardStatsEntrySchema>;
export type BoardStats = z.infer<typeof boardStatsSchema>;

export const DEFAULT_BOARD_STATS = boardStatsSchema.parse({});
