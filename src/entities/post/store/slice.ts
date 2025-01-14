import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostState } from './types';
import { IPost } from '@entities/post/model/post';
import { CreatePostData, UpdatePostData } from '@entities/post/types';
import { PostApi } from '@entities/post/services/post-service';
import { ActionWithCallbacks, PayloadWithLazyLoad } from '@app/store';
import { FormikErrors } from 'formik/dist/types';
import { AxiosError } from 'axios';
import { UserApi } from '@entities/user/services/user-service';
import { GetPostsParams } from '@entities/user/store/types';
import { PaginationParams } from '@app/types';

const initialState: PostState = {
  userPosts: [],
  feedPosts: [],
  trendingPosts: [],
  selectedPost: null,
  postFormDialogOpened: false,
  postViewDialogOpened: false,
  editablePost: null,
  getSelectedLoading: false,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  removeLoading: false,
  error: null,
};

const syncPostsWithUpdated = (posts: IPost[], updatedPost: IPost) => {
  const updatedPostIdx = posts.findIndex(({ _id }) => updatedPost._id === _id);
  if (updatedPostIdx === -1) return posts;
  return [...posts.slice(0, updatedPostIdx), updatedPost, ...posts.slice(updatedPostIdx + 1)];
};

export const getUserPosts = createAsyncThunk<PayloadWithLazyLoad<IPost>, GetPostsParams>(
  'post/getUserPosts',
  async ({ userId, ...params }, { rejectWithValue }) => {
    try {
      const data = await UserApi.getPosts(userId, params);
      return { data, append: !!params.offset && params.offset > 0 };
    } catch (error: unknown) {
      return rejectWithValue('Failed to fetch user posts');
    }
  },
);

export const getFeedPosts = createAsyncThunk<PayloadWithLazyLoad<IPost>, PaginationParams>(
  'post/getFeedPosts',
  async (params, { rejectWithValue }) => {
    try {
      const data = await PostApi.getByFollowing(params);
      return { data, append: !!params.offset && params.offset > 0 };
    } catch (error: unknown) {
      return rejectWithValue('Failed to fetch feed posts');
    }
  },
);

export const getTrendingPosts = createAsyncThunk<PayloadWithLazyLoad<IPost>, PaginationParams>(
  'post/getTrendingPosts',
  async (params, { rejectWithValue }) => {
    try {
      const data = await PostApi.getTrending(params);
      return { data, append: !!params.offset && params.offset > 0 };
    } catch (error: unknown) {
      return rejectWithValue('Failed to fetch trending posts');
    }
  },
);

export const createPost = createAsyncThunk<
  IPost,
  ActionWithCallbacks<CreatePostData, void, FormikErrors<CreatePostData>>
>('post/create', async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
  try {
    const post = await PostApi.create(payload);
    if (onSuccess) onSuccess();
    return post;
  } catch (error: unknown) {
    if (onError && error instanceof AxiosError && error?.response?.data.errors) {
      onError(error.response.data.errors);
    }
    return rejectWithValue('Failed to create post');
  }
});

export const updatePost = createAsyncThunk<
  IPost,
  ActionWithCallbacks<{ id: string; data: UpdatePostData }, void, FormikErrors<UpdatePostData>>
>('post/update', async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
  try {
    const post = await PostApi.update(payload.id, payload.data);
    if (onSuccess) onSuccess();
    return post;
  } catch (error: unknown) {
    if (onError && error instanceof AxiosError && error?.response?.data.errors) {
      onError(error.response.data.errors);
    }
    return rejectWithValue('Failed to update post');
  }
});

export const removePost = createAsyncThunk<IPost, ActionWithCallbacks<string>>(
  'post/remove',
  async ({ payload, onSuccess }, { rejectWithValue }) => {
    try {
      const post = await PostApi.remove(payload);
      if (onSuccess) onSuccess();
      return post;
    } catch (error: unknown) {
      return rejectWithValue('Failed to remove post');
    }
  },
);

export const togglePostLike = createAsyncThunk<IPost, string>(
  'post/toggleLike',
  async (postId, { rejectWithValue }) => {
    try {
      return PostApi.toggleLike(postId);
    } catch (error: unknown) {
      return rejectWithValue('Failed to toggle post like');
    }
  },
);

export const getSelectedPost = createAsyncThunk<IPost | null, string>(
  'post/getSelected',
  async (postId, { rejectWithValue }) => {
    try {
      return PostApi.getById(postId);
    } catch (error: unknown) {
      return rejectWithValue('Failed to get selected post');
    }
  },
);

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    openPostFormDialog: (state: PostState, action: PayloadAction<IPost | undefined>) => {
      state.postViewDialogOpened = false;
      state.selectedPost = null;
      state.postFormDialogOpened = true;
      state.editablePost = action.payload || null;
    },
    closePostFormDialog: (state: PostState) => {
      state.postFormDialogOpened = false;
      state.editablePost = null;
    },
    openPostViewDialog: (state: PostState, action: PayloadAction<IPost>) => {
      state.postViewDialogOpened = true;
      state.selectedPost = action.payload;
    },
    closePostViewDialog: (state: PostState) => {
      state.postViewDialogOpened = false;
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPosts.pending, (state: PostState) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state: PostState, action: PayloadAction<PayloadWithLazyLoad<IPost>>) => {
        state.fetchLoading = false;
        state.userPosts = action.payload.append ? [...state.userPosts, ...action.payload.data] : action.payload.data;
      })
      .addCase(getUserPosts.rejected, (state: PostState, action: PayloadAction<unknown>) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getFeedPosts.pending, (state: PostState) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(getFeedPosts.fulfilled, (state: PostState, action: PayloadAction<PayloadWithLazyLoad<IPost>>) => {
        state.fetchLoading = false;
        state.feedPosts = action.payload.append ? [...state.feedPosts, ...action.payload.data] : action.payload.data;
      })
      .addCase(getFeedPosts.rejected, (state: PostState, action: PayloadAction<unknown>) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getTrendingPosts.pending, (state: PostState) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(getTrendingPosts.fulfilled, (state: PostState, action: PayloadAction<PayloadWithLazyLoad<IPost>>) => {
        state.fetchLoading = false;
        state.trendingPosts = action.payload.append
          ? [...state.trendingPosts, ...action.payload.data]
          : action.payload.data;
      })
      .addCase(getTrendingPosts.rejected, (state: PostState, action: PayloadAction<unknown>) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createPost.pending, (state: PostState) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state: PostState) => {
        state.createLoading = false;
      })
      .addCase(createPost.rejected, (state: PostState, action: PayloadAction<unknown>) => {
        state.createLoading = false;
        state.error = action.payload as string;
      })

      .addCase(updatePost.pending, (state: PostState) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state: PostState, action: PayloadAction<IPost>) => {
        state.updateLoading = false;
        state.userPosts = syncPostsWithUpdated(state.userPosts, action.payload);

        if (state.selectedPost?._id === action.payload._id) {
          state.selectedPost = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state: PostState, action: PayloadAction<unknown>) => {
        state.updateLoading = false;
        state.error = action.payload as string;
      })

      .addCase(removePost.pending, (state: PostState) => {
        state.removeLoading = true;
        state.error = null;
      })
      .addCase(removePost.fulfilled, (state: PostState, action: PayloadAction<IPost>) => {
        state.removeLoading = false;
        state.userPosts = state.userPosts.filter(({ _id }) => action.payload._id !== _id);

        if (state.selectedPost?._id === action.payload._id) {
          state.selectedPost = null;
        }
      })
      .addCase(removePost.rejected, (state: PostState, action: PayloadAction<unknown>) => {
        state.removeLoading = false;
        state.error = action.payload as string;
      })

      .addCase(togglePostLike.pending, (state: PostState) => {
        state.error = null;
      })
      .addCase(togglePostLike.fulfilled, (state: PostState, action: PayloadAction<IPost>) => {
        state.userPosts = syncPostsWithUpdated(state.userPosts, action.payload);
        state.feedPosts = syncPostsWithUpdated(state.feedPosts, action.payload);
        state.trendingPosts = syncPostsWithUpdated(state.trendingPosts, action.payload);

        if (state.selectedPost?._id === action.payload._id) {
          state.selectedPost = action.payload;
        }
      })
      .addCase(togglePostLike.rejected, (state: PostState, action: PayloadAction<unknown>) => {
        state.error = action.payload as string;
      })

      .addCase(getSelectedPost.pending, (state: PostState) => {
        state.getSelectedLoading = true;
        state.error = null;
      })
      .addCase(getSelectedPost.fulfilled, (state: PostState, action: PayloadAction<IPost | null>) => {
        state.getSelectedLoading = false;
        state.postViewDialogOpened = true;
        state.selectedPost = action.payload;
      })
      .addCase(getSelectedPost.rejected, (state: PostState, action: PayloadAction<unknown>) => {
        state.getSelectedLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { openPostFormDialog, closePostFormDialog, openPostViewDialog, closePostViewDialog } = slice.actions;
export default slice.reducer;
