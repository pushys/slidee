import * as z from 'zod';

import { challengeSettingsSchema } from '@/shared/lib/challenge-settings/challenge-settings.schema';

export const ChallengeStatus = {
  Countdown: 'countdown',
  Active: 'active',
} as const;

export const challengeSchema = z.object({
  settings: challengeSettingsSchema,
  status: z.enum(ChallengeStatus),
  score: z.number().min(0),
  bestScore: z.number().min(0),
  endTime: z.number().min(0).nullable(),
});

export type Challenge = z.infer<typeof challengeSchema>;
export type ChallengeStatus =
  (typeof ChallengeStatus)[keyof typeof ChallengeStatus];
