import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const forest = {
  image,
  preview,
  attribution: {
    author: 'Ahmad Kadhim',
    authorUrl: 'https://unsplash.com/@ahmadkadhim',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/narrow-brown-wooden-pathway-near-wooden-tress-GeHVEDrqMB8',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
