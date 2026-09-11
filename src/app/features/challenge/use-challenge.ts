import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useEffectEvent,
} from 'react';
import { useIntervalWhen } from 'rooks';

import type { ChallengeSettings } from '@/shared/lib/challenge-settings/challenge-settings.schema';
import type { TimeLimit } from '@/shared/lib/challenge-settings/time-limit.schema';
import type { ImageMetadata } from '@/shared/types';

import { images } from '@/assets/images';
import { useLocalStorageChallengeSettings } from '@/shared/lib/challenge-settings/use-local-storage-challenge-settings';
import {
  type Challenge,
  ChallengeStatus,
} from '@/shared/lib/challenge/challenge.schema';
import { useLocalStorageChallenge } from '@/shared/lib/challenge/use-local-storage-challenge';

export function useChallenge(
  props: useChallenge.Props = {},
): useChallenge.ReturnValue {
  const { onFinish } = props;

  const [, setSettings] = useLocalStorageChallengeSettings();
  const [challenge, setChallenge] = useLocalStorageChallenge();

  const [now, setNow] = useState(() => Date.now());
  const [result, setResult] = useState<useChallenge.Result | null>(null);

  const current = useMemo<useChallenge.Current | null>(() => {
    if (!challenge) return null;

    const { endTime, ...rest } = challenge;
    const { image, timeLimit } = challenge.settings;

    // If challenge was just created we don't have end time yet so use a placeholder.
    const timeLeft = endTime ? endTime - now : timeLimit * 60 * 1000;
    const timeLeftInSeconds = Math.floor(timeLeft / 1000);

    return {
      ...rest,
      timeLeft: Math.max(timeLeft, 0),
      timeLeftInSeconds: Math.max(timeLeftInSeconds, 0),
      imageMetadata: image ? images[image] : undefined,
    };
  }, [challenge, now]);

  const create = useCallback(
    (settings: ChallengeSettings, bestScore = 0) => {
      if (current) return;

      setResult(null);

      // Save new settings in storage for the next challenge.
      setSettings(settings);

      // Save new challenge into storage but don't start yet.
      setChallenge({
        settings,
        status: ChallengeStatus.Countdown,
        score: 0,
        bestScore,
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
      if (!prev || prev.status !== ChallengeStatus.Active) {
        return prev;
      }
      return { ...prev, score: prev.score + 1 };
    });
  }, [setChallenge]);

  const quit = useCallback(() => {
    setChallenge(null);
  }, [setChallenge]);

  const hasCurrent = current !== null;
  const isActive = current?.status === ChallengeStatus.Active;

  useIntervalWhen(
    () => setNow(Date.now()),
    1000,
    hasCurrent && isActive && current.timeLeftInSeconds > 0,
    true,
  );

  const finish = useEffectEvent(() => {
    if (!current) return;

    const result = {
      timeLimit: current.settings.timeLimit,
      score: current.score,
      bestScore: current.bestScore,
      isNewBest: current.score > current.bestScore,
    } satisfies useChallenge.Result;

    onFinish?.(result);
    setResult(result);
    quit();
  });

  useEffect(() => {
    if (!isActive || current?.timeLeftInSeconds !== 0) return;

    // eslint-disable-next-line react/set-state-in-effect
    finish();
  }, [isActive, current?.timeLeftInSeconds]);

  return useMemo(
    () => ({
      current,
      hasCurrent,
      result,
      create,
      start,
      increaseScore,
      quit,
    }),
    [current, hasCurrent, result, create, start, increaseScore, quit],
  );
}

export namespace useChallenge {
  export type Status = 'countdown' | 'active';

  export interface Current extends Omit<Challenge, 'endTime'> {
    timeLeft: number;
    timeLeftInSeconds: number;
    imageMetadata: ImageMetadata | undefined;
  }

  export interface Result {
    timeLimit: TimeLimit;
    score: number;
    bestScore: number;
    isNewBest: boolean;
  }

  export interface Props {
    /**
     * Called when active challenge reaches zero time left.
     */
    onFinish?: (result: Result) => void;
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
     * Challenge result.
     */
    result: Result | null;
    /**
     * Creates a new challenge, saves into storage but doesn't start.
     */
    create: (settings: ChallengeSettings, bestScore?: number) => void;
    /**
     * Starts the created challenge.
     */
    start: () => void;
    /**
     * Increases score by 1.
     */
    increaseScore: () => void;
    /**
     * Quits current challenge.
     */
    quit: () => void;
  }
}
