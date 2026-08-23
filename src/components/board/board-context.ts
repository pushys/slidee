import { useContext, createContext } from 'react';

import { Game } from '@/game/game';

export interface BoardContext {
  size: Game.BoardSize;
  gameStatus: Game.Status;
  hasImage: boolean;
  isNumbersVisible: boolean;
  isCursorHidden: boolean;
}

export const BoardContext = createContext<BoardContext>({
  size: Game.DEFAULT_BOARD_SIZE,
  gameStatus: Game.Status.Idle,
  hasImage: false,
  isNumbersVisible: true,
  isCursorHidden: false,
});

export function useBoardContext() {
  return useContext(BoardContext);
}
