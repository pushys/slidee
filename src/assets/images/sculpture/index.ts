import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const sculpture = {
  image,
  preview,
  attribution: {
    author: 'SIMON LEE',
    authorUrl: 'https://unsplash.com/@simonppt',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/female-bust-with-gold-kintsugi-repairs-IEgvy4o3byM',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['3d', 'art'],
} satisfies ImageMetadata;
