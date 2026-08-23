import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const road = {
  image,
  preview,
  attribution: {
    author: 'Luke Stackpoole',
    authorUrl: 'https://unsplash.com/@withluke',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/asphalt-road-through-mountain-landscape-ZRsJmpt9pNI',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
