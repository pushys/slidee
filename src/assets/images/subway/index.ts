import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const subway = {
  image,
  preview,
  attribution: {
    author: 'Hashem Al-Hebshi',
    authorUrl: 'https://unsplash.com/@hashemofficial',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-long-staircase-with-light-at-the-end-BxGbJxLoJ3g',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['architecture'],
} satisfies ImageMetadata;
