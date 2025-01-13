import { IUser } from '@entities/user/model/user';

export interface IPost {
  _id: string;
  mediaId: string;
  content: string;
  likedBy: string[];
  author: IUser;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}
