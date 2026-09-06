import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const sportsman = {
  image,
  preview,
  attribution: {
    author: 'Braden Collum',
    authorUrl: 'https://unsplash.com/@bradencollum',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/man-on-running-field-9HI8UJMSdZA',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['sports'],
} satisfies ImageMetadata;
