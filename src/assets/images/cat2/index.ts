import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const cat2 = {
  image,
  preview,
  attribution: {
    author: 'PhilCreates',
    authorUrl: 'https://unsplash.com/@philcreates',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/cat-sleeping-on-bed-pdALzg0yN-8',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
