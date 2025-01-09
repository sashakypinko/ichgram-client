import { INotification } from '@entities/notification/model/notification';

export interface NotificationState {
  notifications: INotification[];
  openedOverlay: boolean;
  loading: boolean;
  viewing: boolean;
  error: string | null;
}
