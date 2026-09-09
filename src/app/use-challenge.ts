import { useState, useMemo, useCallback } from 'react';
import { useIntervalWhen } from 'rooks';

import type { ChallengeSettings } from '@/challenge-settings/challenge-settings.schema';
import type { ImageMetadata } from '@/shared/types';

import { images } from '@/assets/images';
import { useLocalStorageChallengeSettings } from '@/challenge-settings/use-local-storage-challenge-settings';
import { type Challenge, ChallengeStatus } from '@/challenge/challenge.schema';
import { useLocalStorageChallenge } from '@/challenge/use-local-storage-challenge';

export function useChallenge(): useChallenge.ReturnValue {
  const [, setSettings] = useLocalStorageChallengeSettings();
  const [challenge, setChallenge] = useLocalStorageChallenge();

  const [now, setNow] = useState(() => Date.now());

  const current = useMemo<useChallenge.Current | null>(() => {
    if (!challenge) return null;

    const { endTime, ...rest } = challenge;
    const { image, timeLimit } = challenge.settings;

    // If challenge was just created and we don't have end time yet use a placeholder.
    let timeLeft = timeLimit * 60 * 1000;
    if (endTime) {
      timeLeft = endTime - now;
    }

    return {
      ...rest,
      timeLeft: timeLeft < 0 ? 0 : timeLeft,
      imageMetadata: image ? images[image] : undefined,
    };
  }, [challenge, now]);

  const create = useCallback(
    (settings: ChallengeSettings) => {
      if (current) return;

      // Save new settings for the next challenge.
      setSettings(settings);

      // Put new challenge into storage but don't start yet.
      setChallenge({
        settings,
        status: ChallengeStatus.Countdown,
        score: 0,
        endTime: null,
      });
    },
    [current, setSettings, setChallenge],
  );

  const start = useCallback(() => {
    const now = Date.now();

    setNow(now);
    setChallenge((prev) => {
      if (!prev || prev.status === ChallengeStatus.Active) {
        return prev;
      }
      return {
        ...prev,
        status: ChallengeStatus.Active,
        endTime: now + prev.settings.timeLimit * 60 * 1000,
      };
    });
  }, [setChallenge]);

  const increaseScore = useCallback(() => {
    setChallenge((prev) => {
      if (!prev) return null;
      return { ...prev, score: prev.score + 1 };
    });
  }, [setChallenge]);

  const end = useCallback(() => {
    setChallenge(null);
  }, [setChallenge]);

  const hasCurrent = current !== null;

  useIntervalWhen(
    () => setNow(Date.now()),
    1000,
    hasCurrent &&
      current.status === ChallengeStatus.Active &&
      current.timeLeft > 0,
    true,
  );

  return useMemo(
    () => ({
      current,
      hasCurrent,
      create,
      start,
      increaseScore,
      end,
    }),
    [current, hasCurrent, create, start, increaseScore, end],
  );
}

export namespace useChallenge {
  export type Status = 'countdown' | 'active';

  export interface Current extends Omit<Challenge, 'endTime'> {
    timeLeft: number;
    imageMetadata: ImageMetadata | undefined;
  }

  export interface ReturnValue {
    /**
     * Current challenge.
     */
    current: Current | null;
    /**
     * Whether there is a current challenge.
     */
    hasCurrent: boolean;
    /**
     * Creates a new challenge, saved into storage but doesn't start.
     */
    create: (settings: ChallengeSettings) => void;
    /**
     * Starts the created challenge.
     */
    start: () => void;
    /**
     * Increases score by 1.
     */
    increaseScore: () => void;
    /**
     * Ends current challenge.
     */
    end: () => void;
  }
}
