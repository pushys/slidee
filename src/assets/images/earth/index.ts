import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const earth = {
  image,
  preview,
  attribution: {
    author: 'NASA',
    authorUrl: 'https://unsplash.com/@nasa',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/view-of-earth-and-satellite-yZygONrUBe8',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['nature', 'space'],
} satisfies ImageMetadata;
