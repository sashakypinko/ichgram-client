import ButtonWithCount from '@shared/components/button-with-count';
import { UserAction } from '@entities/user/types';
import { useAppDispatch } from '@app/hooks';
import { openFollowersDialog } from '@entities/user/store/slice';

const ShowFollowersAction: UserAction = ({ user }) => {
  const dispatch = useAppDispatch();

  return (
    <ButtonWithCount
      count={user.followersCount || 0}
      entity="followers"
      onClick={() => dispatch(openFollowersDialog(user._id))}
    />
  );
};

export default ShowFollowersAction;
