import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const car2 = {
  image,
  preview,
  attribution: {
    author: 'Rico Reynaldi',
    authorUrl: 'https://unsplash.com/@ricoreynaldii',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-porsche-car-parked-in-front-of-a-building-elQTJpASwx8',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
