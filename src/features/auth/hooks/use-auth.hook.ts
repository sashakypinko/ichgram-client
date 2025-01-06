import { useAppSelector } from '@app/hooks';
import { selectAuth } from '@features/auth/store/selectors';

const useIsAuth = (): boolean | null => {
  const { user } = useAppSelector(selectAuth);

  return !!user;
};

export default useIsAuth;
