import { IUser } from '@entities/user/model/user';
import { PaginationParams } from '@app/types';

export interface UserState {
  searchedUsers: IUser[];
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

export type GetFollowersParams = GetFollowingParams;

export type GetPostsParams = GetFollowingParams;
