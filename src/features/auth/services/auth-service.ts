import ApiService from '../../../app/services/api-service';
import { AxiosResponse } from 'axios';
import { IUser } from '@entities/user/model/user';
import { AuthData, ResetPasswordData, SignUpData, UserCredentials } from '../types';

class AuthService extends ApiService {
  getUser = async (): Promise<IUser> => {
    const res = await this.get('get-user').then((res) => res.data);
    return res.data;
  };

  signIn = async (data: UserCredentials): Promise<AuthData> => {
    const res = await this.post('sign-in', data).then((res) => res.data);
    return res.data;
  };

  signUp = async (data: SignUpData): Promise<AuthData> => {
    const res = await this.post('sign-up', data).then((res) => res.data);
    return res.data;
  };

  logout = async (): Promise<void> => {
    await this.post('logout').then((res) => res.data);
  };

  resetPassword = async (data: ResetPasswordData): Promise<void> => {
    const res = await this.post('reset-password', data).then((res) => res.data);
    return res.data;
  };
}

export const AuthApi = new AuthService('auth');
