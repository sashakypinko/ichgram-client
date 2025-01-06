import { RootState } from '@app/store';
import { PostState } from '@entities/post/store/types';

export const selectPost = (state: RootState): PostState => state.post;
