import { Controls as ControlsView } from '@/components/controls';
import { Game } from '@/shared/lib/game/game';

import { useAppContext } from '../app-context';

export const Controls = () => {
  const {
    dialog: { open },
    settings: {
      settings,
      imageMetadata,
      isFirstImage,
      isLastImage,
      setBoardSize,
      toggleMode,
      randomImage,
      previousImage,
      nextImage,
    },
    challenge: { hasCurrent, quit },
    board,
    game,
    startViewTransition,
  } = useAppContext();

  let mode: ControlsView.Mode = 'numbers';

  if (imageMetadata !== undefined) {
    mode = 'image';
  }

  if (hasCurrent) {
    mode = 'challenge';
  }

  const handleModeChange = (newMode: ControlsView.Mode) => {
    if (newMode === 'challenge') {
      return open('challenge-settings');
    }

    quit();
    startViewTransition(toggleMode);
  };

  return (
    <ControlsView
      boardSize={settings.boardSize}
      onBoardSizeChange={(s) => startViewTransition(() => setBoardSize(s))}
      mode={mode}
      onModeChange={handleModeChange}
      onRandomImagePress={() => startViewTransition(randomImage)}
      onPreviousImagePress={() => startViewTransition(previousImage)}
      onNextImagePress={() => startViewTransition(nextImage)}
      onPreviewImagePressStart={board.startImagePreview}
      onPreviewImagePressEnd={board.stopImagePreview}
      isPreviousImageButtonDisabled={isFirstImage}
      isNextImageButtonDisabled={isLastImage}
      isPreviewImageButtonDisabled={game.state.status === Game.Status.Over}
      isImagePreviewing={board.isImagePreviewing}
    />
  );
};
