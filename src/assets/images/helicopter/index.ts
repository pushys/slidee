import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const helicopter = {
  image,
  preview,
  attribution: {
    author: 'Yiran Ding',
    authorUrl: 'https://unsplash.com/@yiranding',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/helicopters-on-paved-concrete-under-white-skies-mkUWjz9pm98',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['aviation'],
} satisfies ImageMetadata;
