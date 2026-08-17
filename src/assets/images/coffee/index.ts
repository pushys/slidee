import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const coffee = {
  image,
  preview,
  attribution: {
    author: 'Guy Basabose',
    authorUrl: 'https://unsplash.com/@guybas',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/white-ceramic-cup-with-brown-liquid-on-white-ceramic-saucer-FzdEbrA3Qj0',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
