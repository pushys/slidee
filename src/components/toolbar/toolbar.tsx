import {
  PauseFill,
  PlayFill,
  MagicWand,
  Clock,
  ArrowsExpand,
  CrownDiamond,
  Dice3,
} from '@gravity-ui/icons';
import { Button, type ButtonProps, Chip } from '@heroui/react';
import clsx from 'clsx';
import { type ComponentProps } from 'react';

import { Game } from '@/game/game';
import { formatElapsedTime } from '@/shared/utils/format-elapsed-time';

interface ToolbarProps extends ComponentProps<'header'> {
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
   * "New game" button press handler.
   */
  onNewGamePress?: ButtonProps['onPress'];
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

export const Toolbar = (props: ToolbarProps) => {
  const {
    gameStatus = Game.Status.Idle,
    moves = 0,
    elapsedTime = 0,
    personalBestTime,
    isAutoSolved = false,
    onNewGamePress,
    onPausePress,
    onResumePress,
    onSolvePress,
    ...rest
  } = props;

  const isPbBeat =
    personalBestTime !== undefined ? personalBestTime >= elapsedTime : true;

  return (
    <header {...rest} className={clsx('flex @container', rest.className)}>
      <div className="flex gap-2 grow items-center">
        <Button
          size="lg"
          onPress={onNewGamePress}
          className="@max-[460px]:hidden"
        >
          New game
        </Button>
        <Button
          isIconOnly
          size="lg"
          onPress={onNewGamePress}
          className="@min-[460px]:hidden"
        >
          <Dice3 />
        </Button>
        {gameStatus === Game.Status.Playing && (
          <Button
            isIconOnly
            variant="danger-soft"
            size="lg"
            onPress={onPausePress}
            aria-label="Pause"
          >
            <PauseFill />
          </Button>
        )}
        {gameStatus === Game.Status.Paused && (
          <Button
            isIconOnly
            variant="secondary"
            size="lg"
            onPress={onResumePress}
            aria-label="Resume"
          >
            <PlayFill />
          </Button>
        )}
        <Button
          isIconOnly
          variant="secondary"
          size="lg"
          onPress={onSolvePress}
          isDisabled={gameStatus === Game.Status.Over}
          aria-label="Solve"
        >
          <MagicWand />
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <Chip size="lg" variant="soft" className="tabular-nums">
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
