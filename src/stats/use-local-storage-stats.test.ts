import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';

import { STATS_STORAGE_KEY } from './constants';
import { type Stats, DEFAULT_STATS } from './stats.schema';
import { useLocalStorageStats } from './use-local-storage-stats';

describe('useLocalStorageStats', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should return default value when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual(DEFAULT_STATS);
  });

  it('should return fully parsed and validated stats data', () => {
    const data = {
      3: { best: 600, average: 700, games: 15, images: ['car'] },
      4: { best: 1200, average: 1300, games: 10, images: ['cat'] },
    } satisfies Stats;

    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(data));

    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual(data);
  });

  it('should fail data validation and return default stats', () => {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(['corrupt data']));

    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual(DEFAULT_STATS);
  });

  it('should use default stats entry values instead of failing validation', () => {
    localStorage.setItem(
      STATS_STORAGE_KEY,
      JSON.stringify({ 4: { best: 1200, average: 1300, games: 10 } }),
    );

    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: [] },
    });
  });

  it('should persist new stats data to local storage', () => {
    const data = {
      3: { best: 600, average: 700, games: 15, images: ['car'] },
    } satisfies Stats;

    JSON.parse(localStorage.getItem(STATS_STORAGE_KEY)!);

    const { result } = renderHook(() => useLocalStorageStats());

    act(() => {
      result.current[1](data);
    });

    const parsed = JSON.parse(localStorage.getItem(STATS_STORAGE_KEY)!);

    expect(parsed).toStrictEqual(data);
  });
});
