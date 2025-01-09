import { IUser } from '@entities/user/model/user';
import { NotificationAction, NotificationEntityType } from '@entities/notification/enums';

export interface INotification {
  _id: string;
  action: NotificationAction;
  entityType: NotificationEntityType;
  entityId: string;
  mediaId: string;
  viewed: boolean;
  createdAt: Date;
  sender: IUser;
  receiver: IUser;
}
