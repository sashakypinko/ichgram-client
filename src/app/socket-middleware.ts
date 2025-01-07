import { Middleware } from 'redux';
import { io } from 'socket.io-client';
import { AuthStorage } from '@features/auth/services/auth-storage';
import { AppDispatch } from '@app/store';
import { MiddlewareAPI } from '@reduxjs/toolkit';
import conversationSocketEvents from '@entities/conversation/store/socket-events';
import messageSocketEvents from '@entities/message/store/socket-events';

const socket = io(import.meta.env.VITE_MESSAGES_SOCKET_URL, {
  path: '/core/socket.io',
  auth: { token: AuthStorage.getAccessToken() },
});

const socketMiddleware: Middleware = ({ dispatch }: MiddlewareAPI<AppDispatch>) => {
  socket.on('connect', () => {
    console.log('Socket connected');
  });

  conversationSocketEvents(socket, dispatch);
  messageSocketEvents(socket, dispatch);

  return (next) => (action) => next(action);
};

export default socketMiddleware;