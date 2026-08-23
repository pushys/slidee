import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const wheat = {
  image,
  preview,
  attribution: {
    author: 'James Ahlberg',
    authorUrl: 'https://unsplash.com/@jim_ahlberg',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-field-of-wheat-under-a-blue-sky-with-clouds-dTs-GX8RE6c',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
