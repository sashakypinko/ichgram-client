import { useAppSelector } from '@app/hooks';
import { selectAuth } from '@features/auth/store/selectors';
import { IUser } from '@entities/user/model/user';

const useAuthUser = (): IUser | null => {
  const { user } = useAppSelector(selectAuth);

  return user;
};

export default useAuthUser;
