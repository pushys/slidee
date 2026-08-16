import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const mountains = {
  image,
  preview,
  attribution: {
    author: 'Josh McCausland',
    authorUrl: 'https://unsplash.com/@joshmccausland',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/snow-covered-mountain-under-blue-sky-during-daytime-R6LRflynJw0',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
