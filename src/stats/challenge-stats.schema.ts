import * as z from 'zod';

export const challengeStatsSchema = z.object({
  bestScore: z.number().catch(0),
});

export type ChallengeStats = z.infer<typeof challengeStatsSchema>;

export const DEFAULT_CHALLENGE_STATS = challengeStatsSchema.parse({});
