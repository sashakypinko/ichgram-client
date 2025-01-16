import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentState, GetCommentsParams } from './types';
import { PostApi } from '@entities/post/services/post-service';
import { ActionWithCallbacks } from '@app/store';
import { FormikErrors } from 'formik/dist/types';
import { AxiosError } from 'axios';
import { IComment } from '@entities/comment/model/comment';
import { CommentApi } from '@entities/comment/services/comment-service';
import { CreateCommentData, UpdateCommentData } from '@entities/comment/types';
import { PaginatedData } from '@app/types';
import { preparePaginatedResponseData } from '@app/helpers/store.helper';

const initialPaginatedData: PaginatedData<IComment> = {
  data: [],
  offset: 0,
  limit: 20,
  fullyLoaded: false,
};

const initialState: CommentState = {
  comments: initialPaginatedData,
  editableComment: null,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  removeLoading: false,
  error: null,
};

const syncCommentsWithUpdated = (comments: IComment[], updatedComment: IComment) => {
  const updatedCommentIdx = comments.findIndex(({ _id }) => updatedComment._id === _id);
  if (updatedCommentIdx === -1) return comments;
  return [...comments.slice(0, updatedCommentIdx), updatedComment, ...comments.slice(updatedCommentIdx + 1)];
};

export const getComments = createAsyncThunk<PaginatedData<IComment>, GetCommentsParams>(
  'comment/get',
  async ({ postId, offset = 0, limit = 20 }, { rejectWithValue }) => {
    try {
      const data = await PostApi.getComments(postId, { offset, limit });
      return { data, offset, limit };
    } catch (error: unknown) {
      return rejectWithValue('Failed to fetch comments');
    }
  },
);

export const createComment = createAsyncThunk<
  IComment,
  ActionWithCallbacks<CreateCommentData, void, FormikErrors<CreateCommentData>>
>('comment/create', async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
  try {
    const comment = await CommentApi.create(payload);
    if (onSuccess) onSuccess();
    return comment;
  } catch (error: unknown) {
    if (onError && error instanceof AxiosError && error?.response?.data.errors) {
      onError(error.response.data.errors);
    }
    return rejectWithValue('Failed to create comment');
  }
});

export const updateComment = createAsyncThunk<
  IComment,
  ActionWithCallbacks<{ id: string; data: UpdateCommentData }, void, FormikErrors<UpdateCommentData>>
>('comment/update', async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
  try {
    const comment = await CommentApi.update(payload.id, payload.data);
    if (onSuccess) onSuccess();
    return comment;
  } catch (error: unknown) {
    if (onError && error instanceof AxiosError && error?.response?.data.errors) {
      onError(error.response.data.errors);
    }
    return rejectWithValue('Failed to update comment');
  }
});

export const removeComment = createAsyncThunk<IComment, ActionWithCallbacks<string>>(
  'comment/remove',
  async ({ payload, onSuccess }, { rejectWithValue }) => {
    try {
      const comment = await CommentApi.remove(payload);
      if (onSuccess) onSuccess();
      return comment;
    } catch (error: unknown) {
      return rejectWithValue('Failed to remove comment');
    }
  },
);

export const toggleCommentLike = createAsyncThunk<IComment, string>(
  'comment/toggleLike',
  async (commentId, { rejectWithValue }) => {
    try {
      return CommentApi.toggleLike(commentId);
    } catch (error: unknown) {
      return rejectWithValue('Failed to toggle comment like');
    }
  },
);

const slice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state: CommentState) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state: CommentState, action: PayloadAction<PaginatedData<IComment>>) => {
        state.fetchLoading = false;
        state.comments = preparePaginatedResponseData(action.payload, state.comments.data);
      })
      .addCase(getComments.rejected, (state: CommentState, action: PayloadAction<unknown>) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createComment.pending, (state: CommentState) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state: CommentState, action: PayloadAction<IComment>) => {
        state.createLoading = false;
        state.comments.data.unshift(action.payload);
      })
      .addCase(createComment.rejected, (state: CommentState, action: PayloadAction<unknown>) => {
        state.createLoading = false;
        state.error = action.payload as string;
      })

      .addCase(updateComment.pending, (state: CommentState) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state: CommentState, action: PayloadAction<IComment>) => {
        state.updateLoading = false;
        state.comments.data = syncCommentsWithUpdated(state.comments.data, action.payload);
      })
      .addCase(updateComment.rejected, (state: CommentState, action: PayloadAction<unknown>) => {
        state.updateLoading = false;
        state.error = action.payload as string;
      })

      .addCase(removeComment.pending, (state: CommentState) => {
        state.removeLoading = true;
        state.error = null;
      })
      .addCase(removeComment.fulfilled, (state: CommentState, action: PayloadAction<IComment>) => {
        state.removeLoading = false;
        state.comments.data = state.comments.data.filter(({ _id }) => action.payload._id !== _id);
      })
      .addCase(removeComment.rejected, (state: CommentState, action: PayloadAction<unknown>) => {
        state.removeLoading = false;
        state.error = action.payload as string;
      })

      .addCase(toggleCommentLike.pending, (state: CommentState) => {
        state.error = null;
      })
      .addCase(toggleCommentLike.fulfilled, (state: CommentState, action: PayloadAction<IComment>) => {
        state.comments.data = syncCommentsWithUpdated(state.comments.data, action.payload);
      })
      .addCase(toggleCommentLike.rejected, (state: CommentState, action: PayloadAction<unknown>) => {
        state.error = action.payload as string;
      });
  },
});

export default slice.reducer;
