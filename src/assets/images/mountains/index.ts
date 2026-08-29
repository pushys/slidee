import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const mountains = {
  image,
  preview,
  attribution: {
    author: 'Marco Pregnolato',
    authorUrl: 'https://unsplash.com/@marco_pregnolato',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/snow-covered-mountain-under-blue-sky-during-daytime-ahYX46whD8s',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['nature'],
} satisfies ImageMetadata;
