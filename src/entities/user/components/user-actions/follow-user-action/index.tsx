import { UserAction } from '@entities/user/types';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import Button from '@shared/components/button';
import { followUser, unfollowUser } from '@entities/user/store/slice';
import useIsFollowed from '@entities/user/hooks/use-is-followed.hook';
import VisibleForVisitor from '@entities/user/hoc/visible-for-visitor.hoc';
import { selectUser } from '@entities/user/store/selectors';

const FollowUserAction: UserAction = ({ user }) => {
  const { followLoadingId } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const followed = useIsFollowed(user);

  const handleToggleFollow = () => {
    const actionCreator = followed ? unfollowUser : followUser;
    dispatch(actionCreator(user._id));
  };

  return (
    <Button
      variant="contained"
      color={followed ? 'secondary' : 'primary'}
      onClick={handleToggleFollow}
      loading={followLoadingId === user._id}
    >
      {followed ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default VisibleForVisitor(FollowUserAction);
