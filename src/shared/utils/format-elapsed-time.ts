const formatter = new Intl.DurationFormat('en', {
  style: 'digital',
  hoursDisplay: 'auto',
});

/**
 * Formats elapsed time in milliseconds into a human-readable string.
 *
 * @param ms
 * @returns A formatted string representing the elapsed time in "HH:MM:SS"
 *   format.
 */
export function formatElapsedTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;

  return formatter.format({ hours, minutes, seconds });
}
