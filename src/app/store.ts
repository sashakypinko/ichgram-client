import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/store/slice';
import userReducer from '@entities/user/store/slice';
import postReducer from '@entities/post/store/slice';
import commentReducer from '@entities/comment/store/slice';
import messageReducer from '@entities/message/store/slice';
import conversationReducer from '@entities/conversation/store/slice';
import notificationReducer from '@entities/notification/store/slice';
import socketMiddleware from '@app/socket-middleware';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  message: messageReducer,
  conversation: conversationReducer,
  notification: notificationReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export type ActionWithCallbacks<T, S = void, E = string> = {
  payload: T;
  onSuccess?: S extends void ? () => void : (...args: S[]) => void;
  onError?: (error: E) => void;
};
