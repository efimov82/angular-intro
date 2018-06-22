import { Image } from './image';

export interface Course {
  id: number;
  title: string;
  dateCreation: Date;
  duration: number;
  description: string;
  thumbnail: Image;
}
