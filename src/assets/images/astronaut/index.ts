import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const astronaut = {
  image,
  preview,
  attribution: {
    author: 'NASA Hubble Space Telescope',
    authorUrl: 'https://unsplash.com/@hubblespacetelescope',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-reflection-of-an-astronaut-in-his-space-suit-bRjuAK0VtbE',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['space'],
} satisfies ImageMetadata;
