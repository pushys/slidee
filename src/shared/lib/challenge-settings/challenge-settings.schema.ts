import * as z from 'zod';

import { images, type ImageKey } from '@/assets/images';

import { TimeLimit, timeLimitSchema } from './time-limit.schema';

export const challengeSettingsSchema = z.object({
  timeLimit: timeLimitSchema.catch(TimeLimit.Fast),
  showNumbers: z.boolean().catch(true),
  image: z
    .enum(Object.keys(images) as ImageKey[])
    .nullable()
    .catch(null),
});

export type ChallengeSettings = z.infer<typeof challengeSettingsSchema>;

export const DEFAULT_CHALLENGE_SETTINGS = challengeSettingsSchema.parse({});
