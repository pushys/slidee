import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const camera = {
  image,
  preview,
  attribution: {
    author: 'Ethan Hoover',
    authorUrl: 'https://unsplash.com/@ethanchoover',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/black-and-gray-canon-ae-1-camera-on-gray-sand-under-brown-dock-near-body-of-water-at-daytime-vasU4-TlC5I',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['technology'],
} satisfies ImageMetadata;
