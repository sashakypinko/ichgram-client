import { RootState } from '@app/store';
import { NotificationState } from '@entities/notification/store/types';

export const selectNotification = (state: RootState): NotificationState => state.notification;
