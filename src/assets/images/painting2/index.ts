import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const painting2 = {
  image,
  preview,
  attribution: {
    author: 'Europeana',
    authorUrl: 'https://unsplash.com/@europeana',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/brown-horse-in-white-wall-paint-room-rMV45VgcRbQ',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['art'],
} satisfies ImageMetadata;
