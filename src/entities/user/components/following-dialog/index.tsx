import { FC } from 'react';
import UserListDialog from '@entities/user/components/user-list-dialog';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectUser } from '@entities/user/store/selectors';
import { closeFollowingDialog } from '@entities/user/store/slice';
import usePaginatedFollowing from '@entities/user/hooks/use-paginated-following.hook';

const FollowingDialog: FC = () => {
  const { openedFollowingDialogForId } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { next } = usePaginatedFollowing(openedFollowingDialogForId);

  const handleClose = () => {
    dispatch(closeFollowingDialog());
  };

  return (
    <UserListDialog
      title="Following"
      opened={!!openedFollowingDialogForId}
      onClose={handleClose}
      onScrollBottom={next}
    />
  );
};

export default FollowingDialog;
