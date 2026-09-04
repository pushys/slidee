import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const keyboard = {
  image,
  preview,
  attribution: {
    author: 'Shuttergames',
    authorUrl: 'https://unsplash.com/@shuttergames',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-close-up-of-a-computer-keyboard-with-an-orange-key-XcYqeZlXOTw',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['technology'],
} satisfies ImageMetadata;
