import { IUser } from '@entities/user/model/user';
import { IPost } from '@entities/post/model/post';

export interface IComment {
  _id: string;
  text: string;
  likedBy: string[];
  post: IPost;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
}
