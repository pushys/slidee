export type ImageTag =
  | '3d'
  | 'animals'
  | 'architecture'
  | 'automotive'
  | 'drinks'
  | 'food'
  | 'nature'
  | 'sports';

export interface ImageMetadata {
  image: string;
  preview: string;
  attribution: ImageAttribution;
  tags: ImageTag[];
}

export interface ImageAttribution {
  author: string;
  authorUrl: string;
  source: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
}
