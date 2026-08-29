import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const watch = {
  image,
  preview,
  attribution: {
    author: 'Yash Parashar',
    authorUrl: 'https://unsplash.com/@yash_parashar',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/silver-and-white-round-analog-watch-LWPPpkn6NEQ',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['luxury'],
} satisfies ImageMetadata;
