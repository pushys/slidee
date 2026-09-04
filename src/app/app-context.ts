import {
  useContext,
  createContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

import type { useGame } from '@/game/use-game';

import type { useSettings } from './use-settings';
import type { useStats } from './use-stats';

export interface AppContext {
  dialog: AppContext.Dialog | null;
  isDialogOpen: boolean;
  openDialog: (dialog: AppContext.Dialog) => void;
  closeDialog: () => void;
  isImagePreviewing: boolean;
  setImagePreviewing: Dispatch<SetStateAction<boolean>>;
  settings: useSettings.ReturnValue;
  stats: useStats.ReturnValue;
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

export namespace AppContext {
  export type Dialog = 'settings' | 'stats' | 'help';
}
