import { Middleware } from 'redux';
import { io, Socket } from 'socket.io-client';
import { AuthStorage } from '@features/auth/services/auth-storage';
import { AppDispatch } from '@app/store';
import { MiddlewareAPI } from '@reduxjs/toolkit';
import conversationSocketEvents from '@entities/conversation/store/socket-events';
import messageSocketEvents from '@entities/message/store/socket-events';
import notificationSocketEvents from '@entities/notification/store/socket-events';

const socketEventRegisters = [conversationSocketEvents, messageSocketEvents, notificationSocketEvents];

export let appSocket: Socket | null = null;

const createSocket = (): Socket => {
  return io(import.meta.env.VITE_MESSAGES_SOCKET_URL, {
    path: '/core/socket.io',
    auth: { token: AuthStorage.getAccessToken() },
  });
};

const socketMiddleware: Middleware = ({ dispatch, getState }: MiddlewareAPI<AppDispatch>) => {
  return (next) => (action) => {
    const result = next(action);

    const authUser = getState().auth.user;

    if (!appSocket && authUser) {
      appSocket = createSocket();

      appSocket.on('connect', () => {
        console.log('Socket connected');
      });

      for (const register of socketEventRegisters) {
        register(appSocket, dispatch);
      }
    }

    return result;
  };
};

export default socketMiddleware;
