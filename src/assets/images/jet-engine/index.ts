import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const jetEngine = {
  image,
  preview,
  attribution: {
    author: 'Daniel Shapiro',
    authorUrl: 'https://unsplash.com/@dshap',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-close-up-of-a-jet-engine-on-a-runway-A-xnGqIpKr8',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['aviation'],
} satisfies ImageMetadata;
