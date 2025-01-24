import { Socket } from 'socket.io-client';
import { addTypingUser, getConversations, removeTypingUser } from '@entities/conversation/store/slice';
import { AppDispatch } from '@app/store';
import { IUser } from '@entities/user/model/user';

const socketEvents: (socket: Socket, dispatch: AppDispatch) => void = (socket: Socket, dispatch: AppDispatch): void => {
  socket.on('conversation:created', () => {
    dispatch(getConversations());
  });

  socket.on('conversation:deleted', () => {
    dispatch(getConversations());
  });

  socket.on('conversation:typing', (payload: { user: IUser; conversationId: string }) => {
    dispatch(addTypingUser(payload));

    setTimeout(() => {
      dispatch(removeTypingUser(payload));
    }, 3000);
  });
};

export default socketEvents;
