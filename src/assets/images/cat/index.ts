import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const cat = {
  image,
  preview,
  attribution: {
    author: 'Cédric VT',
    authorUrl: 'https://unsplash.com/@cedric_photography',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/silver-tabby-cat-IuJc2qh2TcA',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
