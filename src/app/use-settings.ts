import { sample, drop } from 'es-toolkit';
import { useCallback, type Dispatch, type SetStateAction } from 'react';

import type { Settings } from '@/settings/settings.schema';
import type { ImageMetadata } from '@/shared/types';

import { images, type ImageKeys } from '@/assets/images';
import { Game } from '@/game/game';
import { useLocalStorageSettings } from '@/settings/use-local-storage-settings';

const imageKeys = Object.keys(images) as unknown as ImageKeys[];

// Keep history of randomly selected images to exclude them
// when selecting a new one to avoid repeating too often.
let recentImages: ImageKeys[] = [];

const MAX_RECENT_IMAGES = 10;

export function useSettings(): useSettings.ReturnValue {
  const [settings, setSettings] = useLocalStorageSettings();

  const imageMetadata = settings.image ? images[settings.image] : undefined;
  const imageIndex = imageKeys.findIndex((i) => i === settings.image);
  const isFirstImage = imageIndex === 0;
  const isLastImage = imageIndex === imageKeys.length - 1;

  const enableSound = useCallback(() => {
    setSettings((prevSettings) => ({ ...prevSettings, sound: true }));
  }, [setSettings]);

  const disableSound = useCallback(() => {
    setSettings((prevSettings) => ({ ...prevSettings, sound: false }));
  }, [setSettings]);

  const setBoardSize = useCallback(
    (boardSize: Game.BoardSize) => {
      setSettings((prevSettings) => ({ ...prevSettings, boardSize }));
    },
    [setSettings],
  );

  const randomImage = useCallback(() => {
    setSettings((prevSettings) => {
      let newImage: ImageKeys;

      // Re-sample image until it isn't among recently used or matches previous.
      do {
        newImage = sample(imageKeys);
      } while (
        recentImages.includes(newImage) ||
        newImage === prevSettings.image
      );

      if (recentImages.length === MAX_RECENT_IMAGES) {
        recentImages = [...drop(recentImages, 1), newImage];
      } else {
        recentImages.push(newImage);
      }

      return {
        ...prevSettings,
        image: newImage,
      };
    });
  }, [setSettings]);

  const previousImage = useCallback(() => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      image: imageKeys[imageIndex - 1],
    }));
  }, [setSettings, imageIndex]);

  const nextImage = useCallback(() => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      image: imageKeys[imageIndex + 1],
    }));
  }, [setSettings, imageIndex]);

  const toggleMode = useCallback(() => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      image: prevSettings.image !== null ? null : imageKeys[0],
    }));
  }, [setSettings]);

  return {
    settings,
    setSettings,
    imageMetadata,
    isFirstImage,
    isLastImage,
    enableSound,
    disableSound,
    setBoardSize,
    randomImage,
    previousImage,
    nextImage,
    toggleMode,
  };
}

export namespace useSettings {
  export interface ReturnValue {
    settings: Settings;
    setSettings: Dispatch<SetStateAction<Settings>>;
    imageMetadata: ImageMetadata | undefined;
    isFirstImage: boolean;
    isLastImage: boolean;
    enableSound: () => void;
    disableSound: () => void;
    setBoardSize: (boardSize: Game.BoardSize) => void;
    randomImage: () => void;
    previousImage: () => void;
    nextImage: () => void;
    toggleMode: () => void;
  }
}
