import { sample } from 'es-toolkit';
import { useState, useEffect, useEffectEvent, useRef } from 'react';
import { useDidUpdate } from 'rooks';

import type { StatsEntry } from '@/stats/types';

import { images, type ImageKeys } from '@/assets/images';
import { AppContainer } from '@/components/app-container';
import { Board } from '@/components/board';
import { Controls, type Mode } from '@/components/controls';
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

const imageKeys = Object.keys(images) as unknown as ImageKeys[];

/**
 * Main orchestration component of the app.
 */
export function App() {
  const [isStatsOpen, setStatsOpen] = useState(false);
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isImagePreviewing, setImagePreviewing] = useState(false);

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

  const isDialogOpen = isStatsOpen || isHelpOpen || isSettingsOpen;

  // Update player's stats when game is over.
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

  useEffect(() => {
    if (state.status === Game.Status.Over) {
      updateStats();
    }
  }, [state.status]);

  // Pause the game if it's playing when any dialog opens.
  const pauseGame = useEffectEvent(() => game.pause());
  const resumeGame = useEffectEvent(() => game.resume());

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
  useDidUpdate(() => {
    game.init({ boardSize: settings.boardSize });
  }, [settings.boardSize, settings.image]);

  const handleClearStatsPress = (boardSize?: Game.BoardSize) => {
    if (boardSize) {
      return setStats((prevStats) => ({
        ...prevStats,
        [boardSize]: undefined,
      }));
    }
    return setStats({});
  };

  const image = settings.image ? images[settings.image] : undefined;
  const imageIndex = imageKeys.findIndex((i) => i === settings.image);

  const handleRandomImagePress = () => {
    let newImage: ImageKeys;

    // Re-sample image until it doesn't match the old one.
    do {
      newImage = sample(imageKeys);
    } while (settings.image === newImage);

    startViewTransition(() => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        image: newImage,
      }));
    });
  };

  const handlePreviousImagePress = () => {
    startViewTransition(() => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        image: imageKeys[imageIndex - 1],
      }));
    });
  };

  const handleNextImagePress = () => {
    startViewTransition(() => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        image: imageKeys[imageIndex + 1],
      }));
    });
  };

  const handleModeChange = (mode: Mode) => {
    startViewTransition(() => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        image: mode === 'numbers' ? null : imageKeys[0],
      }));
    });
  };

  const handleBoardSizeChange = (boardSize: Game.BoardSize) => {
    startViewTransition(() => {
      setSettings((prevSettings) => ({ ...prevSettings, boardSize }));
    });
  };

  return (
    <AppContainer
      compact
      controls={
        <Controls
          boardSize={settings.boardSize}
          onBoardSizeChange={handleBoardSizeChange}
          mode={image ? 'image' : 'numbers'}
          onModeChange={handleModeChange}
          onRandomImagePress={handleRandomImagePress}
          onPreviousImagePress={handlePreviousImagePress}
          onNextImagePress={handleNextImagePress}
          onPreviewImagePressStart={() => setImagePreviewing(true)}
          onPreviewImagePressEnd={() => setImagePreviewing(false)}
          isPreviousImageButtonDisabled={imageIndex === 0}
          isNextImageButtonDisabled={imageIndex === imageKeys.length - 1}
          isPreviewImageButtonDisabled={state.status === Game.Status.Over}
          isImagePreviewing={isImagePreviewing}
        />
      }
    >
      <Toolbar
        gameStatus={state.status}
        moves={state.moves}
        elapsedTime={totalPlayTime}
        personalBestTime={stats[settings.boardSize]?.best}
        isAutoSolved={state.isAutoSolved}
        onShufflePress={() => startViewTransition(() => game.init())}
        onPausePress={() => game.pause()}
        onResumePress={() => game.resume()}
        onSolvePress={() => startViewTransition(() => game.solve())}
      />
      <Board
        tiles={state.board}
        gameStatus={state.status}
        image={image?.image}
        imageAttribution={image?.attribution}
        renderTile={(tile, index) => (
          <Tile
            key={`${settings.boardSize}-${tile}`}
            value={tile}
            isSolved={tile === index + 1}
            isPressable={game.isTileMovable(tile)}
            isViewTransitionDisabled={isDialogOpen}
            onPress={() => startViewTransition(() => game.moveTile(tile))}
          />
        )}
        isKeyboardDisabled={isDialogOpen}
        isSoundDisabled={!settings?.sound}
        isConfettiDisabled={!settings.confetti}
        isNumbersVisible={settings.showNumbers}
        isTileGapVisible={!settings.image ? true : settings.tileGap}
        isImagePreviewActive={isImagePreviewing}
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
        onClearStatsPress={handleClearStatsPress}
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
