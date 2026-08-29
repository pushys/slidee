import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const leaves = {
  image,
  preview,
  attribution: {
    author: 'Łukasz Rawa',
    authorUrl: 'https://unsplash.com/@lukasz_rawa',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/dark-green-leaves-with-red-veins-CdA2yxbG1hg',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['nature'],
} satisfies ImageMetadata;
