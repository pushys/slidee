import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const galaxy = {
  image,
  preview,
  attribution: {
    author: 'NASA Hubble Space Telescope',
    authorUrl: 'https://unsplash.com/@hubblespacetelescope',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-very-large-spiral-galaxy-in-the-middle-of-the-night-8-Nv8dDYtII',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['nature', 'space'],
} satisfies ImageMetadata;
