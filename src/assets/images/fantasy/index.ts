import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const fantasy = {
  image,
  preview,
  attribution: {
    author: 'Puscas Adryan',
    authorUrl: 'https://unsplash.com/@adryan_studio',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/rustic-cabin-in-a-vibrant-purple-forest-landscape-CM-Iyi1lIgE',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
