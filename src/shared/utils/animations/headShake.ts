import type { AnimationDefinition } from './types';

export const headShake = [
  [
    { transform: 'translateX(0)', offset: 0 },
    { transform: 'translateX(-6px)', offset: 0.13 },
    { transform: 'translateX(5px)', offset: 0.37 },
    { transform: 'translateX(-3px)', offset: 0.63 },
    { transform: 'translateX(2px)', offset: 0.87 },
    { transform: 'translateX(0)', offset: 1 },
  ],
  { duration: 500, easing: 'ease-in-out' },
] satisfies AnimationDefinition;
