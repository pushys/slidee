import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const berries = {
  image,
  preview,
  attribution: {
    author: 'Moon Moons',
    authorUrl: 'https://unsplash.com/@moonmoons_days',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/red-round-fruits-in-close-up-photography-KEhCDbyObvY',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
