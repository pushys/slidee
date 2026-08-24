import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const toucan = {
  image,
  preview,
  attribution: {
    author: 'Zdeněk Macháček',
    authorUrl: 'https://unsplash.com/@zmachacek',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/black-and-yellow-bird-on-branch-eqXiLNfZDc0',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['animals'],
} satisfies ImageMetadata;
