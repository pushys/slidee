import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';

import { STATS_STORAGE_KEY } from './constants';
import { type Stats, DEFAULT_STATS } from './stats.schema';
import { useLocalStorageStats } from './use-local-storage-stats';

describe('useLocalStorageStats', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should return default stats when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual(DEFAULT_STATS);
  });

  it('should persist new stats data to local storage', () => {
    const stats = {
      board: {
        3: { best: 600, average: 700, games: 15, images: ['car'] },
      },
      challenge: { bestScore: 0 },
    } satisfies Stats;

    const { result } = renderHook(() => useLocalStorageStats());

    act(() => {
      result.current[1](stats);
    });

    const parsed = JSON.parse(localStorage.getItem(STATS_STORAGE_KEY)!);

    expect(parsed).toStrictEqual(stats);
  });
});
