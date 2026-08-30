import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const stars = {
  image,
  preview,
  attribution: {
    author: 'Ivana Cajina',
    authorUrl: 'https://unsplash.com/@von_co',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/milky-way-asuyh-_ZX54',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['nature', 'space'],
} satisfies ImageMetadata;
