import { flushSync } from 'react-dom';

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
    // If the View Transitions API isn't enabled or supported by the browser.
    if (!isEnabled || !document.startViewTransition) {
      return callback();
    }

    const transition = document.startViewTransition(() => {
      flushSync(callback);
    });

    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  };
}
