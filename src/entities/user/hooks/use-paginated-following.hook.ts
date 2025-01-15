import { useAppDispatch, useAppSelector } from '@app/hooks';
import { PaginationParams } from '@app/types';
import usePagination, { DataWithPaginationControl } from '@shared/hooks/use-pagination.hook';
import { IUser } from '@entities/user/model/user';
import { selectUser } from '@entities/user/store/selectors';
import { getUserFollowings } from '@entities/user/store/slice';

const usePaginatedFollowing = (userId: string | null): DataWithPaginationControl<IUser> => {
  const { users } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const fetchData = (params: PaginationParams): void => {
    if (userId) {
      dispatch(getUserFollowings({ userId, ...params }));
    }
  };

  return usePagination<IUser>(users, fetchData, [userId]);
};

export default usePaginatedFollowing;
