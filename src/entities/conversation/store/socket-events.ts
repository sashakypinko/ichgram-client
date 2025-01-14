import { Socket } from 'socket.io-client';
import { getConversations } from '@entities/conversation/store/slice';
import { AppDispatch } from '@app/store';

const socketEvents: (socket: Socket, dispatch: AppDispatch) => void = (socket: Socket, dispatch: AppDispatch): void => {
  socket.on('conversation:created', () => {
    dispatch(getConversations());
  });

  socket.on('conversation:created', () => {
    dispatch(getConversations());
  });
};

export default socketEvents;
