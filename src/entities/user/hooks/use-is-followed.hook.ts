import { IUser } from '@entities/user/model/user';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';

const useIsFollowed = (user: IUser): boolean => {
  const authUser = useAuthUser();
  return !!authUser?.followings.find((followingId) => followingId === user._id);
};

export default useIsFollowed;
