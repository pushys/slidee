import { useCallback, useRef, type RefObject } from 'react';

/**
 * A hook wrapper around `Element: animate()` method.
 *
 * @param keyframes
 * @param options
 */
export function useAnimate<T extends HTMLElement = HTMLElement>(
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
  options: number | KeyframeAnimationOptions,
): [RefObject<T | null>, () => Animation | undefined] {
  const ref = useRef<T | null>(null);

  const animate = useCallback(
    () => ref.current?.animate(keyframes, options),
    [keyframes, options],
  );

  return [ref, animate];
}
