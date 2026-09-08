import { MainToolbar as MainToolbarView } from '@/components/toolbars/main-toolbar';

import { useAppContext } from '../../app-context';

export const MainToolbar = () => {
  const {
    settings: { settings },
    stats: { stats },
    game,
    startViewTransition,
  } = useAppContext();

  return (
    <MainToolbarView
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
