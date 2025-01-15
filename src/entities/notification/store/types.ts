import { INotification } from '@entities/notification/model/notification';
import { PaginatedData } from '@app/types';

export interface NotificationState {
  notifications: PaginatedData<INotification>;
  openedOverlay: boolean;
  loading: boolean;
  viewing: boolean;
  error: string | null;
}
