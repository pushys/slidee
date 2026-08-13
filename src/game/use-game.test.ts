import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';

import { Game } from './game';
import { useGame } from './use-game';

const SEQUENCE = [1, 5, 3, 7, 6, 0, 4, 2, 8];

describe('useGame', () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: 0 });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize a new game instance', () => {
    const { result } = renderHook(() => useGame({ defaultBoardSize: 3 }));

    expect(result.current.state).toStrictEqual({
      board: SEQUENCE,
      moves: 0,
      status: Game.Status.Idle,
      isAutoSolved: false,
    });
  });

  it('should update state when subscribed', () => {
    const { result } = renderHook(() => useGame({ defaultBoardSize: 3 }));

    act(() => {
      result.current.game.solve();
    });

    expect(result.current.state).toStrictEqual({
      board: [1, 2, 3, 4, 5, 6, 7, 8, 0],
      moves: 0,
      status: Game.Status.Over,
      isAutoSolved: true,
    });
  });

  it('should track total play time', () => {
    const { result } = renderHook(() => useGame({ defaultBoardSize: 3 }));

    vi.advanceTimersByTime(2000);

    act(() => {
      result.current.game.moveTile(6);
    });

    vi.advanceTimersByTime(3000);

    act(() => {
      result.current.game.pause();
    });

    vi.advanceTimersByTime(1000);

    act(() => {
      result.current.game.resume();
    });

    vi.advanceTimersByTime(2000);

    act(() => {
      result.current.game.solve();
    });

    expect(result.current.totalPlayTime).toBe(5000);
  });
});
