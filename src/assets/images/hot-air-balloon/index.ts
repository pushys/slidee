import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const hotAirBalloon = {
  image,
  preview,
  attribution: {
    author: 'Aaron Burden',
    authorUrl: 'https://unsplash.com/@aaronburden',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/panning-photography-of-flying-blue-yellow-and-red-hot-air-balloon-h7wpIMY3O3E',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['aviation'],
} satisfies ImageMetadata;
