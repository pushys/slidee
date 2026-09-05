import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const burger = {
  image,
  preview,
  attribution: {
    author: 'Eiliv Aceron',
    authorUrl: 'https://unsplash.com/@shootdelicious',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/burger-with-lettuce-and-tomato-uBigm8w_MpA',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['food'],
} satisfies ImageMetadata;
