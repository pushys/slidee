import { useCallback } from 'react';

import { Board as BoardView } from '@/components/board';
import { Tile } from '@/components/tile';
import { ChallengeStatus } from '@/shared/lib/challenge/challenge.schema';

import { useAppContext } from '../app-context';

export const Board = () => {
  const {
    isImagePreviewing,
    dialog: { isOpen },
    settings: { settings, imageMetadata },
    challenge: { current, start },
    game,
    startViewTransition,
  } = useAppContext();

  const renderTile = useCallback(
    (tile: number, index: number) => (
      <Tile
        key={tile}
        value={tile}
        isSolved={tile === index + 1}
        isViewTransitionDisabled={isOpen}
        {...(game.isTileMovable(tile) && {
          onPress: () => startViewTransition(() => game.moveTile(tile)),
        })}
      />
    ),
    [isOpen, game, startViewTransition],
  );

  return (
    <BoardView
      renderTile={renderTile}
      // Game state.
      tiles={game.state.board}
      gameStatus={game.state.status}
      onNewGame={() => startViewTransition(() => game.init())}
      onTileMove={(dir) => startViewTransition(() => game.move(dir))}
      onGamePause={() => game.pause()}
      onGameResume={() => game.resume()}
      // Settings.
      imageSrc={imageMetadata?.image}
      previewImageSrc={imageMetadata?.preview}
      imageAttribution={imageMetadata?.attribution}
      isKeyboardDisabled={isOpen}
      isConfettiDisabled={!settings.confetti}
      isNumbersVisible={settings.showNumbers}
      isImagePreviewActive={isImagePreviewing}
      // Settings overridden when current challenge is in place.
      {...(current && {
        imageSrc: current.imageMetadata?.image,
        previewImageSrc: current.imageMetadata?.preview,
        isConfettiDisabled: true,
        isNumbersVisible: current.settings.showNumbers,
        isCountdownEnabled: current.status === ChallengeStatus.Countdown,
        onCountdownComplete: () => start(),
      })}
    />
  );
};
