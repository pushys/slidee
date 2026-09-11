import {
  Star,
  ArrowRightFromSquare,
  Shuffle,
  Hourglass,
  HourglassStart,
  HourglassEnd,
  CrownDiamond,
} from '@gravity-ui/icons';
import { Button, type ButtonProps, Chip } from '@heroui/react';
import { clsx } from 'clsx';
import { type ComponentProps, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ChipNumberFlow } from '@/components/chip-number-flow';
import { TimeChip } from '@/components/time-chip';
import { Tooltip } from '@/components/tooltip';
import { ChallengeStatus } from '@/shared/lib/challenge/challenge.schema';
import { soundManager } from '@/shared/lib/sound-manager';

const ENDING_CUTOFF_S = 9;

export const ChallengeToolbar = (props: ChallengeToolbar.Props) => {
  const {
    score = 0,
    bestScore = 0,
    timeLeft: timeLeftMs = 0,
    challengeStatus = false,
    onShufflePress,
    onQuitPress,
    ...rest
  } = props;

  const { t } = useTranslation();

  const timeLeft = Math.floor(timeLeftMs / 1000);
  const isActive = challengeStatus === ChallengeStatus.Active;
  const isEnding = timeLeft <= ENDING_CUTOFF_S;

  useEffect(() => {
    if (timeLeft <= ENDING_CUTOFF_S) {
      soundManager.play('tick');
    }
  }, [timeLeft]);

  return (
    <header {...rest} className={clsx('flex', rest.className)}>
      <div className="flex grow items-center gap-2">
        <Button
          size="lg"
          onPress={onShufflePress}
          isDisabled={!isActive || timeLeft === 0}
        >
          <Shuffle />
          {t('common.shuffle')}
        </Button>
        <Tooltip content={t('common.quit')} contentPlacement="top">
          <Button
            isIconOnly
            size="lg"
            onPress={onQuitPress}
            variant="danger-soft"
            isDisabled={!isActive}
            aria-label={t('common.quit')}
          >
            <ArrowRightFromSquare />
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center gap-1">
        <Chip size="lg" variant="soft" className="tabular-nums">
          <Star width={12} />
          <Chip.Label>
            <ChipNumberFlow value={score} />
          </Chip.Label>
        </Chip>
        {bestScore !== 0 && (
          <Chip
            size="lg"
            variant="soft"
            color="warning"
            className="tabular-nums"
          >
            <CrownDiamond width={12} />
            <Chip.Label>
              <ChipNumberFlow value={bestScore} />
            </Chip.Label>
          </Chip>
        )}
        <TimeChip
          value={timeLeftMs}
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
          {...(timeLeft === 0 && { startIcon: <Hourglass width={12} /> })}
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
     * Score to beat.
     *
     * @default 0
     */
    bestScore?: number;
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
    onQuitPress?: ButtonProps['onPress'];
  }
}
