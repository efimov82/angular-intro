export interface Course {
  id: number;
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
