import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const motorcycle = {
  image,
  preview,
  attribution: {
    author: 'Harley-Davidson',
    authorUrl: 'https://unsplash.com/@harleydavidson',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/black-and-orange-motorcycle-eeTJKC_wz34',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['automotive'],
} satisfies ImageMetadata;
