import { lazy } from 'react';

export function lazyNamed<T extends Record<string, unknown>, K extends keyof T>(
  loader: () => Promise<T>,
  name: K,
) {
  return lazy(() =>
    loader().then((module) => ({
      default: module[name] as React.ComponentType,
    })),
  );
}
