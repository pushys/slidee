import {
  useState,
  useEffect,
  useEffectEvent,
  useRef,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useDidUpdate, usePrefersReducedMotion } from 'rooks';

import { Game } from '@/game/game';
import { useGame } from '@/game/use-game';
import { createStartViewTransition } from '@/shared/utils/create-start-view-transition';

import { AppContext } from '../app-context';
import { useSettings } from '../use-settings';
import { useStats } from '../use-stats';

export function AppProvider(props: PropsWithChildren) {
  const [dialog, setDialog] = useState<AppContext.Dialog | null>(null);
  const [isImagePreviewing, setImagePreviewing] = useState(false);

  const settings = useSettings();
  const stats = useStats();

  const { boardSize, animations, image } = settings.settings;

  const wasPlayingRef = useRef(false);
  const game = useGame({ defaultBoardSize: settings.settings.boardSize });

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

  useEffect(() => {
    if (game.state.status === Game.Status.Over) {
      updateStats();
    }
  }, [game.state.status]);

  // Pause the game if it's playing when any dialog opens.
  const pauseGame = useEffectEvent(() => game.pause());
  const resumeGame = useEffectEvent(() => game.resume());

  useEffect(() => {
    if (dialog && game.state.status === Game.Status.Playing) {
      pauseGame();
      wasPlayingRef.current = true;
    } else if (!dialog && wasPlayingRef.current) {
      resumeGame();
      wasPlayingRef.current = false;
    }
  }, [dialog, game.state.status]);

  // Board size change or new image selection must start a new game.
  useDidUpdate(() => game.init({ boardSize }), [boardSize, image]);

  const contextValue = useMemo(
    () => ({
      dialog,
      setDialog,
      isImagePreviewing,
      setImagePreviewing,
      settings,
      stats,
      game,
      startViewTransition,
    }),
    [
      dialog,
      setDialog,
      isImagePreviewing,
      setImagePreviewing,
      settings,
      stats,
      game,
      startViewTransition,
    ],
  );

  return <AppContext value={contextValue}>{props.children}</AppContext>;
}
