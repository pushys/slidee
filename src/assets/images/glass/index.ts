import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const glass = {
  image,
  preview,
  attribution: {
    author: 'Nat',
    authorUrl: 'https://unsplash.com/@nattgw',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-group-of-cubes-that-are-stacked-together-Qerg85B7JDI',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['3d'],
} satisfies ImageMetadata;
