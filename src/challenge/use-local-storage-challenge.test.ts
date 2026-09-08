import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';

import { DEFAULT_CHALLENGE_SETTINGS } from '@/challenge-settings/challenge-settings.schema';

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

  it('should return fully parsed and validated challenge', () => {
    const data = {
      settings: DEFAULT_CHALLENGE_SETTINGS,
      status: 'active',
      score: 23,
      endTime: Date.now() + 1_000 * 60,
    } satisfies Challenge;

    localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(data));

    const { result } = renderHook(() => useLocalStorageChallenge());

    expect(result.current[0]).toStrictEqual(data);
  });

  it('should fail data validation and return default challenge', () => {
    localStorage.setItem(
      CHALLENGE_STORAGE_KEY,
      JSON.stringify(['corrupt data']),
    );

    const { result } = renderHook(() => useLocalStorageChallenge());

    expect(result.current[0]).toStrictEqual(null);
  });

  it('should persist new challenge data to local storage', () => {
    const data = {
      settings: { timeLimit: 5, showNumbers: false, image: null },
      status: 'countdown',
      score: 0,
      endTime: Date.now() + 1_000 * 60,
    } satisfies Challenge;

    JSON.parse(localStorage.getItem(CHALLENGE_STORAGE_KEY)!);

    const { result } = renderHook(() => useLocalStorageChallenge());

    act(() => {
      result.current[1](data);
    });

    const parsed = JSON.parse(localStorage.getItem(CHALLENGE_STORAGE_KEY)!);

    expect(parsed).toStrictEqual(data);
  });
});
