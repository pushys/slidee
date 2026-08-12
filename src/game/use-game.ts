import { useState, useEffect } from 'react';
import { useIntervalWhen } from 'rooks';

import { Game } from './game';

interface UseGameReturnValue {
  game: Omit<Game, 'state' | 'totalPlayTime'>;
  state: Game.State;
  totalPlayTime: number;
}

/**
 * A hook wrapper around `Game`.
 *
 * @param opts
 */
export function useGame(opts: Game.Options = {}): UseGameReturnValue {
  const [game, setGame] = useState(() => new Game(opts));
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

  // Re-initialize game instance once board size changes.
  useEffect(() => {
    if (game.boardSize === opts.boardSize) return;

    const newGame = new Game({ boardSize: opts.boardSize });

    setGame(newGame);
    setState(newGame.state);
    setTotalPlayTime(0);
  }, [game, opts.boardSize]);

  return { game, state, totalPlayTime };
}
