import { IUser } from '@entities/user/model/user';
import { PaginatedData, PaginationParams } from '@app/types';

export interface UserState {
  users: PaginatedData<IUser>;
  selectedUser: IUser | null;
  openedOverlay: boolean;
  openedFollowersDialogForId: string | null;
  openedFollowingDialogForId: string | null;
  fetchLoading: boolean;
  editLoading: boolean;
  followLoadingId: string | null;
  error: string | null;
}

export interface GetFollowingParams extends PaginationParams {
  userId: string;
}

export interface SearchUsersParams extends PaginationParams {
  search: string;
}

export type GetFollowersParams = GetFollowingParams;

export type GetPostsParams = GetFollowingParams;
