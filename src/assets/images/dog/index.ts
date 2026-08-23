import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const dog = {
  image,
  preview,
  attribution: {
    author: 'Rafael Forseck',
    authorUrl: 'https://unsplash.com/@jpeg_therapy',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/black-and-white-dalmatian-mix-51Nmk7trUGI',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
