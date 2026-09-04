import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const building3 = {
  image,
  preview,
  attribution: {
    author: 'Jens Riesenberg',
    authorUrl: 'https://unsplash.com/@infernisvox',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-tall-building-with-lots-of-windows-next-to-a-parking-meter-f_7oN-oCRgg',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['architecture'],
} satisfies ImageMetadata;
