import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState } from './types';
import { INotification } from '@entities/notification/model/notification';
import { NotificationApi } from '@entities/notification/services/notification-service';
import { PaginationParams } from '@app/types';

const initialState: NotificationState = {
  notifications: [],
  openedOverlay: false,
  loading: false,
  viewing: false,
  error: null,
};

export const getNotifications = createAsyncThunk<INotification[], PaginationParams>(
  'notification/get',
  async (params, { rejectWithValue }) => {
    try {
      return NotificationApi.getAll(params);
    } catch (error: unknown) {
      return rejectWithValue('Failed to fetch notifications');
    }
  },
);

export const markAllNotificationsAsViewed = createAsyncThunk<INotification[]>(
  'notification/mark-all-viewed',
  async (_, { rejectWithValue }) => {
    try {
      return NotificationApi.markAllViewed();
    } catch (error: unknown) {
      return rejectWithValue('Failed to mark notifications as viewed');
    }
  },
);

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setOpenedNotificationOverlay: (state: NotificationState, action: PayloadAction<boolean>) => {
      state.openedOverlay = action.payload;
    },
    addNotification: (state: NotificationState, action: PayloadAction<INotification>) => {
      state.notifications.unshift(action.payload);
    },
    excludeNotification: (state: NotificationState, action: PayloadAction<INotification>) => {
      state.notifications = state.notifications.filter(({ _id }) => _id !== action.payload._id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state: NotificationState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state: NotificationState, action: PayloadAction<INotification[]>) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state: NotificationState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(markAllNotificationsAsViewed.pending, (state: NotificationState) => {
        state.viewing = true;
        state.error = null;
      })
      .addCase(markAllNotificationsAsViewed.fulfilled, (state: NotificationState, action: PayloadAction<INotification[]>) => {
        state.viewing = false;
        state.notifications = action.payload;
      })
      .addCase(markAllNotificationsAsViewed.rejected, (state: NotificationState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setOpenedNotificationOverlay, addNotification, excludeNotification } = slice.actions;

export default slice.reducer;
