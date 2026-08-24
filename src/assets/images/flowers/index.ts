import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const flowers = {
  image,
  preview,
  attribution: {
    author: 'LoboStudio Hamburg',
    authorUrl: 'https://unsplash.com/@lobostudiohamburg',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/yellow-and-brown-roses-MAjtbFMV5_k',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['nature'],
} satisfies ImageMetadata;
