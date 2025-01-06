import { IUser } from '@entities/user/model/user';

export interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}
