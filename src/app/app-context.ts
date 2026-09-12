import {
  useContext,
  createContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

import type { useGame } from '@/shared/lib/game/use-game';

import type { useChallenge } from './features/challenge';
import type { useDialog } from './features/dialog';
import type { useSettings } from './features/settings';
import type { useStats } from './features/stats';

export interface AppContext {
  isImagePreviewing: boolean;
  setImagePreviewing: Dispatch<SetStateAction<boolean>>;
  dialog: useDialog.ReturnValue;
  settings: useSettings.ReturnValue;
  stats: useStats.ReturnValue;
  challenge: useChallenge.ReturnValue;
  game: useGame.ReturnValue;
  startViewTransition: (callback: () => void) => void;
}

export const AppContext = createContext<AppContext | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      'AppContext is missing. App parts must be placed within <AppProvider>.',
    );
  }
  return context;
}
