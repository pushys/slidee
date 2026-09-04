import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const laptop = {
  image,
  preview,
  attribution: {
    author: 'Andras Vas',
    authorUrl: 'https://unsplash.com/@wasdrew',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/macbook-pro-turned-on-Bd7gNnWJBkU',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['technology'],
} satisfies ImageMetadata;
