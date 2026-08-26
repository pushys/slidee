import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const golf = {
  image,
  preview,
  attribution: {
    author: 'Steven Shircliff',
    authorUrl: 'https://unsplash.com/@steveshirc',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/white-golf-ball-on-green-grass-field-during-daytime-N21z4eG8aKg',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['sports'],
} satisfies ImageMetadata;
