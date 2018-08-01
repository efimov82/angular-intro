import { Course as CourseInterface }  from '../interfaces';
import { Image } from '../interfaces/image';
import { FileInput } from 'ngx-material-file-input';

export class Course implements CourseInterface {
  id: number;
  slug: string;
  author: string;
  dateCreation: Date;
  description: string;
  duration: number;
  title: string;
  thumbnail: string;
  thumbnailFile: FileInput;
  youtubeId: string;
  topRated: boolean;

  constructor(data?: CourseInterface) {
    Object.assign(this, data);
  }

  getVideoUrl(): string {
    return 'https://www.youtube.com/embed/' + this.youtubeId;
  }

  /**
   * @param data [title, description, dateCreation, duration, title, thumbnailFile, topRated]
   */
  import(data: any) {
    this.author = data.author;
    this.dateCreation = data.dateCreation;
    this.description = data.description;
    this.duration = data.duration;
    this.title = data.title;
    this.thumbnailFile = data.thumbnailFile;
    this.youtubeId = data.youtubeId;
    this.topRated = data.topRated;
  }
}
