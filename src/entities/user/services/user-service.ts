import ApiService from '../../../app/services/api-service';
import { IUser } from '@entities/user/model/user';
import { PaginationParams } from '@app/types';
import { IPost } from '@entities/post/model/post';
import { UpdateUserData } from '@entities/user/types';

class UserService extends ApiService {
  search = async (search: string = ''): Promise<IUser[]> => {
    const res = await this.get('search', { search }).then((res) => res.data);
    return res.data;
  };

  getByUsername = async (username: string): Promise<IUser | null> => {
    const res = await this.get('by-unique-fields', { username }).then((res) => res.data);
    return res.data;
  };

  getFollowers = async (id: string, params?: PaginationParams): Promise<IUser[]> => {
    const res = await this.get(`${id}/followers`, params).then((res) => res.data);
    return res.data;
  };

  getFollowings = async (id: string, params?: PaginationParams): Promise<IUser[]> => {
    const res = await this.get(`${id}/followings`, params).then((res) => res.data);
    return res.data;
  };

  getPosts = async (id: string, params?: PaginationParams): Promise<IPost[]> => {
    const res = await this.get(`${id}/posts`, params).then((res) => res.data);
    return res.data;
  };
  
  update = async (id: string, data: UpdateUserData): Promise<IUser> => {
    const res = await this.put(`${id}`, data, false).then((res) => res.data);
    return res.data;
  };

  follow = async (id: string): Promise<IUser> => {
    const res = await this.post(`${id}/follow`).then((res) => res.data);
    return res.data;
  };

  unfollow = async (id: string): Promise<IUser> => {
    const res = await this.post(`${id}/unfollow`).then((res) => res.data);
    return res.data;
  };
}

export const UserApi = new UserService('core/users');
