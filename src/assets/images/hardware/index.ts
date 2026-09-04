import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const hardware = {
  image,
  preview,
  attribution: {
    author: 'Tomáš Malík',
    authorUrl: 'https://unsplash.com/@malcoo',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/black-and-silver-audio-mixer-MJ9px5L-opg',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['technology'],
} satisfies ImageMetadata;
