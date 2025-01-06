import { IComment } from '@entities/comment/model/comment';
import { PaginationParams } from '@app/types';

export interface CommentState {
  comments: IComment[];
  editableComment: IComment | null;
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  removeLoading: boolean;
  error: string | null;
}

export interface GetCommentsParams extends PaginationParams {
  postId: string;
}
