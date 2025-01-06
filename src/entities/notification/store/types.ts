import { IUser } from '@entities/user/model/user';

export interface NotificationState {
  notifications: IUser[];
  openedOverlay: boolean;
  loading: boolean;
  error: string | null;
}
