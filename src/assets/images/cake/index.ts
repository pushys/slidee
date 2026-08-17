import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const cake = {
  image,
  preview,
  attribution: {
    author: 'Davide Carpani',
    authorUrl: 'https://unsplash.com/@dc_photo',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/strawberry-on-white-ceramic-plate-cz6H-peo_E0',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
