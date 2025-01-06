import { FC, useEffect } from 'react';
import UserListDialog from '@entities/user/components/user-list-dialog';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectUser } from '@entities/user/store/selectors';
import { closeFollowingDialog, getUserFollowings } from '@entities/user/store/slice';
import usePagination from '@shared/hooks/use-pagination.hook';

const FollowingDialog: FC = () => {
  const { openedFollowingDialogForId } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { offset, limit, next, reset } = usePagination();

  const fetchFollowing = () => {
    if (openedFollowingDialogForId) {
      dispatch(
        getUserFollowings({
          userId: openedFollowingDialogForId,
          offset,
          limit,
        }),
      );
    }
  };

  const handleClose = () => {
    dispatch(closeFollowingDialog());
    reset();
  };

  useEffect(() => {
    fetchFollowing();
  }, [openedFollowingDialogForId, offset, limit]);

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
