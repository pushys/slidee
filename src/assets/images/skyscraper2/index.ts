import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const skyscraper2 = {
  image,
  preview,
  attribution: {
    author: 'Simone Hutsch',
    authorUrl: 'https://unsplash.com/@heysupersimi',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/low-angle-photo-of-high-rise-building-iDSfeuoxM0o',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['architecture'],
} satisfies ImageMetadata;
