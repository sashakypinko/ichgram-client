import ApiService from '../../../app/services/api-service';
import { IPost } from '@entities/post/model/post';
import { CreatePostData, UpdatePostData } from '@entities/post/types';
import { PaginationParams } from '@app/types';
import { IComment } from '@entities/comment/model/comment';

class PostService extends ApiService {
  getById = async (id: string): Promise<IPost | null> => {
    const res = await this.get(id).then((res) => res.data);
    return res.data;
  };

  getByFollowing = async (params?: PaginationParams): Promise<IPost[]> => {
    const res = await this.get('by-following', params).then((res) => res.data);
    return res.data;
  };

  getTrending = async (params?: PaginationParams): Promise<IPost[]> => {
    const res = await this.get('trending', params).then((res) => res.data);
    return res.data;
  };

  getComments = async (id: string, params?: PaginationParams): Promise<IComment[]> => {
    const res = await this.get(`${id}/comments`, params).then((res) => res.data);
    return res.data;
  };

  create = async (data: CreatePostData): Promise<IPost> => {
    const res = await this.post('', data, false).then((res) => res.data);
    return res.data;
  };

  update = async (id: string, data: UpdatePostData): Promise<IPost> => {
    const res = await this.put(id, data).then((res) => res.data);
    return res.data;
  };

  remove = async (id: string): Promise<IPost> => {
    const res = await this.delete(id).then((res) => res.data);
    return res.data;
  };

  toggleLike = async (id: string): Promise<IPost> => {
    const res = await this.post(`${id}/toggle-like`).then((res) => res.data);
    return res.data;
  };
}

export const PostApi = new PostService('core/posts');
