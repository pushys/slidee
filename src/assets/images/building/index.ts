import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const building = {
  image,
  preview,
  attribution: {
    author: 'Alexander Kaufmann',
    authorUrl: 'https://unsplash.com/@alexander_kaufmann',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/modern-architectural-building-details-against-a-blue-sky-with-clouds-1_kC3PCGM2o',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
