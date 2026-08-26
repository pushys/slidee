import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const car3 = {
  image,
  preview,
  attribution: {
    author: 'Paul Steiner',
    authorUrl: 'https://unsplash.com/@paul_steiner',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-red-car-on-a-road-with-mountains-in-the-background-tXQ46w4Kek8',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['automotive'],
} satisfies ImageMetadata;
