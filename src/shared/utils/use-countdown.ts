import { useState } from 'react';
import { useDidMount, useDidUpdate, useIntervalWhen } from 'rooks';

type Countdown = number | 'inactive' | 'complete';

const COUNTDOWN_SECONDS = 3;
const INTERVAL_MS = 1_100;

export function useCountdown(props: useCountdown.Props): number | null {
  const { onStart, onTick, onComplete, enabled = true } = props;

  const [countdown, setCountdown] = useState<Countdown>(
    enabled ? COUNTDOWN_SECONDS : 'inactive',
  );

  useDidMount(() => {
    if (enabled) {
      onStart?.();
    }
  });

  useDidUpdate(() => {
    if (enabled) {
      onStart?.();
      setCountdown(COUNTDOWN_SECONDS);
    } else {
      setCountdown('inactive');
    }
  }, [enabled]);

  useDidUpdate(() => {
    if (typeof countdown === 'number') {
      onTick?.(countdown);
    } else if (countdown === 'complete') {
      onComplete?.();
    }
  }, [countdown]);

  const isCountingDown = typeof countdown === 'number';

  useIntervalWhen(
    () => {
      setCountdown((prevState) => {
        if (typeof prevState !== 'number') return prevState;

        return prevState === 1 ? 'complete' : prevState - 1;
      });
    },
    INTERVAL_MS,
    enabled && isCountingDown,
  );

  return isCountingDown ? countdown : null;
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
