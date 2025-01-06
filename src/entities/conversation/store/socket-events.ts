import { Socket } from 'socket.io-client';
import { IMessage } from '@entities/message/model/message';
import { addMessage, excludeMessage, replaceMessage } from '@entities/message/store/slice';
import { getConversations } from '@entities/conversation/store/slice';
import { AppDispatch } from '@app/store';

const socketEvents: (socket: Socket, dispatch: AppDispatch) => void = (socket: Socket, dispatch: AppDispatch): void => {
  socket.on('message:sent', (message: IMessage) => {
    dispatch(addMessage(message));
    dispatch(getConversations());
  });

  socket.on('message:updated', (message: IMessage) => {
    dispatch(replaceMessage(message));
    dispatch(getConversations());
  });

  socket.on('message:deleted', (message: IMessage) => {
    dispatch(excludeMessage(message));
    dispatch(getConversations());
  });
};

export default socketEvents;
