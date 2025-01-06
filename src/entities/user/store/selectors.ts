import { RootState } from '@app/store';
import { UserState } from '@entities/user/store/types';

export const selectUser = (state: RootState): UserState => state.user;
