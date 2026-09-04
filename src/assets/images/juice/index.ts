import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const juice = {
  image,
  preview,
  attribution: {
    author: 'Francesca Hotchin',
    authorUrl: 'https://unsplash.com/@franhotchin',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/strawberry-juice-beside-strawberry-fruits-DSxurmhrfuc',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['drinks'],
} satisfies ImageMetadata;
