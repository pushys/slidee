import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const seaTurtle = {
  image,
  preview,
  attribution: {
    author: 'Sophia Müller',
    authorUrl: 'https://unsplash.com/@sevethavi',
    source: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/brown-and-black-turtle-loP8xxkZIk8',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['animals'],
} satisfies ImageMetadata;
