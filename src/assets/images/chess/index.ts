import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const chess = {
  image,
  preview,
  attribution: {
    author: 'Heriberto Murrieta',
    authorUrl: 'https://unsplash.com/@heribertomurr',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-chess-board-with-pieces-of-chess-on-it-9GYOPnHryD0',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['sports'],
} satisfies ImageMetadata;
