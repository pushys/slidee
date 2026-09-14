import { useRef, useMemo, type PropsWithChildren } from 'react';
import {
  useDidUpdate,
  usePrefersReducedMotion,
  useDocumentEventListener,
  useWindowEventListener,
} from 'rooks';

import { Game } from '@/shared/lib/game/game';
import { createStartViewTransition } from '@/shared/utils/create-start-view-transition';

import { AppContext } from '../app-context';
import { useBoard } from '../features/board';
import { useChallenge } from '../features/challenge';
import { useDialog } from '../features/dialog';
import { useGame } from '../features/game';
import { useSettings } from '../features/settings';
import { useStats } from '../features/stats';

type PauseReason = 'dialog' | 'lost-focus';

const NEW_GAME_DELAY_MS = 300;

export function AppProvider(props: PropsWithChildren) {
  const dialog = useDialog({
    onOpen: handleDialogOpen,
    onClose: handleDialogClose,
  });
  const settings = useSettings();
  const stats = useStats();
  const challenge = useChallenge({ onFinish: handleChallengeFinish });
  const board = useBoard();

  const { boardSize, animations, image } = settings.settings;

  const game = useGame({
    defaultBoardSize: settings.settings.boardSize,
    onOver: handleGameOver,
  });

  const pauseReasonRef = useRef<PauseReason>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const startViewTransition = useMemo(
    () => createStartViewTransition(!prefersReducedMotion && animations),
    [prefersReducedMotion, animations],
  );

  // Board size change, new image selection or challenge start must trigger a new game.
  useDidUpdate(() => {
    game.init({
      // Challenge mode has a fixed board size.
      boardSize: challenge.hasCurrent ? Game.BoardSize.Medium : boardSize,
    });
  }, [boardSize, image, challenge.hasCurrent]);

  useWindowEventListener('blur', handleWindowBlur);
  useWindowEventListener('focus', handleWindowFocus);
  useDocumentEventListener(
    'visibilitychange',
    document.hidden ? handleWindowBlur : handleWindowFocus,
  );

  const isGamePlaying = game.state.status === Game.Status.Playing;
  const isGamePaused = game.state.status === Game.Status.Paused;

  function handleGameOver() {
    if (challenge.hasCurrent) {
      challenge.increaseScore();
      setTimeout(
        () => startViewTransition(() => game.init()),
        NEW_GAME_DELAY_MS,
      );
    }

    // Ignore games that were won using the "Solve" button.
    if (!game.state.isAutoSolved) {
      stats.updateBoardStats({
        boardSize,
        image,
        totalPlayTime: game.totalPlayTime,
      });
    }
  }

  function handleChallengeFinish(result: useChallenge.Result) {
    dialog.open('challenge-result');
    stats.updateChallengeStats(result);
  }

  function handleWindowBlur() {
    if (isGamePlaying && !challenge.hasCurrent) {
      game.pause();
      pauseReasonRef.current = 'lost-focus';
    }
  }

  function handleWindowFocus() {
    if (pauseReasonRef.current === 'lost-focus') {
      game.resume();
      pauseReasonRef.current = null;
    }
  }

  function handleDialogOpen() {
    if (isGamePlaying && !challenge.hasCurrent) {
      game.pause();
      pauseReasonRef.current = 'dialog';
    }
  }

  function handleDialogClose() {
    if (isGamePaused && pauseReasonRef.current === 'dialog') {
      game.resume();
      pauseReasonRef.current = null;
    }
  }

  const contextValue = useMemo(
    () => ({
      dialog,
      settings,
      stats,
      challenge,
      board,
      game,
      startViewTransition,
    }),
    [dialog, settings, stats, challenge, board, game, startViewTransition],
  );

  return <AppContext value={contextValue}>{props.children}</AppContext>;
}
