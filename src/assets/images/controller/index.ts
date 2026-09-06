import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const controller = {
  image,
  preview,
  attribution: {
    author: 'Sora Khan',
    authorUrl: 'https://unsplash.com/@sorakhan',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/white-and-black-sony-ps-4-controller-3U2NAo-VHSE',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['gaming', 'technology'],
} satisfies ImageMetadata;
