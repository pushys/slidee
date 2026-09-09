import NumberFlow, { type NumberFlowProps } from '@number-flow/react';
import clsx from 'clsx';

const SPIN_TIMING = { duration: 150 };

/**
 * `NumberFlow` designed to fit inside HeroUI's `Chip.Label`.
 */
export const ChipNumberFlow = (props: NumberFlowProps) => {
  return (
    <NumberFlow
      {...props}
      spinTiming={{ ...SPIN_TIMING, ...props.spinTiming }}
      className={clsx('[&::part(number)]:leading-3', props.className)}
    />
  );
};
