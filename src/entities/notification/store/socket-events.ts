import { Socket } from 'socket.io-client';
import { addNotification, excludeNotification } from '@entities/notification/store/slice';
import { AppDispatch } from '@app/store';
import { INotification } from '@entities/notification/model/notification';

const socketEvents: (socket: Socket, dispatch: AppDispatch) => void = (socket: Socket, dispatch: AppDispatch): void => {
  socket.on('notification:created', (notification: INotification) => {
    console.log({ notification });
    dispatch(addNotification(notification));
  });

  socket.on('notification:deleted', (notification: INotification) => {
    console.log({ notification })
    dispatch(excludeNotification(notification));
  });
};

export default socketEvents;