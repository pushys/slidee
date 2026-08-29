import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const pancakes = {
  image,
  preview,
  attribution: {
    author: 'Nibu R',
    authorUrl: 'https://unsplash.com/@nibu1979',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/pancakes-with-berries-and-syrup-look-delicious-zW6J4LfXBTg',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['food'],
} satisfies ImageMetadata;
