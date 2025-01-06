import { RootState } from '@app/store';
import { UserState } from '@entities/user/store/types';
import { NotificationState } from '@entities/notification/store/types';

export const selectNotification = (state: RootState): NotificationState => state.notification;
