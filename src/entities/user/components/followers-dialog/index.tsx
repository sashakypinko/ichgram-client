import { FC, useEffect } from 'react';
import UserListDialog from '@entities/user/components/user-list-dialog';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectUser } from '@entities/user/store/selectors';
import { closeFollowersDialog, getUserFollowers } from '@entities/user/store/slice';
import usePagination from '@shared/hooks/use-pagination.hook';

const FollowersDialog: FC = () => {
  const { openedFollowersDialogForId } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { offset, limit, next, reset } = usePagination();

  const fetchFollowers = () => {
    if (openedFollowersDialogForId) {
      dispatch(
        getUserFollowers({
          userId: openedFollowersDialogForId,
          offset,
          limit,
        }),
      );
    }
  };

  const handleClose = () => {
    dispatch(closeFollowersDialog());
    reset();
  };

  useEffect(() => {
    fetchFollowers();
  }, [openedFollowersDialogForId, offset, limit]);

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
