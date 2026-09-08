import {
  useState,
  useEffect,
  useEffectEvent,
  useRef,
  useMemo,
  useCallback,
  type PropsWithChildren,
} from 'react';
import {
  useDidUpdate,
  usePrefersReducedMotion,
  useDocumentEventListener,
  useWindowEventListener,
} from 'rooks';

import { Game } from '@/game/game';
import { useGame } from '@/game/use-game';
import { createStartViewTransition } from '@/shared/utils/create-start-view-transition';

import { AppContext } from '../app-context';
import { useChallenge } from '../use-challenge';
import { useSettings } from '../use-settings';
import { useStats } from '../use-stats';

type PauseReason = 'dialog' | 'lost-focus';

export function AppProvider(props: PropsWithChildren) {
  const [dialog, setDialog] = useState<AppContext.Dialog | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isImagePreviewing, setImagePreviewing] = useState(false);

  const settings = useSettings();
  const stats = useStats();
  const challenge = useChallenge();

  const { boardSize, animations, image } = settings.settings;

  const game = useGame({ defaultBoardSize: settings.settings.boardSize });

  const pauseReasonRef = useRef<PauseReason>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const startViewTransition = useMemo(
    () => createStartViewTransition(!prefersReducedMotion && animations),
    [prefersReducedMotion, animations],
  );

  // Update player's stats when game is over.
  const updateStats = useEffectEvent(() => {
    // Ignore games that were won using the "Solve" button.
    if (game.state.isAutoSolved) return;

    stats.updateStats({
      boardSize,
      image,
      totalPlayTime: game.totalPlayTime,
    });
  });

  const updateChallengeScore = useEffectEvent(() => {
    challenge.increaseScore();
  });

  useEffect(() => {
    if (game.state.status === Game.Status.Over) {
      updateStats();
      updateChallengeScore();
    }
  }, [game.state.status]);

  // Board size change, new image selection or challenge start must trigger a new game.
  useDidUpdate(
    () => game.init({ boardSize }),
    [boardSize, image, challenge.hasCurrent],
  );

  const handleWindowBlur = () => {
    if (game.state.status === 'playing') {
      game.pause();
      pauseReasonRef.current = 'lost-focus';
    }
  };

  const handleWindowFocus = () => {
    if (pauseReasonRef.current === 'lost-focus') {
      game.resume();
      pauseReasonRef.current = null;
    }
  };

  useWindowEventListener('blur', handleWindowBlur);
  useWindowEventListener('focus', handleWindowFocus);
  useDocumentEventListener(
    'visibilitychange',
    document.hidden ? handleWindowBlur : handleWindowFocus,
  );

  const openDialog = useCallback(
    (dialogCode: AppContext.Dialog) => {
      setDialog(dialogCode);
      setDialogOpen(true);

      if (game.state.status === Game.Status.Playing) {
        game.pause();
        pauseReasonRef.current = 'dialog';
      }
    },
    [game],
  );

  const closeDialog = useCallback(() => {
    setDialogOpen(false);

    if (
      game.state.status === Game.Status.Paused &&
      pauseReasonRef.current === 'dialog'
    ) {
      game.resume();
      pauseReasonRef.current = null;
    }
  }, [game]);

  const contextValue = useMemo(
    () => ({
      dialog,
      isDialogOpen,
      openDialog,
      closeDialog,
      isImagePreviewing,
      setImagePreviewing,
      settings,
      stats,
      challenge,
      game,
      startViewTransition,
    }),
    [
      dialog,
      isDialogOpen,
      openDialog,
      closeDialog,
      isImagePreviewing,
      setImagePreviewing,
      settings,
      stats,
      challenge,
      game,
      startViewTransition,
    ],
  );

  return <AppContext value={contextValue}>{props.children}</AppContext>;
}
