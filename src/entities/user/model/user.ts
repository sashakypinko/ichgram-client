export interface IUser {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  scopes: string[];
  avatar: string;
  website: string;
  about: string;
  followings: string[];
  followersCount?: number;
}
