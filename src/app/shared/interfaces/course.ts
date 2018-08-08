import { User } from '@app/shared/interfaces/user';

export interface Course {
  _id: number;
  ownerId: string;
  owner: User | null;
  slug: string;
  authors: string;
  dateCreation: Date;
  description: string;
  duration: number;
  title: string;
  thumbnail: string;
  youtubeId: string;
  topRated: boolean;
}
