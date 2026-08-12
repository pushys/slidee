import type { Game } from '@/game/game';

export interface StatsEntry {
  /**
   * Best time for this board size.
   */
  best: number;
  /**
   * Average time for this board size.
   */
  average: number;
  /**
   * Total number of games for this board size.
   */
  games: number;
}

/**
 * A map of player's stats per board size.
 */
export type Stats = Partial<Record<Game.BoardSize, StatsEntry>>;
