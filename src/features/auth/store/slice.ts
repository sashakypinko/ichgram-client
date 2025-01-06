import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from '../services/auth-service';
import { UserCredentials, SignUpData, ResetPasswordData, AuthData } from '../types';
import { AuthState } from './types';
import { ActionWithCallbacks } from '@app/store';
import { AuthStorage } from '../services/auth-storage';
import { IUser } from '@entities/user/model/user';
import { FormikErrors } from 'formik/dist/types';
import { AxiosError } from 'axios';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk<IUser>('auth/getUser', async (_, { rejectWithValue }) => {
  try {
    return AuthApi.getUser();
  } catch (error: unknown) {
    return rejectWithValue('Failed to get auth user');
  }
});

export const signIn = createAsyncThunk<
  AuthData,
  ActionWithCallbacks<UserCredentials, void, FormikErrors<UserCredentials>>
>('auth/signIn', async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
  try {
    const response = await AuthApi.signIn(payload);

    AuthStorage.storeAccessToken(response.accessToken);
    AuthStorage.storeRefreshToken(response.refreshToken);

    if (onSuccess) onSuccess();

    return response;
  } catch (error: unknown) {
    if (onError && error instanceof AxiosError && error?.response?.data.errors) {
      onError(error.response.data.errors);
    }
    return rejectWithValue('Failed to sign in');
  }
});

export const signUp = createAsyncThunk<AuthData, ActionWithCallbacks<SignUpData, void, FormikErrors<SignUpData>>>(
  'auth/signUp',
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const response = await AuthApi.signUp(payload);

      AuthStorage.storeAccessToken(response.accessToken);
      AuthStorage.storeRefreshToken(response.refreshToken);

      if (onSuccess) onSuccess();

      return response;
    } catch (error: unknown) {
      if (onError && error instanceof AxiosError && error?.response?.data.errors) {
        onError(error.response.data.errors);
      }
      return rejectWithValue('Failed to sign up');
    }
  },
);

export const logout = createAsyncThunk<void, ActionWithCallbacks<null>>(
  'auth/logout',
  async ({ onSuccess, onError }, { rejectWithValue }) => {
    try {
      await AuthApi.logout();

      AuthStorage.removeAccessToken();
      AuthStorage.removeRefreshToken();

      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      if (onError && error instanceof AxiosError && error?.response?.data.errors) {
        onError(error.response.data.errors);
      }
      return rejectWithValue('Failed to logout');
    }
  },
);

export const resetPassword = createAsyncThunk<
  void,
  ActionWithCallbacks<ResetPasswordData, void, FormikErrors<ResetPasswordData>>
>('auth/resetPassword', async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
  try {
    await AuthApi.resetPassword(payload);
    if (onSuccess) onSuccess();
  } catch (error: unknown) {
    if (onError && error instanceof AxiosError && error?.response?.data.errors) {
      onError(error.response.data.errors);
    }
    return rejectWithValue('Failed to reset password');
  }
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    syncAuthUser: (state: AuthState, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state: AuthState, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state: AuthState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(signIn.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state: AuthState, action: PayloadAction<AuthData>) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signIn.rejected, (state: AuthState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(signUp.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state: AuthState, action: PayloadAction<AuthData>) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signUp.rejected, (state: AuthState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logout.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state: AuthState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(resetPassword.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state: AuthState) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state: AuthState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { syncAuthUser } = slice.actions;

export default slice.reducer;
