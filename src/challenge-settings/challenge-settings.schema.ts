import * as z from 'zod';

import { images, type ImageKeys } from '@/assets/images';

export const TimeLimit = {
  Fast: 3,
  Medium: 5,
  Slow: 7,
} as const;

export const challengeSettingsSchema = z.object({
  timeLimit: z.enum(TimeLimit).catch(TimeLimit.Fast),
  showNumbers: z.boolean().catch(true),
  image: z
    .enum(Object.keys(images) as ImageKeys[])
    .nullable()
    .catch(null),
});

export type TimeLimit = (typeof TimeLimit)[keyof typeof TimeLimit];
export type ChallengeSettings = z.infer<typeof challengeSettingsSchema>;

export const DEFAULT_CHALLENGE_SETTINGS = challengeSettingsSchema.parse({});
