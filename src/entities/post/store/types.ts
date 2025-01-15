import { IPost } from '@entities/post/model/post';
import { PaginatedData } from '@app/types';

export interface PostState {
  userPosts: PaginatedData<IPost>;
  feedPosts: PaginatedData<IPost>;
  trendingPosts: PaginatedData<IPost>;
  selectedPost: IPost | null;
  postViewDialogOpened: boolean;
  postFormDialogOpened: boolean;
  editablePost: IPost | null;
  getSelectedLoading: boolean;
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  removeLoading: boolean;
  error: string | null;
}
