import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const dam = {
  image,
  preview,
  attribution: {
    author: 'Jerry Kavan',
    authorUrl: 'https://unsplash.com/@jerrykavan',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/two-people-walking-on-a-bridge-over-a-body-of-water-xgJPDxQgJ4o',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
