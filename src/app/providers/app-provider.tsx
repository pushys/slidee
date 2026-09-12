import {
  useState,
  useRef,
  useMemo,
  useEffect,
  type PropsWithChildren,
} from 'react';
import {
  useDidUpdate,
  usePrefersReducedMotion,
  useDocumentEventListener,
  useWindowEventListener,
} from 'rooks';

import { Game } from '@/shared/lib/game/game';
import { useGame } from '@/shared/lib/game/use-game';
import { soundManager } from '@/shared/lib/sound-manager';
import { createStartViewTransition } from '@/shared/utils/create-start-view-transition';

import { AppContext } from '../app-context';
import { useChallenge } from '../features/challenge';
import { useDialog } from '../features/dialog';
import { useSettings } from '../features/settings';
import { useStats } from '../features/stats';

type PauseReason = 'dialog' | 'lost-focus';

export function AppProvider(props: PropsWithChildren) {
  const [isImagePreviewing, setImagePreviewing] = useState(false);

  const dialog = useDialog({
    onOpen: handleDialogOpen,
    onClose: handleDialogClose,
  });
  const settings = useSettings();
  const stats = useStats();
  const challenge = useChallenge({ onFinish: handleChallengeFinish });

  const { boardSize, animations, image, sound } = settings.settings;

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

  // Sync sound setting with the sound manager.
  useEffect(() => {
    soundManager.setEnabled(sound);
  }, [sound]);

  function handleGameOver() {
    if (challenge.hasCurrent) {
      challenge.increaseScore();
      setTimeout(() => startViewTransition(() => game.init()), 100);
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
    if (game.state.status === 'playing') {
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
    if (game.state.status === Game.Status.Playing) {
      game.pause();
      pauseReasonRef.current = 'dialog';
    }
  }

  function handleDialogClose() {
    if (
      game.state.status === Game.Status.Paused &&
      pauseReasonRef.current === 'dialog'
    ) {
      game.resume();
      pauseReasonRef.current = null;
    }
  }

  const contextValue = useMemo(
    () => ({
      isImagePreviewing,
      setImagePreviewing,
      dialog,
      settings,
      stats,
      challenge,
      game,
      startViewTransition,
    }),
    [
      isImagePreviewing,
      setImagePreviewing,
      dialog,
      settings,
      stats,
      challenge,
      game,
      startViewTransition,
    ],
  );

  return <AppContext value={contextValue}>{props.children}</AppContext>;
}
