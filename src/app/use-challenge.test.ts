import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';

import { DEFAULT_CHALLENGE_SETTINGS } from '@/challenge-settings/challenge-settings.schema';

import { useChallenge } from './use-challenge';

describe('useChallenge', () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: 0 });
  });

  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  it('should have empty challenge on initialization', () => {
    const { result } = renderHook(() => useChallenge());

    expect(result.current.current).toBe(null);
    expect(result.current.hasCurrent).toBe(false);
  });

  it('should create a new challenge', () => {
    const { result } = renderHook(() => useChallenge());

    act(() => {
      result.current.create(DEFAULT_CHALLENGE_SETTINGS, 0);
    });

    expect(result.current.current).toStrictEqual({
      settings: {
        timeLimit: 3,
        showNumbers: true,
        image: null,
      },
      status: 'countdown',
      imageMetadata: undefined,
      score: 0,
      bestScore: 0,
      timeLeft: 180_000,
      timeLeftInSeconds: 180,
    });
    expect(result.current.hasCurrent).toBe(true);
  });

  it('should start a created challenge', () => {
    const { result } = renderHook(() => useChallenge());

    act(() => {
      result.current.create(DEFAULT_CHALLENGE_SETTINGS, 0);
      result.current.start();
    });

    expect(result.current.current?.status).toBe('active');
    expect(result.current.current?.timeLeft).toBe(180_000);
  });

  it('should decrease time left', () => {
    const { result } = renderHook(() => useChallenge());

    act(() => {
      result.current.create(DEFAULT_CHALLENGE_SETTINGS, 0);
      result.current.start();
      vi.advanceTimersByTime(10_000);
    });

    expect(result.current.current?.timeLeft).toBe(170_000);
    expect(result.current.current?.timeLeftInSeconds).toBe(170);
  });

  it('should decrease time left only when challenge is active', () => {
    const { result } = renderHook(() => useChallenge());

    act(() => {
      result.current.create(DEFAULT_CHALLENGE_SETTINGS, 0);
      vi.advanceTimersByTime(10_000);
    });

    expect(result.current.current?.timeLeft).toBe(180_000);
    expect(result.current.current?.timeLeftInSeconds).toBe(180);
  });

  it('should not let time left go into negative', () => {
    const { result } = renderHook(() => useChallenge());

    act(() => {
      result.current.create(DEFAULT_CHALLENGE_SETTINGS, 0);
      result.current.start();
      vi.advanceTimersByTime(190_000);
    });

    expect(result.current.current?.timeLeft).toBe(0);
    expect(result.current.current?.timeLeftInSeconds).toBe(0);
  });

  it('should increase score by one', () => {
    const { result } = renderHook(() => useChallenge());

    act(() => {
      result.current.create(DEFAULT_CHALLENGE_SETTINGS, 0);
      result.current.start();
      result.current.increaseScore();
    });

    expect(result.current.current?.score).toBe(1);
  });

  it('should end challenge', () => {
    const { result } = renderHook(() => useChallenge());

    act(() => {
      result.current.create(DEFAULT_CHALLENGE_SETTINGS, 0);
      result.current.start();
      result.current.end();
    });

    expect(result.current.current).toBe(null);
  });
});
