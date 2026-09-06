import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const sculpture2 = {
  image,
  preview,
  attribution: {
    author: 'Jack Hunter',
    authorUrl: 'https://unsplash.com/@jacktthunter',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/marble-statue-of-man-looking-away-1L4E_lsIb9Q',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['art'],
} satisfies ImageMetadata;
