import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const cocktail = {
  image,
  preview,
  attribution: {
    author: 'Great Cocktails',
    authorUrl: 'https://unsplash.com/@greatcocktails',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/pink-cocktail-with-strawberry-garnish-9PyQwwmZxpI',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['drinks'],
} satisfies ImageMetadata;
