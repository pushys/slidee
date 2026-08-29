import { useCallback } from 'react';

import { Board as BoardView } from '@/components/board';
import { Tile } from '@/components/tile';

import { useAppContext } from '../app-context';

export const Board = () => {
  const {
    dialog,
    isImagePreviewing,
    settings: { settings, imageMetadata },
    game,
    startViewTransition,
  } = useAppContext();

  const renderTile = useCallback(
    (tile: number, index: number) => (
      <Tile
        key={tile}
        value={tile}
        isSolved={tile === index + 1}
        isViewTransitionDisabled={!!dialog}
        {...(game.isTileMovable(tile) && {
          onPress: () => startViewTransition(() => game.moveTile(tile)),
        })}
      />
    ),
    [dialog, game, startViewTransition],
  );

  return (
    <BoardView
      tiles={game.state.board}
      gameStatus={game.state.status}
      imageSrc={imageMetadata?.image}
      previewImageSrc={imageMetadata?.preview}
      imageAttribution={imageMetadata?.attribution}
      renderTile={renderTile}
      isKeyboardDisabled={!!dialog}
      isSoundDisabled={!settings?.sound}
      isConfettiDisabled={!settings.confetti}
      isNumbersVisible={settings.showNumbers}
      isImagePreviewActive={isImagePreviewing}
      onNewGame={() => startViewTransition(() => game.init())}
      onTileMove={(dir) => startViewTransition(() => game.move(dir))}
      onGamePause={() => game.pause()}
      onGameResume={() => game.resume()}
    />
  );
};
