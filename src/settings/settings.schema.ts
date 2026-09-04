import * as z from 'zod';

import { images, type ImageKeys } from '@/assets/images';
import { Game } from '@/game/game';

export const settingsSchema = z.object({
  sound: z.boolean().catch(true),
  boardSize: z.enum(Game.BoardSize).catch(Game.DEFAULT_BOARD_SIZE),
  confetti: z.boolean().catch(true),
  animations: z.boolean().catch(true),
  showNumbers: z.boolean().catch(true),
  image: z
    .enum(Object.keys(images) as ImageKeys[])
    .nullable()
    .catch(null),
});

export type Settings = z.infer<typeof settingsSchema>;

export const DEFAULT_SETTINGS = settingsSchema.parse({});
