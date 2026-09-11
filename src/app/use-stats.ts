import { omit } from 'es-toolkit';
import { useCallback, useMemo } from 'react';

import type { ImageKey } from '@/assets/images';
import type { TimeLimit } from '@/shared/lib/challenge-settings/time-limit.schema';
import type { BoardStatsEntry } from '@/shared/lib/stats/board-stats.schema';
import type { Stats } from '@/shared/lib/stats/stats.schema';

import { Game } from '@/shared/lib/game/game';
import { useLocalStorageStats } from '@/shared/lib/stats/use-local-storage-stats';

export function useStats(): useStats.ReturnValue {
  const [stats, setStats] = useLocalStorageStats();

  const updateBoardStats = useCallback(
    ({ boardSize, totalPlayTime, image }: useStats.UpdateBoardStatsPayload) => {
      setStats((prevStats) => {
        const entry = prevStats.board[boardSize];

        let newEntry: BoardStatsEntry;

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

        return {
          ...prevStats,
          board: { ...prevStats.board, [boardSize]: newEntry },
        };
      });
    },
    [setStats],
  );

  const clearBoardStats = useCallback(
    (boardSize?: Game.BoardSize) => {
      if (boardSize) {
        return setStats((prevStats) => ({
          ...prevStats,
          board: omit(prevStats.board, [boardSize]),
        }));
      }
      return setStats((prevStats) => ({ ...prevStats, board: {} }));
    },
    [setStats],
  );

  const updateChallengeStats = useCallback(
    ({ timeLimit, score }: useStats.UpdateChallengeStatsPayload) => {
      setStats((prevStats) => {
        const prevChallenge = prevStats.challenge[timeLimit];

        // Ignore challenge stats update if there isn't new best score.
        if (prevChallenge && prevChallenge.bestScore >= score) {
          return prevStats;
        }

        return {
          ...prevStats,
          challenge: {
            ...prevStats.challenge,
            [timeLimit]: { bestScore: score },
          },
        };
      });
    },
    [setStats],
  );

  return useMemo(
    () => ({ stats, updateBoardStats, clearBoardStats, updateChallengeStats }),
    [stats, updateBoardStats, clearBoardStats, updateChallengeStats],
  );
}

export namespace useStats {
  export interface UpdateBoardStatsPayload {
    boardSize: Game.BoardSize;
    totalPlayTime: number;
    image: ImageKey | null;
  }

  export interface UpdateChallengeStatsPayload {
    timeLimit: TimeLimit;
    score: number;
  }

  export interface ReturnValue {
    stats: Stats;
    updateBoardStats: (data: UpdateBoardStatsPayload) => void;
    clearBoardStats: (boardSize?: Game.BoardSize) => void;
    updateChallengeStats: (data: UpdateChallengeStatsPayload) => void;
  }
}
