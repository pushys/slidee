import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const skyscraper = {
  image,
  preview,
  attribution: {
    author: 'Yaroslav Zotov',
    authorUrl: 'https://unsplash.com/@_zotovy',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/a-tall-glass-building-tWFP-DibMRk',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['architecture'],
} satisfies ImageMetadata;
