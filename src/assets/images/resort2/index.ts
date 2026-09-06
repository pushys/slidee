import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const resort2 = {
  image,
  preview,
  attribution: {
    author: 'Chelsea Gates',
    authorUrl: 'https://unsplash.com/@chelseacgates',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/woman-on-body-of-water-during-daytime-0653_wY0nRc',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['luxury'],
} satisfies ImageMetadata;
