import { Image } from './image';

export interface Course {
  id: number;
  slug: string;
  author: string;
  dateCreation: Date;
  description: string;
  duration: number;
  title: string;
  thumbnail: string;
  youtubeId: string;
  topRated: boolean;
}
