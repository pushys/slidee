import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const canyon = {
  image,
  preview,
  attribution: {
    author: 'Joseph Corl',
    authorUrl: 'https://unsplash.com/@jcorl',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-narrow-slot-in-the-side-of-a-canyon-Kw86nLZkeeM',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
