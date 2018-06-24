import { Course as CourseInterface }  from '../interfaces';
import { Image } from '../interfaces/image';

export class Course implements CourseInterface {
  id: number;
  slug: string;
  author: string;
  dateCreation: Date;
  description: string;
  duration: number;
  title: string;
  thumbnail: Image;
  youtubeId: string;

  constructor(data: CourseInterface) {
    Object.assign(this, data);
  }

  getVideoUrl() {
    return 'https://www.youtube.com/embed/' + this.youtubeId;
  }
}