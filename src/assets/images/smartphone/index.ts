import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const smartphone = {
  image,
  preview,
  attribution: {
    author: 'omid armin',
    authorUrl: 'https://unsplash.com/@itsomidarmin',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/red-and-black-samsung-android-smartphone-beside-white-earbuds-B2w4rdIihEo',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['technology'],
} satisfies ImageMetadata;
