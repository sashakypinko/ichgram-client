import { RootState } from '@app/store';
import { CommentState } from '@entities/comment/store/types';

export const selectComment = (state: RootState): CommentState => state.comment;
