import { useState, useEffect, useMemo, useEffectEvent } from 'react';
import { useIntervalWhen } from 'rooks';

import { Game } from '@/shared/lib/game/game';
import { soundManager } from '@/shared/lib/sound-manager';

export function useGame(props: useGame.Props = {}): useGame.ReturnValue {
  const { defaultBoardSize, onOver } = props;

  const [game] = useState(() => new Game({ boardSize: defaultBoardSize }));
  const [state, setState] = useState(() => game.state);
  const [totalPlayTime, setTotalPlayTime] = useState(0);

  const handleGameEvent = useEffectEvent((event: Game.Event) => {
    setState(event.state);
    setTotalPlayTime(game.totalPlayTime);

    switch (event.type) {
      case 'init':
        soundManager.play('shuffle');
        break;
      case 'move':
        soundManager.play('move');
        break;
      case 'over':
        onOver?.();
        soundManager.play('win');
        break;
      case 'solve':
        soundManager.play('win');
        break;
    }
  });

  // Update total play time every second when the game is in progress.
  useIntervalWhen(
    () => setTotalPlayTime(game.totalPlayTime),
    1000,
    state.status === Game.Status.Playing,
    true,
  );

  // Subscribe to game state changes.
  useEffect(() => {
    const unsubscribe = game.subscribe(handleGameEvent);
    return () => unsubscribe();
  }, [game]);

  return useMemo(
    () => ({
      state,
      totalPlayTime,
      init: game.init,
      pause: game.pause,
      resume: game.resume,
      solve: game.solve,
      move: game.move,
      moveTile: game.moveTile,
      isTileMovable: game.isTileMovable,
    }),
    [game, state, totalPlayTime],
  );
}

export namespace useGame {
  export interface Props {
    /**
     * Default board size.
     */
    defaultBoardSize?: Game.BoardSize;
    /**
     * Game over event handler.
     */
    onOver?: () => void;
  }

  export type ReturnValue = Pick<
    Game,
    | 'state'
    | 'totalPlayTime'
    | 'init'
    | 'pause'
    | 'resume'
    | 'solve'
    | 'move'
    | 'moveTile'
    | 'isTileMovable'
  >;
}
