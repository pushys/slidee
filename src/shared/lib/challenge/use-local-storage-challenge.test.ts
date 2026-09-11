import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';

import type { Challenge } from './challenge.schema';

import { CHALLENGE_STORAGE_KEY } from './constants';
import { useLocalStorageChallenge } from './use-local-storage-challenge';

describe('useLocalStorageChallenge', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should return default challenge when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorageChallenge());

    expect(result.current[0]).toBe(null);
  });

  it('should persist new challenge data to local storage', () => {
    const data = {
      settings: { timeLimit: 5, showNumbers: false, image: null },
      status: 'countdown',
      score: 1,
      bestScore: 0,
      endTime: Date.now() + 1000 * 60,
    } satisfies Challenge;

    const { result } = renderHook(() => useLocalStorageChallenge());

    act(() => {
      result.current[1](data);
    });

    const parsed = JSON.parse(localStorage.getItem(CHALLENGE_STORAGE_KEY)!);

    expect(parsed).toStrictEqual(data);
  });
});
