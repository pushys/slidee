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

  it('should return only valid stats entries data', () => {
    localStorage.setItem(
      STATS_STORAGE_KEY,
      JSON.stringify({
        3: { best: '600', average: false, games: 0x23, images: [] },
        4: { best: 1200, average: 1300, games: 10, images: ['cat'] },
      }),
    );

    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: ['cat'] },
    } satisfies Stats);
  });

  it('should ignore non-existent board size stats entries', () => {
    localStorage.setItem(
      STATS_STORAGE_KEY,
      JSON.stringify({
        2: { best: 100, average: 120, games: 4, images: [] },
        4: { best: 1200, average: 1300, games: 10, images: ['cat'] },
        7: { best: 450, average: 500, games: 23, images: ['galaxy'] },
      }),
    );

    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: ['cat'] },
    } satisfies Stats);
  });

  it('should fail data validation entirely and return default stats', () => {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(['corrupt data']));

    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual(DEFAULT_STATS);
  });

  it('should substitute missing stats entry values with default ones', () => {
    localStorage.setItem(
      STATS_STORAGE_KEY,
      JSON.stringify({ 4: { best: 1200, average: 1300, games: 10 } }),
    );

    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: [] },
    } satisfies Stats);
  });

  it('should substitute invalid stats entry values with default ones', () => {
    localStorage.setItem(
      STATS_STORAGE_KEY,
      JSON.stringify({
        4: {
          best: 1200,
          average: 1300,
          games: 10,
          images: 'invalid_array',
        },
      }),
    );

    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: [] },
    } satisfies Stats);
  });

  it('should try to save valid image keys', () => {
    localStorage.setItem(
      STATS_STORAGE_KEY,
      JSON.stringify({
        4: {
          best: 1200,
          average: 1300,
          games: 10,
          images: ['building', 'invalid_image'],
        },
      }),
    );

    const { result } = renderHook(() => useLocalStorageStats());

    expect(result.current[0]).toStrictEqual({
      4: { best: 1200, average: 1300, games: 10, images: ['building'] },
    } satisfies Stats);
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
