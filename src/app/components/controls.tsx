import { Controls as ControlsView } from '@/components/controls';
import { Game } from '@/game/game';

import { useAppContext } from '../app-context';

export const Controls = () => {
  const {
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
    game,
    isImagePreviewing,
    setImagePreviewing,
    startViewTransition,
  } = useAppContext();

  return (
    <ControlsView
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
  );
};
