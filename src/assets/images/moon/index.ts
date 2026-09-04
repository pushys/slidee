import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const moon = {
  image,
  preview,
  attribution: {
    author: 'NASA',
    authorUrl: 'https://unsplash.com/@nasa',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/close-up-view-of-the-moons-surface-3WXJ3DUz8zI',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['nature', 'space'],
} satisfies ImageMetadata;
