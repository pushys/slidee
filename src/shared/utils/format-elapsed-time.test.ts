import { describe, expect, it } from 'vitest';

import { formatElapsedTime } from './format-elapsed-time';

describe('formatElapsedTime', () => {
  it('should format seconds', () => {
    expect(formatElapsedTime(1000)).toStrictEqual('00:01');
  });

  it('should format minutes', () => {
    expect(formatElapsedTime(60 * 1000)).toStrictEqual('01:00');
  });

  it('should format hours', () => {
    expect(formatElapsedTime(60 * 60 * 1000)).toStrictEqual('1:00:00');
  });
});
