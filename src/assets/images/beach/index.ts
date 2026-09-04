import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const beach = {
  image,
  preview,
  attribution: {
    author: 'Shifaaz shamoon',
    authorUrl: 'https://unsplash.com/@sotti',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/aerial-photo-of-seashore-sLAk1guBG90',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['nature'],
} satisfies ImageMetadata;
