import { Controls as ControlsView } from '@/components/controls';
import { Game } from '@/shared/lib/game/game';

import { useAppContext } from '../app-context';

export const Controls = () => {
  const {
    openDialog,
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
    challenge: { hasCurrent, end },
    game,
    isImagePreviewing,
    setImagePreviewing,
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
      return openDialog('challenge-settings');
    }

    end();
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
      onPreviewImagePressStart={() => setImagePreviewing(true)}
      onPreviewImagePressEnd={() => setImagePreviewing(false)}
      isPreviousImageButtonDisabled={isFirstImage}
      isNextImageButtonDisabled={isLastImage}
      isPreviewImageButtonDisabled={game.state.status === Game.Status.Over}
      isImagePreviewing={isImagePreviewing}
    />
  );
};
