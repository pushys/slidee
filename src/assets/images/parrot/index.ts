import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const parrot = {
  image,
  preview,
  attribution: {
    author: 'Andrew Pons',
    authorUrl: 'https://unsplash.com/@imandrewpons',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/close-up-of-a-yellow-and-blue-macaw-lylCw4zcA7I',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['animals'],
} satisfies ImageMetadata;
