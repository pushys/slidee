import { useState, useEffect, useEffectEvent, useRef } from 'react';

import type { StatsEntry } from '@/stats/types';

import { images } from '@/assets/images';
import { AppContainer } from '@/components/app-container';
import { Board } from '@/components/board';
import { Footer } from '@/components/footer';
import { HelpDialog } from '@/components/help-dialog';
import { SettingsDialog } from '@/components/settings-dialog';
import { StatsDialog } from '@/components/stats-dialog';
import { Tile } from '@/components/tile';
import { Toolbar } from '@/components/toolbar';
import { Game } from '@/game/game';
import { useGame } from '@/game/use-game';
import { useSettings } from '@/settings/use-settings';
import { createStartViewTransition } from '@/shared/utils/create-start-view-transition';
import { usePrefersReducedMotion } from '@/shared/utils/use-prefers-reduced-motion';
import { useStats } from '@/stats/use-stats';

/**
 * Main orchestration component of the app.
 */
export function App() {
  const [isStatsOpen, setStatsOpen] = useState(false);
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const [stats, setStats] = useStats();
  const [settings, setSettings] = useSettings();

  const wasPlayingRef = useRef(false);

  const { game, state, totalPlayTime } = useGame({
    defaultBoardSize: settings.boardSize,
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  const startViewTransition = createStartViewTransition(
    !prefersReducedMotion && settings.animations,
  );

  const initGame = useEffectEvent((opts?: Game.Options) => game.init(opts));
  const pauseGame = useEffectEvent(() => game.pause());
  const resumeGame = useEffectEvent(() => game.resume());

  const updateStats = useEffectEvent(() => {
    // Ignore times that were set using the "Solve" button.
    if (state.isAutoSolved) return;

    const entry = stats[settings.boardSize];

    let newEntry: StatsEntry = {
      best: totalPlayTime,
      average: totalPlayTime,
      games: 1,
    };

    if (entry) {
      const newGameCount = entry.games + 1;

      newEntry = {
        best: totalPlayTime < entry.best ? totalPlayTime : entry.best,
        average: (entry.average * entry.games + totalPlayTime) / newGameCount,
        games: newGameCount,
      };
    }

    setStats((prevStats) => ({ ...prevStats, [settings.boardSize]: newEntry }));
  });

  const isDialogOpen = isStatsOpen || isHelpOpen || isSettingsOpen;

  useEffect(() => {
    if (state.status === Game.Status.Over) {
      updateStats();
    }
  }, [state.status]);

  // Pause the game if it's playing when any dialog opens.
  useEffect(() => {
    if (isDialogOpen && state.status === Game.Status.Playing) {
      pauseGame();
      wasPlayingRef.current = true;
    } else if (!isDialogOpen && wasPlayingRef.current) {
      resumeGame();
      wasPlayingRef.current = false;
    }
  }, [isDialogOpen, state.status]);

  // Board size change or new image selection must start a new game.
  useEffect(() => {
    initGame({ boardSize: settings.boardSize });
  }, [settings.boardSize, settings.image]);

  return (
    <AppContainer>
      <Toolbar
        gameStatus={state.status}
        moves={state.moves}
        elapsedTime={totalPlayTime}
        personalBestTime={stats[settings.boardSize]?.best}
        isAutoSolved={state.isAutoSolved}
        onNewGamePress={() => startViewTransition(() => game.init())}
        onPausePress={() => game.pause()}
        onResumePress={() => game.resume()}
        onSolvePress={() => startViewTransition(() => game.solve())}
      />
      <Board
        size={settings.boardSize}
        tiles={state.board}
        gameStatus={state.status}
        image={settings.image ? images[settings.image] : undefined}
        renderTile={(tile, index) => (
          <Tile
            key={tile}
            value={tile}
            isSolved={tile === index + 1}
            isMovable={game.isTileMovable(tile)}
            isViewTransitionDisabled={isDialogOpen}
            onPress={() => startViewTransition(() => game.moveTile(tile))}
          />
        )}
        isKeyboardDisabled={isDialogOpen}
        isSoundDisabled={!settings?.sound}
        isConfettiDisabled={!settings.confetti}
        isNumbersVisible={settings.showNumbers}
        onNewGame={() => startViewTransition(() => game.init())}
        onTileMove={(dir) => startViewTransition(() => game.move(dir))}
        onGamePause={() => game.pause()}
        onGameResume={() => game.resume()}
      />
      <Footer
        soundEnabled={settings?.sound}
        onSoundEnablePress={() => setSettings({ ...settings, sound: true })}
        onSoundDisablePress={() => setSettings({ ...settings, sound: false })}
        onStatsPress={() => setStatsOpen(true)}
        onHelpPress={() => setHelpOpen(true)}
        onSettingsPress={() => setSettingsOpen(true)}
      />
      <StatsDialog
        isOpen={isStatsOpen}
        onOpenChange={setStatsOpen}
        stats={stats}
        onClearStatsPress={() => setStats({})}
      />
      <HelpDialog isOpen={isHelpOpen} onOpenChange={setHelpOpen} />
      <SettingsDialog
        isOpen={isSettingsOpen}
        onOpenChange={setSettingsOpen}
        defaultSettings={settings}
        onSettingsSave={setSettings}
      />
    </AppContainer>
  );
}
