import { FC } from 'react';
import { IUser } from '@entities/user/model/user';

export type UserActionProps = { user: IUser; asIcon?: boolean, variant?: 'text' | 'outlined' | 'contained' };

export type UserAction = FC<UserActionProps>;

export interface UpdateUserData {
  fullName: string;
  username: string;
  website: string;
  about: string;
  avatar: File | null;
}