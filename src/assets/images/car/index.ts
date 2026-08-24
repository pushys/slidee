import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const car = {
  image,
  preview,
  attribution: {
    author: 'Adam Birkett',
    authorUrl: 'https://unsplash.com/@abrkett',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/red-car-beside-sidewalk-laiD6efkZN4',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['automotive'],
} satisfies ImageMetadata;
