import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const ramen = {
  image,
  preview,
  attribution: {
    author: 'Michele Blackwell',
    authorUrl: 'https://unsplash.com/@mab_studio',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/round-white-bowl-with-ramen-and-egg-rAyCBQTH7ws',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['food'],
} satisfies ImageMetadata;
