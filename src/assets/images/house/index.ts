import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const house = {
  image,
  preview,
  attribution: {
    author: 'Pixasquare',
    authorUrl: 'https://unsplash.com/@pixasquare',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/white-concrete-house-near-green-tree-during-daytime-4ojhpgKpS68',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['architecture', 'luxury'],
} satisfies ImageMetadata;
