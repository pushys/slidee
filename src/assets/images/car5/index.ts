import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const car5 = {
  image,
  preview,
  attribution: {
    author: 'Chris Nguyen',
    authorUrl: 'https://unsplash.com/@cspek',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/black-and-red-lamborghini-aventador-sv-rear-left-side-aTX_bRaOZnA',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['automotive'],
} satisfies ImageMetadata;
