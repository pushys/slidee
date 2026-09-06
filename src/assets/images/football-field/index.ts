import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const footballField = {
  image,
  preview,
  attribution: {
    author: 'calvin jung',
    authorUrl: 'https://unsplash.com/@methemood',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/white-line-on-green-grass-field-CWon59n3AB8',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['sports'],
} satisfies ImageMetadata;
