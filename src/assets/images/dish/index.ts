import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const dish = {
  image,
  preview,
  attribution: {
    author: 'Anh Nguyen',
    authorUrl: 'https://unsplash.com/@pwign',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/bowl-of-vegetable-salad-_Uqj5BQb-mw',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['food'],
} satisfies ImageMetadata;
