import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const beer = {
  image,
  preview,
  attribution: {
    author: 'Kaeli Hearn',
    authorUrl: 'https://unsplash.com/@kaelihearn',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/three-glasses-of-beer-sitting-on-top-of-a-table-UHlOv6hH4U4',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['drinks'],
} satisfies ImageMetadata;
