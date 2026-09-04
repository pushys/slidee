export type ImageTag =
  | '3d'
  | 'animals'
  | 'architecture'
  | 'art'
  | 'automotive'
  | 'aviation'
  | 'drinks'
  | 'food'
  | 'luxury'
  | 'nature'
  | 'space'
  | 'sports'
  | 'technology';

export interface ImageMetadata {
  image: string;
  preview: string;
  attribution: ImageAttribution;
  tags: ImageTag[];
}

export interface ImageAttribution {
  author: string;
  authorUrl: `https://${string}`;
  source: string;
  sourceUrl: `https://${string}`;
  license: string;
  licenseUrl: `https://${string}`;
}
