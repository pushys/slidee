import {
  PauseFill,
  PlayFill,
  MagicWand,
  Clock,
  ArrowsExpand,
  CrownDiamond,
  Shuffle,
} from '@gravity-ui/icons';
import { Button, type ButtonProps, Chip } from '@heroui/react';
import clsx from 'clsx';
import { type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { useKey } from 'rooks';

import { KeyCode } from '@/components/board/key-code';
import { Tooltip } from '@/components/tooltip';
import { Game } from '@/game/game';
import { headShake } from '@/shared/utils/animations/headShake';
import { useAnimate } from '@/shared/utils/animations/use-animate';
import { formatElapsedTime } from '@/shared/utils/format-elapsed-time';

export const Toolbar = (props: Toolbar.Props) => {
  const {
    gameStatus = Game.Status.Idle,
    moves = 0,
    elapsedTime = 0,
    personalBestTime,
    isAutoSolved = false,
    onShufflePress,
    onPausePress,
    onResumePress,
    onSolvePress,
    ...rest
  } = props;

  const { t } = useTranslation();

  const isPbBeat =
    personalBestTime !== undefined ? personalBestTime >= elapsedTime : true;

  const [ref, animate] = useAnimate<HTMLButtonElement>(...headShake);

  // Let player know that the game is paused when they try to move a tile.
  useKey(
    [KeyCode.ArrowLeft, KeyCode.ArrowUp, KeyCode.ArrowRight, KeyCode.ArrowDown],
    () => animate(),
    { when: gameStatus === Game.Status.Paused },
  );

  return (
    <header {...rest} className={clsx('@container flex', rest.className)}>
      <div className="flex grow items-center gap-2">
        <Button
          size="lg"
          onPress={onShufflePress}
          className="@max-[460px]:hidden"
        >
          <Shuffle />
          {t('toolbar.shuffle')}
        </Button>
        <Tooltip content={t('toolbar.shuffle')} contentPlacement="top">
          <Button
            isIconOnly
            size="lg"
            onPress={onShufflePress}
            className="@min-[460px]:hidden"
            aria-label={t('toolbar.shuffle')}
          >
            <Shuffle />
          </Button>
        </Tooltip>
        {gameStatus === Game.Status.Playing && (
          <Tooltip content={t('toolbar.pause')}>
            <Button
              isIconOnly
              variant="danger-soft"
              size="lg"
              onPress={onPausePress}
              aria-label={t('toolbar.pause')}
            >
              <PauseFill />
            </Button>
          </Tooltip>
        )}
        {gameStatus === Game.Status.Paused && (
          <Tooltip content={t('toolbar.resume')}>
            <Button
              isIconOnly
              variant="secondary"
              size="lg"
              onPress={onResumePress}
              aria-label={t('toolbar.resume')}
              ref={ref}
            >
              <PlayFill />
            </Button>
          </Tooltip>
        )}
        <Tooltip content={t('toolbar.solve')}>
          <Button
            isIconOnly
            variant="secondary"
            size="lg"
            onPress={onSolvePress}
            isDisabled={gameStatus === Game.Status.Over}
            aria-label={t('toolbar.solve')}
          >
            <MagicWand />
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center gap-1">
        <Chip
          size="lg"
          variant="soft"
          className="tabular-nums @max-[360px]:hidden"
        >
          <ArrowsExpand width={12} />
          <Chip.Label>{moves}</Chip.Label>
        </Chip>
        <Chip
          size="lg"
          color={
            gameStatus === Game.Status.Idle
              ? 'default'
              : isPbBeat
                ? 'success'
                : 'danger'
          }
          variant="soft"
          className="tabular-nums"
        >
          <Clock width={12} />
          <Chip.Label>{formatElapsedTime(elapsedTime)}</Chip.Label>
          {isAutoSolved && <MagicWand width={12} className="opacity-60" />}
        </Chip>
        {personalBestTime !== undefined && (
          <Chip
            size="lg"
            color="warning"
            variant="soft"
            className="tabular-nums"
          >
            <CrownDiamond width={12} />
            <Chip.Label>{formatElapsedTime(personalBestTime)}</Chip.Label>
          </Chip>
        )}
      </div>
    </header>
  );
};

export namespace Toolbar {
  export interface Props extends ComponentProps<'header'> {
    /**
     * Current game status.
     *
     * @default Game.Status.Idle
     */
    gameStatus?: Game.Status;
    /**
     * Current game number of moves.
     *
     * @default 0
     */
    moves?: number;
    /**
     * Current game elapsed time in milliseconds.
     *
     * @default null
     */
    elapsedTime?: number;
    /**
     * Best personal time in milliseconds.
     */
    personalBestTime?: number;
    /**
     * If `true`, the elapsed time will be marked.
     *
     * @default false
     */
    isAutoSolved?: boolean;
    /**
     * "Shuffle" button press handler.
     */
    onShufflePress?: ButtonProps['onPress'];
    /**
     * "Pause" button press handler.
     */
    onPausePress?: ButtonProps['onPress'];
    /**
     * "Resume" button press handler.
     */
    onResumePress?: ButtonProps['onPress'];
    /**
     * "Solve" button press handler.
     */
    onSolvePress?: ButtonProps['onPress'];
  }
}
