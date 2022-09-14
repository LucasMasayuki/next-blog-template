import { Author } from './author.mode';
import { OgImage } from './og-image.model';

export type Post = {
  publishedAt: Date;
  slug: string;
  excerpt: string;
  title: string;
  readingTime: string;
  coverImage: string;
  ogImage: OgImage;
  author: Author;
  tags: string[];
};
