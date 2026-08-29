import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const fish = {
  image,
  preview,
  attribution: {
    author: 'Joan Li',
    authorUrl: 'https://unsplash.com/@_bubble_maker',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/an-orange-and-white-clown-fish-in-a-sea-anemone-hf4kYHo_X0c',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['animals'],
} satisfies ImageMetadata;
