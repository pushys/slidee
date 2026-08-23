import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const stadium = {
  image,
  preview,
  attribution: {
    author: 'Finn',
    authorUrl: 'https://unsplash.com/@finn_staygold',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-stadium-filled-with-lots-of-red-seats-J_R1BJtd_NU',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
