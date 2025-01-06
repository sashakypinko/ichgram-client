import ApiService from '../../../app/services/api-service';
import { IComment } from '@entities/comment/model/comment';
import { CreateCommentData, UpdateCommentData } from '@entities/comment/types';

class CommentService extends ApiService {
  getById = async (id: string): Promise<IComment | null> => {
    const res = await this.get(id).then((res) => res.data);
    return res.data;
  };

  create = async (data: CreateCommentData): Promise<IComment> => {
    const res = await this.post('', data, false).then((res) => res.data);
    return res.data;
  };

  update = async (id: string, data: UpdateCommentData): Promise<IComment> => {
    const res = await this.put(id, data).then((res) => res.data);
    return res.data;
  };

  remove = async (id: string): Promise<IComment> => {
    const res = await this.delete(id).then((res) => res.data);
    return res.data;
  };

  toggleLike = async (id: string): Promise<IComment> => {
    const res = await this.post(`${id}/toggle-like`).then((res) => res.data);
    return res.data;
  };
}

export const CommentApi = new CommentService('core/comments');
