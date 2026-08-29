import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const painting = {
  image,
  preview,
  attribution: {
    author: 'Europeana',
    authorUrl: 'https://unsplash.com/@europeana',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/red-blue-and-white-flowers-5TK1F5VfdIk',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['art'],
} satisfies ImageMetadata;
