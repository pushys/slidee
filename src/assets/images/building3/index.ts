import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const building3 = {
  image,
  preview,
  attribution: {
    author: 'Weliton Soranzo',
    authorUrl: 'https://unsplash.com/@welframes',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/modern-apartment-building-with-copper-balconies-2FepFcRfqjs',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['architecture'],
} satisfies ImageMetadata;
