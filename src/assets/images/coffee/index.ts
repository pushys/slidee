import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const coffee = {
  image,
  preview,
  attribution: {
    author: 'Nathan Dumlao',
    authorUrl: 'https://unsplash.com/@nate_dumlao',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/top-view-photography-of-heart-latte-coffee-XOhI_kW_TaM',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['drinks'],
} satisfies ImageMetadata;
