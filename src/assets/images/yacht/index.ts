import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const yacht = {
  image,
  preview,
  attribution: {
    author: 'Matthew Hamilton',
    authorUrl: 'https://unsplash.com/@thatsmrbio',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-view-of-the-bow-of-a-boat-in-the-water-hllJLqjpEVY',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['luxury'],
} satisfies ImageMetadata;
