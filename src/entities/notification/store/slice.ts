import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState } from './types';

const initialState: NotificationState = {
  notifications: [],
  openedOverlay: false,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setOpenedNotificationOverlay: (state: NotificationState, action: PayloadAction<boolean>) => {
      state.openedOverlay = action.payload;
    },
  },
});

export const { setOpenedNotificationOverlay } = slice.actions;

export default slice.reducer;
