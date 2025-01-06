import { IPost } from '@entities/post/model/post';

export interface PostState {
  userPosts: IPost[];
  feedPosts: IPost[];
  trendingPosts: IPost[];
  selectedPost: IPost | null;
  postViewDialogOpened: boolean;
  postFormDialogOpened: boolean;
  editablePost: IPost | null;
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  removeLoading: boolean;
  error: string | null;
}
