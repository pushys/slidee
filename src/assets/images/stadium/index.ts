import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const stadium = {
  image,
  preview,
  attribution: {
    author: 'Alex Azabache',
    authorUrl: 'https://unsplash.com/@alexazabache',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/green-soccer-field-inside-stadium-1cPWeb3Ud30',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['architecture', 'sports'],
} satisfies ImageMetadata;
