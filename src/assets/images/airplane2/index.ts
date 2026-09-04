import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const airplane2 = {
  image,
  preview,
  attribution: {
    author: 'Chris Leipelt',
    authorUrl: 'https://unsplash.com/@cleipelt',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/white-and-blue-airplane-on-airport-during-daytime-pRQCTeQTDwE',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['aviation'],
} satisfies ImageMetadata;
