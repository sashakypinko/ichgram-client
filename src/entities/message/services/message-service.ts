import { GetMessagesParams, SendMessageData, UpdateMessageData } from '../types';
import ApiService from '@app/services/api-service';
import { IMessage } from '@entities/message/model/message';

class MessageService extends ApiService {
  getMessages = async (params: GetMessagesParams): Promise<IMessage[]> => {
    const res = await this.get('', params).then((res) => res.data);
    return res.data;
  };

  send = async (data: SendMessageData): Promise<IMessage> => {
    const res = await this.post('send', data, false).then((res) => res.data);
    return res.data;
  };

  update = async (data: UpdateMessageData): Promise<IMessage> => {
    const res = await this.put(data.messageId, data).then((res) => res.data);
    return res.data;
  };

  remove = async (id: string): Promise<IMessage> => {
    const res = await this.delete(id).then((res) => res.data);
    return res.data;
  };

  markAsRead = async (id: string): Promise<IMessage> => {
    const res = await this.post(`${id}/mark-as-read`).then((res) => res.data);
    return res.data;
  };
}

export const MessageApi = new MessageService('core/messages');
