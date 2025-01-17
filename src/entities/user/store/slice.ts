import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GetFollowersParams, GetFollowingParams, SearchUsersParams, UserState } from './types';
import { IUser } from '@entities/user/model/user';
import { UserApi } from '@entities/user/services/user-service';
import { syncAuthUser } from '@features/auth/store/slice';
import { ActionWithCallbacks, RootState } from '@app/store';
import { UpdateUserData } from '@entities/user/types';
import { AxiosError } from 'axios';
import { FormikErrors } from 'formik/dist/types';
import { PaginatedData } from '@app/types';
import { preparePaginatedResponseData } from '@app/helpers/store.helper';

const initialPaginatedData: PaginatedData<IUser> = {
  data: [],
  offset: 0,
  limit: 20,
  fullyLoaded: false,
};

const initialState: UserState = {
  users: initialPaginatedData,
  selectedUser: null,
  openedOverlay: false,
  openedFollowersDialogForId: null,
  openedFollowingDialogForId: null,
  fetchLoading: false,
  editLoading: false,
  followLoadingId: null,
  error: null,
};

export const searchUsers = createAsyncThunk<PaginatedData<IUser>, SearchUsersParams>(
  'user/search',
  async ({ search, offset = 0, limit = 20 }, { rejectWithValue }) => {
    try {
      const data = await UserApi.search(search, { offset, limit });
      return { data, offset, limit };
    } catch (error: unknown) {
      return rejectWithValue('Failed to search users');
    }
  },
);

export const getUserFollowers = createAsyncThunk<PaginatedData<IUser>, GetFollowersParams>(
  'user/getFollowers',
  async ({ userId, offset = 0, limit = 20 }, { rejectWithValue }) => {
    try {
      const data = await UserApi.getFollowers(userId, { offset, limit });
      return { data, offset, limit };
    } catch (error: unknown) {
      return rejectWithValue('Failed to fetch followers');
    }
  },
);

export const getUserFollowings = createAsyncThunk<PaginatedData<IUser>, GetFollowingParams>(
  'user/getFollowings',
  async ({ userId, offset = 0, limit = 20 }, { rejectWithValue }) => {
    try {
      const data = await UserApi.getFollowings(userId, { offset, limit });
      return { data, offset, limit };
    } catch (error: unknown) {
      return rejectWithValue('Failed to fetch followings');
    }
  },
);

export const selectUserByUsername = createAsyncThunk<IUser | null, string>(
  'user/selectByUsername',
  async (username, { rejectWithValue }) => {
    try {
      return UserApi.getByUsername(username);
    } catch (error: unknown) {
      return rejectWithValue('Failed to select user');
    }
  },
);

export const updateUser = createAsyncThunk<
  IUser,
  ActionWithCallbacks<{ id: string; data: UpdateUserData }, void, FormikErrors<UpdateUserData>>
>('user/update', async ({ payload, onSuccess, onError }, { rejectWithValue, dispatch }) => {
  try {
    const user = await UserApi.update(payload.id, payload.data);
    dispatch(syncAuthUser(user));
    if (onSuccess) onSuccess();
    return user;
  } catch (error: unknown) {
    if (onError && error instanceof AxiosError && error?.response?.data.errors) {
      onError(error.response.data.errors);
    }
    return rejectWithValue('Failed to update user');
  }
});

export const followUser = createAsyncThunk<IUser, string>(
  'user/follow',
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      const user = await UserApi.follow(id);
      dispatch(syncUserAcrossState(user));
      const authUser = (getState() as RootState).auth.user;

      if (authUser) {
        dispatch(
          syncAuthUser({
            ...authUser,
            followings: [...authUser.followings, id],
          }),
        );
      }

      return user;
    } catch (error: unknown) {
      return rejectWithValue('Failed to follow user');
    }
  },
);

export const unfollowUser = createAsyncThunk<IUser, string>(
  'user/unfollow',
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      const user = await UserApi.unfollow(id);
      dispatch(syncUserAcrossState(user));
      const authUser = (getState() as RootState).auth.user;

      if (authUser) {
        dispatch(
          syncAuthUser({
            ...authUser,
            followings: authUser.followings.filter((followingId) => followingId !== id),
          }),
        );
      }

      return user;
    } catch (error: unknown) {
      return rejectWithValue('Failed to unfollow user');
    }
  },
);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOpenedUserOverlay: (state: UserState, action: PayloadAction<boolean>) => {
      state.openedOverlay = action.payload;
    },
    clearSearchedUsers: (state: UserState) => {
      state.users = initialPaginatedData;
    },
    setSelectedUser: (state: UserState, action: PayloadAction<IUser>) => {
      state.selectedUser = action.payload;
    },
    syncUserAcrossState: (state: UserState, action: PayloadAction<IUser>) => {
      const updatedUser = action.payload;

      if (state.selectedUser?._id === updatedUser._id) {
        state.selectedUser = updatedUser;
      }

      state.users.data = state.users.data.map((user) => (user._id === updatedUser._id ? updatedUser : user));
    },
    openFollowersDialog: (state: UserState, action: PayloadAction<string>) => {
      state.openedFollowersDialogForId = action.payload;
    },
    closeFollowersDialog: (state: UserState) => {
      state.openedFollowersDialogForId = null;
      state.users = initialPaginatedData;
    },
    openFollowingDialog: (state: UserState, action: PayloadAction<string>) => {
      state.openedFollowingDialogForId = action.payload;
    },
    closeFollowingDialog: (state: UserState) => {
      state.openedFollowingDialogForId = null;
      state.users = initialPaginatedData;
    },
    closeAllInteractions: (state: UserState) => {
      state.users = initialPaginatedData;
      state.openedFollowersDialogForId = null;
      state.openedFollowingDialogForId = null;
      state.openedOverlay = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state: UserState) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state: UserState, action: PayloadAction<PaginatedData<IUser>>) => {
        state.fetchLoading = false;
        state.users = preparePaginatedResponseData(action.payload, state.users.data);
      })
      .addCase(searchUsers.rejected, (state: UserState, action: PayloadAction<unknown>) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getUserFollowers.pending, (state: UserState) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(getUserFollowers.fulfilled, (state: UserState, action: PayloadAction<PaginatedData<IUser>>) => {
        state.fetchLoading = false;
        state.users = preparePaginatedResponseData(action.payload, state.users.data);
      })
      .addCase(getUserFollowers.rejected, (state: UserState, action: PayloadAction<unknown>) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getUserFollowings.pending, (state: UserState) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(getUserFollowings.fulfilled, (state: UserState, action: PayloadAction<PaginatedData<IUser>>) => {
        state.fetchLoading = false;
        state.users = preparePaginatedResponseData(action.payload, state.users.data);
      })
      .addCase(getUserFollowings.rejected, (state: UserState, action: PayloadAction<unknown>) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      })

      .addCase(selectUserByUsername.pending, (state: UserState) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(selectUserByUsername.fulfilled, (state: UserState, action: PayloadAction<IUser | null>) => {
        state.fetchLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(selectUserByUsername.rejected, (state: UserState, action: PayloadAction<unknown>) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUser.pending, (state: UserState) => {
        state.editLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state: UserState) => {
        state.editLoading = false;
      })
      .addCase(updateUser.rejected, (state: UserState, action: PayloadAction<unknown>) => {
        state.editLoading = false;
        state.error = action.payload as string;
      })

      .addCase(followUser.pending, (state: UserState, action) => {
        state.followLoadingId = action.meta.arg;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state: UserState) => {
        state.followLoadingId = null;
      })
      .addCase(followUser.rejected, (state: UserState, action: PayloadAction<unknown>) => {
        state.followLoadingId = null;
        state.error = action.payload as string;
      })

      .addCase(unfollowUser.pending, (state: UserState, action) => {
        state.followLoadingId = action.meta.arg;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state: UserState) => {
        state.followLoadingId = null;
      })
      .addCase(unfollowUser.rejected, (state: UserState, action: PayloadAction<unknown>) => {
        state.followLoadingId = null;
        state.error = action.payload as string;
      });
  },
});

export const {
  setOpenedUserOverlay,
  clearSearchedUsers,
  syncUserAcrossState,
  openFollowersDialog,
  closeFollowersDialog,
  openFollowingDialog,
  closeFollowingDialog,
  closeAllInteractions,
} = slice.actions;

export default slice.reducer;
