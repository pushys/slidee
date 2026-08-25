import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const building2 = {
  image,
  preview,
  attribution: {
    author: 'Cameron Voyce',
    authorUrl: 'https://unsplash.com/@raggedflag',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-tall-building-sitting-next-to-a-palm-tree-N7VSGoJqgZQ',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['architecture', 'luxury'],
} satisfies ImageMetadata;
