import ApiService from '../../../app/services/api-service';
import { INotification } from '@entities/notification/model/notification';

class NotificationService extends ApiService {
  getAll = async (): Promise<INotification[]> => {
    const res = await this.get('').then((res) => res.data);
    return res.data;
  };
}

export const NotificationApi = new NotificationService('notifications');
