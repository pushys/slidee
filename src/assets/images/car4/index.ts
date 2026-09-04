import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const car4 = {
  image,
  preview,
  attribution: {
    author: 'Dhiva Krishna',
    authorUrl: 'https://unsplash.com/@dhivakrishna',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/black-mercedes-benz-car-YApS6TjKJ9c',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['automotive'],
} satisfies ImageMetadata;
