import { omit } from 'es-toolkit';
import { useCallback } from 'react';

import type { ImageKeys } from '@/assets/images';
import type { Stats, StatsEntry } from '@/stats/types';

import { Game } from '@/game/game';
import { useStats as useStatsStorage } from '@/stats/use-stats';

export function useStats(): useStats.ReturnValue {
  const [stats, setStats] = useStatsStorage();

  const updateStats = useCallback(
    ({ boardSize, totalPlayTime, image }: useStats.UpdateStatePayload) =>
      setStats((prevStats) => {
        const entry = prevStats[boardSize];

        let newEntry: StatsEntry;

        if (entry) {
          const newGameCount = entry.games + 1;

          newEntry = {
            best: totalPlayTime < entry.best ? totalPlayTime : entry.best,
            average:
              (entry.average * entry.games + totalPlayTime) / newGameCount,
            games: newGameCount,
            images: entry.images,
          };

          if (image) {
            const wasImageSolved = entry.images.includes(image);

            if (!wasImageSolved) {
              newEntry.images = [...newEntry.images, image];
            }
          }
        } else {
          newEntry = {
            best: totalPlayTime,
            average: totalPlayTime,
            games: 1,
            images: image ? [image] : [],
          };
        }

        return { ...prevStats, [boardSize]: newEntry };
      }),
    [setStats],
  );

  const clearStats = useCallback(
    (boardSize?: Game.BoardSize) => {
      if (boardSize) {
        return setStats((prevStats) => omit(prevStats, [boardSize]));
      }
      return setStats({});
    },
    [setStats],
  );

  return [stats, updateStats, clearStats];
}

export namespace useStats {
  export interface UpdateStatePayload {
    boardSize: Game.BoardSize;
    totalPlayTime: number;
    image: ImageKeys | null;
  }

  export type ReturnValue = [
    Stats,
    (data: UpdateStatePayload) => void,
    (boardSize?: Game.BoardSize) => void,
  ];
}
