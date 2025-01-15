import { FC } from 'react';
import UserListDialog from '@entities/user/components/user-list-dialog';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectUser } from '@entities/user/store/selectors';
import { closeFollowersDialog } from '@entities/user/store/slice';
import usePaginatedFollowers from '@entities/user/hooks/use-paginated-followers.hook';

const FollowersDialog: FC = () => {
  const { openedFollowersDialogForId } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { next } = usePaginatedFollowers(openedFollowersDialogForId);

  const handleClose = () => {
    dispatch(closeFollowersDialog());
  };

  return (
    <UserListDialog
      title="Followers"
      opened={!!openedFollowersDialogForId}
      onClose={handleClose}
      onScrollBottom={next}
    />
  );
};

export default FollowersDialog;
