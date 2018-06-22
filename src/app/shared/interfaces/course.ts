import { Image } from './image';

export interface Course {
  id: number;
  author: string;
  dateCreation: Date;
  description: string;
  duration: number;
  title: string;
  thumbnail: Image;
}
