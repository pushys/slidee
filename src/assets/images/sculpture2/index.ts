import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const sculpture2 = {
  image,
  preview,
  attribution: {
    author: 'Jack Hamilton',
    authorUrl: 'https://unsplash.com/@jacc',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/concrete-man-statue-AUgTvvQxDhg',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['art'],
} satisfies ImageMetadata;
