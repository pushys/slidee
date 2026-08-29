import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const airplane = {
  image,
  preview,
  attribution: {
    author: 'Arkin Si',
    authorUrl: 'https://unsplash.com/@arkviation',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/white-airplane-under-blue-sky-during-daytime-nkIIbgOVyl4',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['aviation'],
} satisfies ImageMetadata;
