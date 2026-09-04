import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const butterfly = {
  image,
  preview,
  attribution: {
    author: 'David Clode',
    authorUrl: 'https://unsplash.com/@davidclode',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/selective-focus-photography-of-black-and-yellow-swallowtail-butterfly-on-ixora-during-daytime-Oq9JrJb6K7M',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['animals'],
} satisfies ImageMetadata;
