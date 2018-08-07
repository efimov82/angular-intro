export interface Course {
  _id: number;
  ownerId: string;
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
