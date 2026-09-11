import * as z from 'zod';

export const TimeLimit = {
  Fast: 3,
  Standard: 5,
} as const;

export const timeLimitSchema = z.enum(TimeLimit);

export type TimeLimit = (typeof TimeLimit)[keyof typeof TimeLimit];
