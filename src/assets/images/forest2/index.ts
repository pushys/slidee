import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const forest2 = {
  image,
  preview,
  attribution: {
    author: 'Chloé Martin',
    authorUrl: 'https://unsplash.com/@chlomrtn',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/green-trees-under-white-sky-during-daytime-k1tt7uKbQiQ',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['nature'],
} satisfies ImageMetadata;
