import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const mailbox = {
  image,
  preview,
  attribution: {
    author: 'Rebecca Hansen',
    authorUrl: 'https://unsplash.com/@bmarie97',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/black-mail-bucket-kDILOJ80f0s',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: [],
} satisfies ImageMetadata;
