import type { ImageAttribution } from '@/shared/types';

import image from './image.avif';
import preview from './preview.avif';

export const flower = {
  image,
  preview,
  attribution: {
    author: 'Baibhav Kumar',
    authorUrl: 'https://unsplash.com/@artvilla67',
    source: 'Unsplash',
    sourceUrl:
      'https://unsplash.com/photos/a-close-up-of-a-flower-with-water-droplets-on-it-gLvutS195Ic',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  } satisfies ImageAttribution,
} as const;
