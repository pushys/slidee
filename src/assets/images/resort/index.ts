import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const resort = {
  image,
  preview,
  attribution: {
    author: 'Christian Lambert',
    authorUrl: 'https://unsplash.com/@_christianlambert',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/brown-wooden-lounge-chairs-near-pool-surrounded-by-palm-trees-vmIWr0NnpCQ',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['luxury'],
} satisfies ImageMetadata;
