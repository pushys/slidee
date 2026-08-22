import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const cake = {
  image,
  preview,
  attribution: {
    author: 'American Heritage Chocolate',
    authorUrl: 'https://unsplash.com/@americanheritagechocolate',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/white-cake-with-chocolate-syrup-on-white-ceramic-plate-vdx5hPQhXFk',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
