import ButtonWithCount from '@shared/components/button-with-count';
import { UserAction } from '@entities/user/types';
import { useAppDispatch } from '@app/hooks';
import { openFollowingDialog } from '@entities/user/store/slice';

const ShowFollowingAction: UserAction = ({ user }) => {
  const dispatch = useAppDispatch();

  return (
    <ButtonWithCount
      count={user.followings.length}
      entity="following"
      onClick={() => dispatch(openFollowingDialog(user._id))}
    />
  );
};

export default ShowFollowingAction;
