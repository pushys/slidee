import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const skyscraper2 = {
  image,
  preview,
  attribution: {
    author: 'Joel Filipe',
    authorUrl: 'https://unsplash.com/@joelfilip',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/glass-building-under-clear-blue-sky-jU9VAZDGMzs',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
