import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const robot = {
  image,
  preview,
  attribution: {
    author: 'Nick Fewings',
    authorUrl: 'https://unsplash.com/@jannerboy62',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/two-vintage-tin-robots-standing-side-by-side-ecwv2mk-cqA',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: [],
} satisfies ImageMetadata;
