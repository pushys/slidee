import { useState, useEffect } from 'react';
import { useIntervalWhen } from 'rooks';

import { Game } from './game';

/**
 * A hook wrapper around `Game`.
 *
 * @param opts
 */
export function useGame(props: useGame.Props = {}): useGame.ReturnValue {
  const { defaultBoardSize } = props;

  const [game] = useState(() => new Game({ boardSize: defaultBoardSize }));
  const [state, setState] = useState(() => game.state);
  const [totalPlayTime, setTotalPlayTime] = useState(0);

  // Update total play time every second when the game is in progress.
  useIntervalWhen(
    () => setTotalPlayTime(game.totalPlayTime),
    1000,
    state.status === Game.Status.Playing,
    true,
  );

  // Subscribe to game state changes.
  useEffect(() => {
    const unsubscribe = game.subscribe((nextState) => {
      setState(nextState);
      setTotalPlayTime(game.totalPlayTime);
    });

    return () => unsubscribe();
  }, [game]);

  return { game, state, totalPlayTime };
}

export namespace useGame {
  export interface Props {
    defaultBoardSize?: Game.BoardSize;
  }

  export interface ReturnValue {
    game: Omit<Game, 'state' | 'totalPlayTime'>;
    state: Game.State;
    totalPlayTime: number;
  }
}
