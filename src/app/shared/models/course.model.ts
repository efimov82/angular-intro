import { User } from '@app/shared/interfaces';
import { Course as CourseInterface }  from '../interfaces';
import { FileInput } from 'ngx-material-file-input';

export class Course implements CourseInterface {
  readonly modelName = 'Course';

  _id: string;
  ownerId: string;
  owner: User | null;
  slug: string;
  authors: string;
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
    this.authors = data.authors;
    this.dateCreation = data.dateCreation;
    this.description = data.description;
    this.duration = data.duration;
    this.title = data.title;
    this.thumbnail = data.thumbnail;
    this.thumbnailFile = data.thumbnailFile;
    this.youtubeId = data.youtubeId;
    this.topRated = data.topRated;
    this.ownerId = data.ownerId;
  }

  setThunmnail(thumbnail: string) {
    this.thumbnail = thumbnail;
  }
}
