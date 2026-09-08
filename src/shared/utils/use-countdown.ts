import { useState } from 'react';
import { useDidMount, useDidUpdate, useIntervalWhen } from 'rooks';

const COUNTDOWN_SECONDS = 3;
const INTERVAL_MS = 1_100;

export function useCountdown(props: useCountdown.Props): number | null {
  const { onStart, onTick, onComplete, enabled = true } = props;

  const [countdown, setCountdown] = useState<number | null>(
    enabled ? COUNTDOWN_SECONDS : null,
  );

  useDidMount(() => {
    if (enabled) onStart?.();
  });

  useDidUpdate(() => {
    if (enabled) {
      onStart?.();
      setCountdown(COUNTDOWN_SECONDS);
    } else {
      setCountdown(null);
    }
  }, [enabled]);

  useDidUpdate(() => {
    if (countdown !== null) {
      onTick?.(countdown);
    }
  }, [countdown]);

  useIntervalWhen(
    () => {
      setCountdown((prevState) => {
        if (prevState === null) return null;

        if (prevState === 1) {
          onComplete?.();
          return null;
        }

        return prevState - 1;
      });
    },
    INTERVAL_MS,
    enabled && countdown !== null,
  );

  return countdown;
}

export namespace useCountdown {
  export interface Props {
    /**
     * Called when the countdown starts.
     */
    onStart?: () => void;
    /**
     * Called whenever the displayed countdown value changes.
     */
    onTick?: (tick: number) => void;
    /**
     * Called when the countdown reaches zero.
     */
    onComplete?: () => void;
    /**
     * Whether the countdown is active.
     *
     * @default true
     */
    enabled?: boolean;
  }
}
