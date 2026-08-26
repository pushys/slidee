import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const piano = {
  image,
  preview,
  attribution: {
    author: 'Andrew Bright',
    authorUrl: 'https://unsplash.com/@andrew_bright',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/close-up-of-a-white-yamaha-piano-keys-pJ2-51-5CYg',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: [],
} satisfies ImageMetadata;
