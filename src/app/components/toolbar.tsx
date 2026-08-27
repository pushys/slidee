import { Toolbar as ToolbarView } from '@/components/toolbar';

import { useAppContext } from '../app-context';

export const Toolbar = () => {
  const {
    settings: { settings },
    stats: { stats },
    game,
    startViewTransition,
  } = useAppContext();

  return (
    <ToolbarView
      gameStatus={game.state.status}
      moves={game.state.moves}
      elapsedTime={game.totalPlayTime}
      personalBestTime={stats[settings.boardSize]?.best}
      isAutoSolved={game.state.isAutoSolved}
      onShufflePress={() => startViewTransition(() => game.init())}
      onPausePress={game.pause}
      onResumePress={game.resume}
      onSolvePress={() => startViewTransition(() => game.solve())}
    />
  );
};
