import { useState, useEffect, useEffectEvent, useRef } from 'react';
import { useDidUpdate, usePrefersReducedMotion } from 'rooks';

import { AppContainer } from '@/components/app-container';
import { Board } from '@/components/board';
import { Controls } from '@/components/controls';
import { Footer } from '@/components/footer';
import { HelpDialog } from '@/components/help-dialog';
import { SettingsDialog } from '@/components/settings-dialog';
import { StatsDialog } from '@/components/stats-dialog';
import { Tile } from '@/components/tile';
import { Toolbar } from '@/components/toolbar';
import { Game } from '@/game/game';
import { useGame } from '@/game/use-game';
import { createStartViewTransition } from '@/shared/utils/create-start-view-transition';

import { useSettings } from './use-settings';
import { useStats } from './use-stats';

/**
 * Main orchestration component of the app.
 */
export function App() {
  const [isStatsOpen, setStatsOpen] = useState(false);
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isImagePreviewing, setImagePreviewing] = useState(false);

  const {
    settings,
    setSettings,
    imageMetadata,
    isFirstImage,
    isLastImage,
    enableSound,
    disableSound,
    setBoardSize,
    randomImage,
    nextImage,
    previousImage,
    toggleMode,
  } = useSettings();

  const [stats, setStats, clearStats] = useStats();

  const wasPlayingRef = useRef(false);

  const game = useGame({ defaultBoardSize: settings.boardSize });

  const prefersReducedMotion = usePrefersReducedMotion();

  const startViewTransition = createStartViewTransition(
    !prefersReducedMotion && settings.animations,
  );

  const isDialogOpen = isStatsOpen || isHelpOpen || isSettingsOpen;

  // Update player's stats when game is over.
  const updateStats = useEffectEvent(() => {
    // Ignore games that were won using the "Solve" button.
    if (game.state.isAutoSolved) return;

    setStats({
      boardSize: settings.boardSize,
      image: settings.image,
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
    if (isDialogOpen && game.state.status === Game.Status.Playing) {
      pauseGame();
      wasPlayingRef.current = true;
    } else if (!isDialogOpen && wasPlayingRef.current) {
      resumeGame();
      wasPlayingRef.current = false;
    }
  }, [isDialogOpen, game.state.status]);

  // Board size change or new image selection must start a new game.
  useDidUpdate(() => {
    game.init({ boardSize: settings.boardSize });
  }, [settings.boardSize, settings.image]);

  return (
    <AppContainer
      controls={
        <Controls
          boardSize={settings.boardSize}
          onBoardSizeChange={(s) => startViewTransition(() => setBoardSize(s))}
          mode={imageMetadata ? 'image' : 'numbers'}
          onModeChange={() => startViewTransition(toggleMode)}
          onRandomImagePress={() => startViewTransition(randomImage)}
          onPreviousImagePress={() => startViewTransition(previousImage)}
          onNextImagePress={() => startViewTransition(nextImage)}
          onPreviewImagePressStart={() => setImagePreviewing(true)}
          onPreviewImagePressEnd={() => setImagePreviewing(false)}
          isPreviousImageButtonDisabled={isFirstImage}
          isNextImageButtonDisabled={isLastImage}
          isPreviewImageButtonDisabled={game.state.status === Game.Status.Over}
          isImagePreviewing={isImagePreviewing}
        />
      }
    >
      <Toolbar
        gameStatus={game.state.status}
        moves={game.state.moves}
        elapsedTime={game.totalPlayTime}
        personalBestTime={stats[settings.boardSize]?.best}
        isAutoSolved={game.state.isAutoSolved}
        onShufflePress={() => startViewTransition(() => game.init())}
        onPausePress={() => game.pause()}
        onResumePress={() => game.resume()}
        onSolvePress={() => startViewTransition(() => game.solve())}
      />
      <Board
        tiles={game.state.board}
        gameStatus={game.state.status}
        image={imageMetadata?.image}
        imageAttribution={imageMetadata?.attribution}
        renderTile={(tile, index) => (
          <Tile
            key={tile}
            value={tile}
            isSolved={tile === index + 1}
            isViewTransitionDisabled={isDialogOpen}
            {...(game.isTileMovable(tile) && {
              onPress: () => startViewTransition(() => game.moveTile(tile)),
            })}
          />
        )}
        isKeyboardDisabled={isDialogOpen}
        isSoundDisabled={!settings?.sound}
        isConfettiDisabled={!settings.confetti}
        isNumbersVisible={settings.showNumbers}
        isImagePreviewActive={isImagePreviewing}
        onNewGame={() => startViewTransition(() => game.init())}
        onTileMove={(dir) => startViewTransition(() => game.move(dir))}
        onGamePause={() => game.pause()}
        onGameResume={() => game.resume()}
      />
      <Footer
        soundEnabled={settings.sound}
        onSoundEnablePress={enableSound}
        onSoundDisablePress={disableSound}
        onStatsPress={() => setStatsOpen(true)}
        onHelpPress={() => setHelpOpen(true)}
        onSettingsPress={() => setSettingsOpen(true)}
      />
      <StatsDialog
        isOpen={isStatsOpen}
        onOpenChange={setStatsOpen}
        stats={stats}
        onClearStatsPress={clearStats}
      />
      <HelpDialog isOpen={isHelpOpen} onOpenChange={setHelpOpen} />
      <SettingsDialog
        isOpen={isSettingsOpen}
        onOpenChange={setSettingsOpen}
        defaultSettings={settings}
        onSettingsSave={setSettings}
        stats={stats}
      />
    </AppContainer>
  );
}
