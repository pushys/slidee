import * as z from 'zod';

import { images, type ImageKeys } from '@/assets/images';
import { Game } from '@/game/game';

const statsEntrySchema = z.object({
  best: z.number(),
  average: z.number(),
  games: z.number(),
  images: z.array(z.enum(Object.keys(images) as ImageKeys[])).default([]),
});

export const statsSchema = z
  .partialRecord(z.enum(Game.BoardSize), statsEntrySchema)
  .default({});

export type StatsEntry = z.infer<typeof statsEntrySchema>;
export type Stats = z.infer<typeof statsSchema>;

export const DEFAULT_STATS = {} satisfies Stats;
