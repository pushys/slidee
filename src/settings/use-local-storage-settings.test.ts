import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';

import { SETTINGS_STORAGE_KEY } from './constants';
import { type Settings, DEFAULT_SETTINGS } from './settings.schema';
import { useLocalStorageSettings } from './use-local-storage-settings';

describe('useLocalStorageSettings', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should return default settings when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorageSettings());

    expect(result.current[0]).toStrictEqual(DEFAULT_SETTINGS);
  });

  it('should return fully parsed and validated settings', () => {
    const data = {
      sound: false,
      boardSize: 3,
      confetti: false,
      animations: false,
      showNumbers: true,
      image: 'building',
    } satisfies Settings;

    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(data));

    const { result } = renderHook(() => useLocalStorageSettings());

    expect(result.current[0]).toStrictEqual(data);
  });

  it('should fail data validation and return default settings', () => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(['corrupt data']),
    );

    const { result } = renderHook(() => useLocalStorageSettings());

    expect(result.current[0]).toStrictEqual(DEFAULT_SETTINGS);
  });

  it('should use default setting values instead of failing validation', () => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({ boardSize: 5, image: 'building' }),
    );

    const { result } = renderHook(() => useLocalStorageSettings());

    expect(result.current[0]).toStrictEqual({
      sound: true,
      boardSize: 5,
      confetti: true,
      animations: true,
      showNumbers: true,
      image: 'building',
    } satisfies Settings);
  });

  it('should persist new settings data to local storage', () => {
    const settings = {
      sound: false,
      boardSize: 5,
      confetti: false,
      animations: false,
      showNumbers: true,
      image: 'beer',
    } satisfies Settings;

    JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY)!);

    const { result } = renderHook(() => useLocalStorageSettings());

    act(() => {
      result.current[1](settings);
    });

    const parsed = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY)!);

    expect(parsed).toStrictEqual(settings);
  });
});
