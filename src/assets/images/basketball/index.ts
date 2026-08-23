import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const basketball = {
  image,
  preview,
  attribution: {
    author: 'Cliff',
    authorUrl: 'https://unsplash.com/@phonephotos',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/basketball-hoop-against-a-clear-blue-sky-EkE1EO70f40',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
