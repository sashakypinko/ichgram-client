import { IUser } from '@entities/user/model/user';

export interface UserCredentials {
  username: string;
  password: string;
}

export interface SignUpData extends UserCredentials {
  fullName: string;
  email: string;
}

export interface ResetPasswordData extends Omit<UserCredentials, 'password'> {}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
