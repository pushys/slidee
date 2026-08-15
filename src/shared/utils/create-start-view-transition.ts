import { flushSync } from 'react-dom';

const MIN_INTERVAL_MS = 40;

let lastTransitionAt: number | null = null;

/**
 * View transitions API's `startViewTransition` function factory.
 *
 * @param isEnabled Whether to enable transitions.
 * @returns A function to start a view transition.
 */
export function createStartViewTransition(
  isEnabled: boolean,
): (callback: ViewTransitionUpdateCallback) => void {
  return (callback) => {
    // If transitions aren't enabled or the View Transitions API isn't supported by the browser.
    if (!isEnabled || !document.startViewTransition) return callback();

    const now = performance.now();

    // Ignore super-fast transitions for a more pleasant game experience.
    if (lastTransitionAt && now - lastTransitionAt < MIN_INTERVAL_MS) return;

    lastTransitionAt = now;

    const transition = document.startViewTransition(() => {
      flushSync(callback);
    });

    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  };
}
