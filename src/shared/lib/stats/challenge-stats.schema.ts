import * as z from 'zod';

import { timeLimitSchema } from '@/shared/lib/challenge-settings/time-limit.schema';
import { safePartialRecord } from '@/shared/utils/zod/safe-partial-record';

const challengeStatsEntrySchema = z.object({
  bestScore: z.number().catch(0),
});

export const challengeStatsSchema = safePartialRecord(
  timeLimitSchema,
  challengeStatsEntrySchema,
  Number,
);

export type ChallengeStatsEntry = z.infer<typeof challengeStatsEntrySchema>;
export type ChallengeStats = z.infer<typeof challengeStatsSchema>;

export const DEFAULT_CHALLENGE_STATS = challengeStatsSchema.parse({});
