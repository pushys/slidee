import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const earth2 = {
  image,
  preview,
  attribution: {
    author: 'NASA',
    authorUrl: 'https://unsplash.com/@nasa',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/view-of-planet-earth-from-space-with-clouds-JZz2UYtHo1s',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['nature', 'space'],
} satisfies ImageMetadata;
