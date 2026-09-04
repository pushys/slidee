import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const soda = {
  image,
  preview,
  attribution: {
    author: 'Alexey',
    authorUrl: 'https://unsplash.com/@alexeysharovatov',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/two-cans-of-coca-cola-sitting-on-top-of-a-piece-of-luggage-Ws8PWgPFaTQ',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['drinks'],
} satisfies ImageMetadata;
