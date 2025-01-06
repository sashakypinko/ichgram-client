import { FC } from 'react';
import { IUser } from '@entities/user/model/user';

export type UserActionProps = { user: IUser; asIcon?: boolean };

export type UserAction = FC<UserActionProps>;
