import { Clock } from '@gravity-ui/icons';
import { Chip, type ChipProps } from '@heroui/react';
import NumberFlow from '@number-flow/react';
import clsx from 'clsx';
import React from 'react';

const SPIN_TIMING = { duration: 150 };

export const TimeChip = (props: TimeChip.Props) => {
  const { value = 0, startIcon, endIcon, ...rest } = props;

  const totalSeconds = Math.floor(value / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <Chip {...rest} className={clsx('tabular-nums', rest.className)}>
      {startIcon ?? <Clock width={12} />}
      <Chip.Label>
        {hours > 0 && (
          <React.Fragment>
            <NumberFlow
              value={hours}
              format={{ minimumIntegerDigits: 1 }}
              spinTiming={SPIN_TIMING}
              className="[&::part(number)]:leading-3"
            />
            <span className="relative -top-px opacity-60">:</span>
          </React.Fragment>
        )}
        <NumberFlow
          value={minutes}
          format={{ minimumIntegerDigits: 2 }}
          digits={{ 1: { max: 5 } }}
          spinTiming={SPIN_TIMING}
          className="[&::part(number)]:leading-3"
        />
        <span className="relative -top-px opacity-60">:</span>
        <NumberFlow
          value={seconds}
          format={{ minimumIntegerDigits: 2 }}
          digits={{ 1: { max: 5 } }}
          spinTiming={SPIN_TIMING}
          className="[&::part(number)]:leading-3"
        />
      </Chip.Label>
      {endIcon}
    </Chip>
  );
};

export namespace TimeChip {
  export interface Props extends Omit<ChipProps, 'children'> {
    /**
     * Time value in milliseconds.
     *
     * @default 0
     */
    value?: number;
    /**
     * Icon element to render on the left.
     */
    startIcon?: React.ReactNode;
    /**
     * Icon element to render on the right.
     */
    endIcon?: React.ReactNode;
  }
}
