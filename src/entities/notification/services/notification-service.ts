import ApiService from '../../../app/services/api-service';
import { INotification } from '@entities/notification/model/notification';
import { PaginationParams } from '@app/types';

class NotificationService extends ApiService {
  getAll = async (params?: PaginationParams): Promise<INotification[]> => {
    const res = await this.get('', params).then((res) => res.data);
    return res.data;
  };
  
  markAllViewed = async (): Promise<INotification[]> => {
    const res = await this.post('mark-all-viewed').then((res) => res.data);
    return res.data;
  };
}

export const NotificationApi = new NotificationService('core/notifications');
