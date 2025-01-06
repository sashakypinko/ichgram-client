import ApiService from '../../../app/services/api-service';
import { IConversation } from '@entities/conversation/model/conversation';
import { CreateConversationData } from '@entities/conversation/types';

class ConversationService extends ApiService {
  getAll = async (): Promise<IConversation[]> => {
    const res = await this.get('').then((res) => res.data);
    return res.data;
  };

  create = async (data: CreateConversationData): Promise<IConversation> => {
    const res = await this.post('', data).then((res) => res.data);
    return res.data;
  };

  leave = async (id: string): Promise<IConversation> => {
    const res = await this.post(`${id}/leave`).then((res) => res.data);
    return res.data;
  };

  remove = async (id: string): Promise<IConversation> => {
    const res = await this.delete(id).then((res) => res.data);
    return res.data;
  };
}

export const ConversationApi = new ConversationService('core/conversations');
