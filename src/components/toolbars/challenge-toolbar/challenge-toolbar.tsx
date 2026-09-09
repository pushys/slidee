import {
  Star,
  ArrowRightFromSquare,
  Shuffle,
  HourglassStart,
  HourglassEnd,
} from '@gravity-ui/icons';
import { Button, type ButtonProps, Chip } from '@heroui/react';
import { clsx } from 'clsx';
import { type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { ChallengeStatus } from '@/challenge/challenge.schema';
import { ChipNumberFlow } from '@/components/chip-number-flow';
import { TimeChip } from '@/components/time-chip';
import { Tooltip } from '@/components/tooltip';

export const ChallengeToolbar = (props: ChallengeToolbar.Props) => {
  const {
    score = 0,
    timeLeft = 0,
    challengeStatus = false,
    onShufflePress,
    onExitPress,
    ...rest
  } = props;

  const { t } = useTranslation();

  const isCountdown = challengeStatus === ChallengeStatus.Countdown;
  const isActive = challengeStatus === ChallengeStatus.Active;
  const isEnding = timeLeft < 10_000;

  return (
    <header {...rest} className={clsx('flex', rest.className)}>
      <div className="flex grow items-center gap-2">
        <Button size="lg" onPress={onShufflePress} isDisabled={isCountdown}>
          <Shuffle />
          {t('common.shuffle')}
        </Button>
        <Tooltip content={t('challengeToolbar.quit')} contentPlacement="top">
          <Button
            isIconOnly
            size="lg"
            onPress={onExitPress}
            variant="danger-soft"
            isDisabled={isCountdown}
            aria-label={t('challengeToolbar.quit')}
          >
            <ArrowRightFromSquare />
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center gap-1">
        <Chip
          size="lg"
          variant="soft"
          className="tabular-nums @max-[360px]:hidden"
        >
          <Star width={12} />
          <Chip.Label>
            {`${t('challengeToolbar.score')}: `}
            <ChipNumberFlow value={score} />
          </Chip.Label>
        </Chip>
        <TimeChip
          value={timeLeft}
          startIcon={
            isEnding ? (
              <HourglassEnd width={12} />
            ) : (
              <HourglassStart width={12} />
            )
          }
          size="lg"
          color={isEnding ? 'danger' : 'success'}
          variant="soft"
          {...(!isActive && { color: 'default' })}
        />
      </div>
    </header>
  );
};

export namespace ChallengeToolbar {
  export interface Props extends ComponentProps<'header'> {
    /**
     * Current challenge score.
     *
     * @default 0
     */
    score?: number;
    /**
     * Challenge time left in milliseconds.
     *
     * @default 0
     */
    timeLeft?: number;
    /**
     * Current challenge status.
     */
    challengeStatus?: ChallengeStatus;
    /**
     * "Shuffle" button press handler.
     */
    onShufflePress?: ButtonProps['onPress'];
    /**
     * "Exit" button press handler.
     */
    onExitPress?: ButtonProps['onPress'];
  }
}
