import type { ImageMetadata } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const abstract = {
  image,
  preview,
  attribution: {
    author: 'Max Petrunin',
    authorUrl: 'https://unsplash.com/@mvogulov',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/abstract-metallic-sphere-with-curved-lines-FEipsPfiUvk',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  tags: ['3d'],
} satisfies ImageMetadata;
