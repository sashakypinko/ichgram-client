import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GetFollowersParams, GetFollowingParams, PayloadUsersWithLazyLoad, UserState } from './types';
import { IUser } from '@entities/user/model/user';
import { UserApi } from '@entities/user/services/user-service';
import { syncAuthUser } from '@features/auth/store/slice';
import { RootState } from '@app/store';

const initialState: UserState = {
  searchedUsers: [],
  selectedUser: null,
  openedOverlay: false,
  openedFollowersDialogForId: null,
  openedFollowingDialogForId: null,
  fetchLoading: false,
  editLoading: false,
  followLoadingId: null,
  error: null,
};

export const searchUsers = createAsyncThunk<IUser[], string>('user/search', async (search, { rejectWithValue }) => {
  try {
    return UserApi.search(search);
  } catch (error: unknown) {
    return rejectWithValue('Failed to search users');
  }
});

export const getUserFollowers = createAsyncThunk<PayloadUsersWithLazyLoad, GetFollowersParams>(
  'user/getFollowers',
  async ({ userId, ...params }, { rejectWithValue }) => {
    try {
      const users = await UserApi.getFollowers(userId, params);
      return { users, append: !!params.offset && params.offset > 0 };
    } catch (error: unknown) {
      return rejectWithValue('Failed to fetch followers');
    }
  },
);

export const getUserFollowings = createAsyncThunk<PayloadUsersWithLazyLoad, GetFollowingParams>(
  'user/getFollowings',
  async ({ userId, ...params }, { rejectWithValue }) => {
    try {
      const users = await UserApi.getFollowings(userId, params);
      return { users, append: !!params.offset && params.offset > 0 };
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
      state.searchedUsers = [];
    },
    setSelectedUser: (state: UserState, action: PayloadAction<IUser>) => {
      state.selectedUser = action.payload;
    },
    syncUserAcrossState: (state: UserState, action: PayloadAction<IUser>) => {
      const updatedUser = action.payload;

      if (state.selectedUser?._id === updatedUser._id) {
        state.selectedUser = updatedUser;
      }

      state.searchedUsers = state.searchedUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user));
    },
    openFollowersDialog: (state: UserState, action: PayloadAction<string>) => {
      state.openedFollowersDialogForId = action.payload;
    },
    closeFollowersDialog: (state: UserState) => {
      state.openedFollowersDialogForId = null;
      state.searchedUsers = [];
    },
    openFollowingDialog: (state: UserState, action: PayloadAction<string>) => {
      state.openedFollowingDialogForId = action.payload;
    },
    closeFollowingDialog: (state: UserState) => {
      state.openedFollowingDialogForId = null;
      state.searchedUsers = [];
    },
    closeAllInteractions: (state: UserState) => {
      state.searchedUsers = [];
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
      .addCase(searchUsers.fulfilled, (state: UserState, action: PayloadAction<IUser[]>) => {
        state.fetchLoading = false;
        state.searchedUsers = action.payload;
      })
      .addCase(searchUsers.rejected, (state: UserState, action: PayloadAction<unknown>) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getUserFollowers.pending, (state: UserState) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(getUserFollowers.fulfilled, (state: UserState, action: PayloadAction<PayloadUsersWithLazyLoad>) => {
        state.fetchLoading = false;
        state.searchedUsers = action.payload.append
          ? [...state.searchedUsers, ...action.payload.users]
          : action.payload.users;
      })
      .addCase(getUserFollowers.rejected, (state: UserState, action: PayloadAction<unknown>) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getUserFollowings.pending, (state: UserState) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(getUserFollowings.fulfilled, (state: UserState, action: PayloadAction<PayloadUsersWithLazyLoad>) => {
        state.fetchLoading = false;
        state.searchedUsers = action.payload.append
          ? [...state.searchedUsers, ...action.payload.users]
          : action.payload.users;
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
  setSelectedUser,
  syncUserAcrossState,
  openFollowersDialog,
  closeFollowersDialog,
  openFollowingDialog,
  closeFollowingDialog,
  closeAllInteractions,
} = slice.actions;

export default slice.reducer;
