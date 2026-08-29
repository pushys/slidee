import * as z from 'zod';

import { images, type ImageKeys } from '@/assets/images';
import { Game } from '@/game/game';

export const settingsSchema = z.object({
  sound: z.boolean().default(true),
  boardSize: z.enum(Game.BoardSize).default(Game.DEFAULT_BOARD_SIZE),
  confetti: z.boolean().default(true),
  animations: z.boolean().default(true),
  showNumbers: z.boolean().default(true),
  image: z
    .enum(Object.keys(images) as ImageKeys[])
    .nullable()
    .default(null),
});

export type Settings = z.infer<typeof settingsSchema>;

export const DEFAULT_SETTINGS = settingsSchema.parse({});
